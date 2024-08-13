Before you start running jobs, it is important to be aware of the queueing system [Slurm](https://slurm.schedmd.com/quickstart.html).

## Slurm queue system
Slurm is a job scheduling system and is used to allocate resources and manage user jobs on AI-LAB. Jobs on AI-LAB can only be run through Slurm. 

The primary method to run a job via Slurm is by utilizing the command `srun`. Let's try launching a job on a compute node:

```
srun hostname
```

!!! info "Waiting in queue"

    Upon execution, you might receive a notification indicating your job has been queued, awaiting resource availability:

    ```
    srun: job X queued and waiting for resources
    ```

    Once a compute node becomes available, you'll receive confirmation:

    ```
    srun: job X has been allocated resources
    ```

Once a compute node becomes available the `hostname` command executes on the allocated compute node, revealing its identifier (e.g. `ailab-l4-01`).

!!! info "More Slurm commands"
    You can find [additional Slurm commands](../additional-guides/checking-the-queue.md) available to customize your job submissions, such as setting the time limit for a job, specifying the number of CPUs or GPUs, and more.

<hr>

## Executing a containerized job with Singularity
To run a task within a container using Singularity, we need to add specific parameters to the Slurm command. 

As an example, let's try running `print('hello world')` using `Python3` within the `tensorflow_24.03-tf2-py3.sif` container image from `/ceph/container` directory.

```
srun singularity exec /ceph/container/tensorflow_24.03-tf2-py3.sif python3 -c "print('hello world')"
```

- `srun` is the Slurm command used to submit a job.
- `singularity` is the command-line interface for interacting with Singularity.
- `exec` is a sub-command that tells Singularity to execute a command inside the specified container.
- `/ceph/container/tensorflow_24.03-tf2-py3.sif` is the path to the container image.
- `python3 -c "print('hello world')"` is the task that singularity executes.

While this execution proceeds smoothly, it's important to note that the command exclusively utilizes CPUs. The primary role of AI-LAB is to run software that utilises GPUs for computations. In order to run applications with a GPU you need to allocate a GPU to a job using Slurm. 

<hr>

## Allocating a GPU to your job
You can allocate a GPU to a job using the `--gres=gpu` option for Slurm. Additionally, you need to add the `--nv` option to Singularity to enable NVIDIA drivers in the container.

Let's try running a small Python script that performs a simple matrix multiplication of random data to benchmark TensorFlow computing speed with a GPU allocated:

Copy `benchmark_tensorflow.py` from `/ceph/course/claaudia/docs` to your user directory:

```console
cp /ceph/course/claaudia/docs/benchmark_tensorflow.py .
```

Lets try allocating 1 arbitrary available GPU to the job by adding `--gres=gpu:1`:

```console
srun --gres=gpu:1 singularity exec --nv /ceph/container/tensorflow_24.03-tf2-py3.sif python3 benchmark_tensorflow.py
```

Note that the above example allocate 1 GPU to the job. It is possible to allocate more, for example `--gres=gpu:2` for two GPUs. Software for computing on GPU is not necessarily able to utilise more than one GPU at a time. It is your responsibility to ensure that the software you run can indeed utilise as many GPUs as you allocate. It is not allowed to allocate more GPUs than your job can utilise. [Here](../additional-guides/multiple-gpus-with-pytorch.md) is an example of a PyTorch script that can handle multiple GPUs. 

<hr>


**:material-party-popper: Congratulations! :material-party-popper:**

You've mastered the fundamentals of AI-LAB. Ready to take the [**next steps? :octicons-arrow-right-24:**](next-steps.md)