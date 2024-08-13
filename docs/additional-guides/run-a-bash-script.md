In this guide, we will demonstrate how to submit a job to Slurm using a bash script. 

!!! info "What is a bash script?"
    A bash script is essentially a text file with a series of commands that you would normally type in the terminal. When executed, the script runs these commands in sequence. Bash scripts are used to automate repetitive tasks, manage system operations, and perform complex workflows.

Let's create a bash script to submit a simple job that runs a Singularity container. This job will run a Python script inside the container.

#### Step 1: Prepare the Singularity Container

<div class="show-on-ai-lab" style="display:none;" markdown="span">
    Ensure you have a Singularity image (.sif file) ready. For this example, let's use the `tensorflow_24.03-tf2-py3.sif` container image from `/ceph/container`.
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="span">
    Ensure you have a Singularity image (.sif file) ready. For this example, we will use `tensorflow_24.03-tf2-py3.sif` container image.
</div>

#### Step 2: Create the Python Script
Create a simple Python script named hello.py:

```
print("Hello from within the Singularity container!")
```

#### Step 3: Create the Bash Script
Create a bash script named run_job.sh:

<div class="show-on-ai-lab" style="display:none;" markdown="span">
    ```
    #!/bin/bash
    #SBATCH --job-name=singularity_test
    #SBATCH --output=result_%j.out
    #SBATCH --error=error_%j.err
    #SBATCH --time=00:10:00
    #SBATCH --ntasks=1
    #SBATCH --cpus-per-task=1
    #SBATCH --mem=1G

    singularity exec /ceph/container/tensorflow_24.03-tf2-py3.sif python3 hello.py
    ```
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="span">
    ```
    #!/bin/bash
    #SBATCH --job-name=singularity_test
    #SBATCH --output=result_%j.out
    #SBATCH --error=error_%j.err
    #SBATCH --time=00:10:00
    #SBATCH --ntasks=1
    #SBATCH --cpus-per-task=1
    #SBATCH --mem=1G

    singularity exec tensorflow_24.03-tf2-py3.sif python hello.py
    ```
</div>

Explanation of SBATCH Options:

- `--job-name`: Name of the job (<span style="font-weight: 700;">Optional</span>).
- `--output`: File where standard output will be written, with %j replaced by the job ID (<span style="font-weight: 700;">Required</span>).
- `--error`: File where standard error will be written, with %j replaced by the job ID (<span style="font-weight: 700;">Optional</span>).
- `--time`: Maximum run time (hh:mm) (<span style="font-weight: 700;">Optional</span>).
- `--ntasks`: Number of tasks (<span style="font-weight: 700;">Optional</span>).
- `--cpus-per-task`: Number of CPUs per task (<span style="font-weight: 700;">Optional</span>).
- `--mem`: Memory per node (<span style="font-weight: 700;">Optional</span>).

#### Step 4: Submit the Job
To submit the job, use the sbatch command:

```
sbatch run_job.sh
```

After the job gets submitted, you should be able to find a file called something like `result_x.out` with `Hello from within the Singularity container!` in it.