
Distributed training across multiple GPUs is essential for accelerating deep learning tasks involving large datasets and complex models. PyTorch provides robust support for distributed computing through its `torch.distributed` package, facilitating efficient utilization of GPU resources using `torch.nn.parallel.DistributedDataParallel` (DDP). This guide presents a detailed explanation of how to implement and execute distributed training across multiple GPUs using PyTorch.

## Script Overview
The provided Python script demonstrates how to perform distributed training across multiple GPUs using DDP in PyTorch. Let's break down each part of the script to understand its functionality and how it facilitates multi-GPU training.

#### Part 1: Imports and Library Setup
Begin by importing necessary libraries and modules for GPU-accelerated deep learning tasks with PyTorch. The key module for distributed computing is `torch.distributed`.

```python
import os
import torch
import torch.nn as nn
import torch.optim as optim
import torch.backends.cudnn as cudnn
import torch.distributed as dist
import torch.multiprocessing as mp
import torchvision
import torchvision.transforms as transforms
import time
import argparse
```

#### Part 2: Distributed Setup
Next, we create a function called `setup` that initializes the distributed environment necessary for multi-GPU training:

```python
def setup(rank, world_size):
    os.environ['MASTER_ADDR'] = 'localhost'
    os.environ['MASTER_PORT'] = '12355'
    dist.init_process_group("nccl", rank=rank, world_size=world_size)
    torch.cuda.set_device(rank)
```

- `MASTER_ADDR` and `MASTER_PORT` are set to establish communication between different processes. This is crucial for coordinating distributed training across multiple GPUs.
- `dist.init_process_group("nccl", rank=rank, world_size=world_size)` initializes the process group using the NCCL backend, which is optimized for efficient communication on NVIDIA GPUs.
    - `rank` value is assigned to each proces to distinguish between processes.
    - `world_size` refers to the total number of processes that participate in the distributed training setup.
- `torch.cuda.set_device(rank)` ensures each process is assigned a specific GPU device based on its rank, enabling efficient GPU resource management.



#### Part 3: Cleanup Function
We then define a `cleanup()` function that ensures clean release of distributed training resources after completion, preventing resource leaks.

```python
def cleanup():
    dist.destroy_process_group()
```

#### Part 4: Training Function
Finally, we define a `train(rank, world_size)` function that orchestrates distributed training across multiple GPUs:

```python
def train(rank, world_size):
    # Setup: Initializes the distributed environment using setup(rank, world_size).
    setup(rank, world_size)
    
    # Data Loading: Prepares CIFAR-10 dataset with transformations for training.
    print(f'Rank {rank}: Preparing data..')
    transform = transforms.Compose([
        transforms.RandomCrop(32, padding=4),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize((0.4914, 0.4822, 0.4465), (0.2023, 0.1994, 0.2010)),
    ])
    trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)

    # Distributed Sampler: Ensures data is divided among GPUs using DistributedSampler.
    train_sampler = torch.utils.data.distributed.DistributedSampler(trainset, num_replicas=world_size, rank=rank)

    # Data Loader: Creates a DataLoader that iterates through batches of data with distributed sampling and batching.
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=128, shuffle=False, num_workers=8, pin_memory=True, sampler=train_sampler)
    
    # Model Initialization: Initializes ResNet-50 model (net) and distributes it across GPUs using DistributedDataParallel.
    print(f'Rank {rank}: Building model..')
    net = torchvision.models.resnet50().to(rank)
    net = nn.parallel.DistributedDataParallel(net, device_ids=[rank])
    
    # Loss and Optimizer: Defines cross-entropy loss (criterion) and SGD optimizer (optimizer).
    criterion = nn.CrossEntropyLoss().to(rank)
    optimizer = optim.SGD(net.parameters(), lr=0.1, momentum=0.9, weight_decay=5e-4)
    
    # Training Loop: Iterates through epochs and batches, performs forward and backward passes, and updates model parameters.
    def train_epoch(epoch):
        net.train()
        train_sampler.set_epoch(epoch)
        train_loss = 0
        correct = 0
        total = 0
        start_time = time.time()
        for batch_idx, (inputs, targets) in enumerate(trainloader):
            inputs, targets = inputs.to(rank), targets.to(rank)
            optimizer.zero_grad()
            outputs = net(inputs)
            loss = criterion(outputs, targets)
            loss.backward()
            optimizer.step()

            train_loss += loss.item()
            _, predicted = outputs.max(1)
            total += targets.size(0)
            correct += predicted.eq(targets).sum().item()
            
            if batch_idx % 10 == 0:
                print(f'Rank {rank}, Batch: {batch_idx}, Loss: {train_loss/(batch_idx+1)}, Accuracy: {100.*correct/total}%')

        end_time = time.time()
        print(f'Rank {rank}: Training time for epoch {epoch}: {end_time - start_time} seconds')

    # Training Execution: Runs training for 1 epoch.
    for epoch in range(1):
        train_epoch(epoch)
    
    # Cleanup: Releases distributed training resources after completion.
    cleanup()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='PyTorch Distributed Training Example')
    # args.world_size is passed as an argument, specifying the number of processes (world_size) for distributed training from the command line.
    parser.add_argument('--world_size', type=int, default=1, help='Number of processes for distributed training')
    args = parser.parse_args()
    # spawn is a utility that facilitates launching multiple processes in a distributed manner.
    mp.spawn(train, args=(args.world_size,), nprocs=args.world_size, join=True)
```


### Full script

```python
import os
import torch
import torch.nn as nn
import torch.optim as optim
import torch.backends.cudnn as cudnn
import torch.distributed as dist
import torch.multiprocessing as mp
import torchvision
import torchvision.transforms as transforms
import time
import argparse

def setup(rank, world_size):
    os.environ['MASTER_ADDR'] = 'localhost'
    os.environ['MASTER_PORT'] = '12355'
    dist.init_process_group("nccl", rank=rank, world_size=world_size)
    torch.cuda.set_device(rank)

def cleanup():
    dist.destroy_process_group()

def train(rank, world_size):
    # Setup: Initializes the distributed environment using setup(rank, world_size).
    setup(rank, world_size)
    
    # Data Loading: Prepares CIFAR-10 dataset with transformations for training.
    print(f'Rank {rank}: Preparing data..')
    transform = transforms.Compose([
        transforms.RandomCrop(32, padding=4),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize((0.4914, 0.4822, 0.4465), (0.2023, 0.1994, 0.2010)),
    ])
    trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)

    # Distributed Sampler: Ensures data is divided among GPUs using DistributedSampler.
    train_sampler = torch.utils.data.distributed.DistributedSampler(trainset, num_replicas=world_size, rank=rank)

    # Data Loader: Creates a DataLoader that iterates through batches of data with distributed sampling and batching.
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=128, shuffle=False, num_workers=8, pin_memory=True, sampler=train_sampler)
    
    # Model Initialization: Initializes ResNet-50 model (net) and distributes it across GPUs using DistributedDataParallel.
    print(f'Rank {rank}: Building model..')
    net = torchvision.models.resnet50().to(rank)
    net = nn.parallel.DistributedDataParallel(net, device_ids=[rank])
    
    # Loss and Optimizer: Defines cross-entropy loss (criterion) and SGD optimizer (optimizer).
    criterion = nn.CrossEntropyLoss().to(rank)
    optimizer = optim.SGD(net.parameters(), lr=0.1, momentum=0.9, weight_decay=5e-4)
    
    # Training Loop: Iterates through epochs and batches, performs forward and backward passes, and updates model parameters.
    def train_epoch(epoch):
        net.train()
        train_sampler.set_epoch(epoch)
        train_loss = 0
        correct = 0
        total = 0
        start_time = time.time()
        for batch_idx, (inputs, targets) in enumerate(trainloader):
            inputs, targets = inputs.to(rank), targets.to(rank)
            optimizer.zero_grad()
            outputs = net(inputs)
            loss = criterion(outputs, targets)
            loss.backward()
            optimizer.step()

            train_loss += loss.item()
            _, predicted = outputs.max(1)
            total += targets.size(0)
            correct += predicted.eq(targets).sum().item()
            
            if batch_idx % 10 == 0:
                print(f'Rank {rank}, Batch: {batch_idx}, Loss: {train_loss/(batch_idx+1)}, Accuracy: {100.*correct/total}%')

        end_time = time.time()
        print(f'Rank {rank}: Training time for epoch {epoch}: {end_time - start_time} seconds')

    # Training Execution: Runs training for 1 epoch.
    for epoch in range(1):
        train_epoch(epoch)
    
    # Cleanup: Releases distributed training resources after completion.
    cleanup()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='PyTorch Distributed Training Example')
    # args.world_size is passed as an argument, specifying the number of processes (world_size) for distributed training from the command line.
    parser.add_argument('--world_size', type=int, default=1, help='Number of processes for distributed training')
    args = parser.parse_args()
    # spawn is a utility that facilitates launching multiple processes in a distributed manner.
    mp.spawn(train, args=(args.world_size,), nprocs=args.world_size, join=True)
```

## Running the Script
To execute the multi-GPU training script we will use a Bash script (submit_job.sh):

<div class="show-on-ai-lab" style="display:none;" markdown="span">
    ```
    #!/bin/bash
    #SBATCH --job-name=ddp_training
    #SBATCH --cpus-per-task=8
    #SBATCH --mem=60G
    #SBATCH --time=02:00:00
    #SBATCH --output=ddp_training.out

    # Number of GPUs to allocate (adjust this value as needed)
    num_gpus=4

    # Set the number of tasks and GPUs accordingly
    #SBATCH --ntasks=$num_gpus
    #SBATCH --gres=gpu:$num_gpus

    # Execute the job using Singularity
    srun singularity exec --nv /ceph/container/pytorch_24.03-py3.sif python3 multi_gpu.py --world_size=$num_gpus
    ```
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="span">
    ```
    #!/bin/bash
    #SBATCH --job-name=ddp_training
    #SBATCH --cpus-per-task=8
    #SBATCH --mem=60G
    #SBATCH --time=02:00:00
    #SBATCH --output=ddp_training.out

    # Number of GPUs to allocate (adjust this value as needed)
    num_gpus=4

    # Set the number of tasks and GPUs accordingly
    #SBATCH --ntasks=$num_gpus
    #SBATCH --gres=gpu:$num_gpus

    # Execute the job using Singularity
    srun singularity exec --nv pytorch_24.03-py3.sif python3 multi_gpu.py --world_size=$num_gpus
    ```
</div>

<div class="show-on-ai-lab" style="display:none;" markdown="block">
  - `--job-name`: Specifies the name of the job.
  - `-partition`: Defines the partition or queue to submit the job to (l4 in this example).
  - `--cpus-per-task`: Specifies the number of CPUs allocated to each task.
  - `--mem`: Specifies the memory allocated to the job.
  - `--time`: Adjust these settings based on your specific resource requirements.
  - `num_gpus`: Modify this variable to specify the number of GPUs (--ntasks and --gres=gpu) allocated for your job.
  - `srun singularity exec --nv /ceph/container/pytorch_24.03-py3.sif python3 multi_gpu.py --world_size=$num_gpus`: Executes the job inside the specified Singularity container (`pytorch_24.03-py3.sif`) with Python 3, running the `multi_gpu.py` script and passing `--world_size=$num_gpus` as an argument to specify the number of GPUs for distributed training.
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="block">
  - `--job-name`: Specifies the name of the job.
  - `-partition`: Defines the partition or queue to submit the job to (l4 in this example).
  - `--cpus-per-task`: Specifies the number of CPUs allocated to each task.
  - `--mem`: Specifies the memory allocated to the job.
  - `--time`: Adjust these settings based on your specific resource requirements.
  - `num_gpus`: Modify this variable to specify the number of GPUs (--ntasks and --gres=gpu) allocated for your job.
  - `srun singularity exec --nv pytorch_24.03-py3.sif python3 multi_gpu.py --world_size=$num_gpus`: Executes the job inside the specified Singularity container (`pytorch_24.03-py3.sif`) with Python 3, running the `multi_gpu.py` script and passing `--world_size=$num_gpus` as an argument to specify the number of GPUs for distributed training.
</div>