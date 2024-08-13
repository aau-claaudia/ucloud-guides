
Creating a conda environment in a container may be easily done using [cotainr](https://cotainr.readthedocs.io/en/stable/). 

!!! info "About cotainr"
    [cotainr](https://cotainr.readthedocs.io/en/stable/) is a tool developed by DeiC to ease building of Singularity containers. It can be used to build custom containers with additional software installable by Conda and Pip. This means it is primarily for adding Python packages to a container. It works from a base container image that you specify and then build additional Anaconda and pip packages which you supply as a conda environment specification.

<div class="show-on-ai-lab" style="display:none;" markdown="span">
  Cotainr is included in the `/ceph/container` directory. To check the current version, enter `ls /ceph/container`. Currently, the version used in this guide is `cotainr-2023.11.0`.

  You can access cotainr by using the path `/ceph/container/cotainr-2023.11.0/bin/cotainr`. But first we will create a conda environment file, `conda_env.yml` that contains the conda channels/repositories and packages you need:
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="span">
  We begin by downloading the latest release from the Cotainr repository. In the example below we are downloading the latest version as of late 2023. Be sure to check for newer versions at the aforementioned repository. Look for the zip archive "Assets" section, and copy the link.

  ```
  wget https://github.com/DeiC-HPC/cotainr/archive/refs/tags/2023.11.0.zip
  ```

  You should now have a zip archive, which you can unzip with:

  ```
  unzip 2023.11.0.zip
  ```

  After this has been done, you should have a directory called `cotainr-2023.11.0`. We should now be able to launch Cotainr and access its commands from within this directory. Next, we will create a conda environment file, `conda_env.yml` that contains the conda channels/repositories and packages you need:
</div>

Type `nano` and press `ENTER` (or use the editor of your choice), and enter the packages of your choice in the editor. In this example we will install `python=3.11.0` and `numpy=1.23.5`:

```console
channels:
  - conda-forge
dependencies:
  - python=3.11.0
  - numpy=1.23.5
```

!!! info "Instaling pip packages"
    Cotainr does not allow the direct creation of a container from a pip requirements.txt file. Nevertheless, pip packages can be integrated into a conda environment. For instance, by updating `conda_env.yml` to include them.

    ```console
    channels:
      - conda-forge
    dependencies:
      - python=3.11.0
      - numpy=1.23.5
      - pip
      - pip:
        - scipy==1.9.3
    ```

Save by pressing `CTRL + O` enter a file name, e.g. `conda_env.yml` and exit by pressing `CTRL + X`. Now you should have `conda_env.yml` in your directory. 

We can now build a container (Lets call it `conda_container.sif`) containing the conda environment specified in `conda_env.yml` with the following command:

<div class="show-on-ai-lab" style="display:none;" markdown="span">
```
srun /ceph/container/cotainr-2023.11.0/bin/cotainr build conda_container.sif --base-image=docker://ubuntu:22.04 --conda-env=conda_env.yml --accept-licenses
```
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="span">
```
srun cotainr-2023.11.0/bin/cotainr build conda_container.sif --base-image=docker://ubuntu:22.04 --conda-env=conda_env.yml --accept-licenses
```
</div>


!!! info
    `--base-image=docker://ubuntu:22.04` is used because we have to use a base image in which [bash](https://www.gnu.org/software/bash/) is installed, like [Ubuntu 22.04 image](https://hub.docker.com/_/ubuntu). 

    `--accept-licenses` is used to acknowledge the [Miniforge license terms](https://github.com/conda-forge/miniforge/blob/main/LICENSE).

After some time you should have `conda_container.sif` container image in your directory. 

You can access the conda image and run code using the dependencies you set up. Lets try to see if it works by printing the numpy version:

```
srun singularity exec conda_container.sif python3 -c "import numpy; print(numpy.__version__)"
```

The terminal should now print `1.23.5`.