On AI-LAB, we have a ready-to-use [MATLAB](https://se.mathworks.com/products/matlab.html) container image. This means that you can quickly access MATLAB's functionality within the AI-LAB environment without needing to install or configure the software yourself. Lets try to batch process a MATLAB script:

First, lets get the path to the MATLAB container image from the AI-LAB container directory:

```
ls /ceph/container
```

Next, set the environment variable to specify the MATLAB license. In this case, point it to the AAU license server:

```
export MLM_LICENSE_FILE=27000@matlab.srv.aau.dk
```

You can now process MATLAB scripts. To test if everything is working, copy the following script:

```
cp /ceph/course/claaudia/docs/matlab_script.m .
```

Then, batch process the script using the command:

```
srun singularity exec matlab_r2024a.sif matlab -batch "run('script.m')"
```

<span style="font-weight: 600;">Note! </span>The container image might be newer version at this time.


If successful, the script should print `Hello World.`