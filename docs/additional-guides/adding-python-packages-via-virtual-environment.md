To enhance the functionality of a containerized environment, you can add additional Python packages using a virtual environment. This guide outlines the steps to create and utilize a virtual environment within your container.

Begin by creating a virtual environment in your directory. This allows you to install packages that your container instance can access.

```
python3 -m venv my-virtual-env
```

Launch a shell session within your container using Singularity (in this case `tensorflow_24.03-tf2-py3.sif`).

<div class="show-on-ai-lab" style="display:none;" markdown="span">
    ```
    srun --pty singularity shell /ceph/container/tensorflow_24.03-tf2-py3.sif
    ```
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="span">
    ```
    srun --pty singularity shell tensorflow_24.03-tf2-py3.sif
    ```
</div>


Once inside the container's shell, activate the virtual environment you just created.

```
source my-virtual-env/bin/activate
```

With the virtual environment activated, install the Python packages you need. For example, to install `numpy`, `pandas`, and `matplotlib`:

```
pip install numpy pandas matplotlib
```

This command will download and install the specified packages into your virtual environment.

To confirm that the packages were successfully installed and are accessible within the container, you can check their versions or run basic scripts:

```
python3 -c "import matplotlib; print(matplotlib.__version__)"
```

Remember that you must always activate the virtual environment (`source my-virtual-env/bin/activate`) within your container's shell before using the installed packages. This ensures that Python knows where to find the packages and dependencies.