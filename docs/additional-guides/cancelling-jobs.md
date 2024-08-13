There are several scenarios where you might need to cancel jobs, such as when a job is stuck, running longer than expected, or you realize that the job parameters were set incorrectly. Here’s a guide on how to cancel jobs with Slurm.

### Checking Job Status
Before cancelling a job, it’s often useful to check its current status or job ID. You can list your currently running or queued jobs using the squeue command:

```
squeue --me
```

### Cancelling a Single Job
To cancel a specific job, use the `scancel` command followed by the job ID. For example, if your job ID is `12345`, you can cancel it by running:

```
scancel 12345
```

### Cancelling Multiple Jobs
If you need to cancel all your jobs, you can cancel all jobs belonging to your user by using:

```
scancel --user=$USER
```

This command is particularly useful if you have submitted a batch of jobs and need to cancel them all simultaneously.