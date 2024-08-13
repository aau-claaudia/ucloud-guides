On AI-LAB, we have a ready-to-use [TensorFlow](https://www.tensorflow.org/) container image. This allows you to quickly leverage TensorFlow's functionality within the AI-LAB environment without needing to install or configure the software yourself.

First, lets get the path to the TensorFlow container image from the AI-LAB container directory:

```
ls /ceph/container
```

You can run TensorFlow scripts using Singularity to execute within the container. Below is an example of running a TensorFlow script with 1 GPU allocated:

```
srun --gres=gpu:1 singularity exec --nv tensorflow_24.03-tf2-py3.sif python3 your_script.py
```

<span style="font-weight: 600;">Note! </span>The container image might be newer version at this time.

#### Checkpointing
Checkpointing is a technique used to ensure that your computational jobs can be resumed from a previously saved state in case of interruptions or failures. TensorFlow provides native support for checkpointing during model training, allowing you to save the model's weights at specific intervals. [This guide](../additional-guides/checkpointing.md#tensorflow-model-checkpointing) demonstrates how to use the `ModelCheckpoint` callback to checkpoint with TensorFlow. 

