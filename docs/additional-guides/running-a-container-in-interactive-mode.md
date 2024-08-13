You can launch a shell within a Singularity container, allowing you to interact with the container's environment. Use the `shell` command with the desired image as follows

<div class="show-on-ai-lab" style="display:none;" markdown="span">
    ```
    srun --gres=gpu:1 --pty singularity shell --nv /ceph/container/tensorflow_24.03-tf2-py3.sif
    ```
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="span">
    ```
    srun --gres=gpu:1 --pty singularity shell --nv tensorflow_24.03-tf2-py3.sif
    ```
</div>

The `--pty` creates a virtual interactive terminal for a command to run within.

You now have shell access

```
Singularity>
```

Lets try checking the Python version:

```
python3 --version
```

You can exit the interactive session with:

```
exit
```