Sometimes, jobs may get stuck or encounter unforeseen issues, causing them to run indefinitely. Setting a time limit ensures that such jobs are automatically terminated after a certain duration, preventing them from consuming resources unnecessarily.

You can add a `--time` parameter to your Slurm command, e.g. `--time=08:00:00` to run a job for maximum 8 hours:

```console
srun --time=08:00:00 hostname
```
<br>

<div class="show-on-ai-lab" style="display:none;">
    <h3>Jobs can run no longer than 12 hours</h3>
    <p>
    Every job submitted to AI-LAB is subject to a time limit of 12 hours. This limit is set to prevent a single user from monopolizing the entire cluster indefinitely. We are trying to ensure that all users receive an equal share of available resources.
    </p>
</div>