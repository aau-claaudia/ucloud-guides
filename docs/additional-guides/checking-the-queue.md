When using the cluster, you typically wish to see an overview of what is currently in the queue. For example to see how many jobs might be waiting ahead of you or to get an overview of your own jobs.

The command `squeue` can be used to get a general overview:

<div class="show-on-ai-lab" style="display:none;" markdown="span">
    ```
    squeue

    JOBID   PARTITION       NAME      USER    ST      TIME    NODES   NODELIST(REASON)
    42            gpu   interact  xxxxxxxx     R   6:45:14        1        ailab-l4-01
    ```
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="span">
    ```
    squeue

    JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
    31623     batch     DRSC xxxxxxxx  R    6:45:14      1 i256-a10-10
    31693     batch singular yyyyyyyy  R      24:20      1 i256-a40-01
    31694     batch singular yyyyyyyy  R      24:20      1 i256-a40-01
    31695     batch singular yyyyyyyy  R      24:20      1 i256-a40-01
    31696     batch singular yyyyyyyy  R      24:20      1 i256-a40-01
    31502 prioritiz runQHGK. zzzzzzzz PD       0:00      1 (Dependency)
    31504 prioritiz runQHGK. zzzzzzzz PD       0:00      1 (Dependency)
    ```
</div>


1.  `JOBID` shows the `ID` number of each job in queue.
2.  `PARTITION` shows which partition each job is running in.
3.  `NAME` is the name of the job which can be specified by the user creating it.
4.  `USER` is the username of the user who created the job.
5.  `ST` is the current state of each job; for example `R` means a job is running and `PD` means pending. There are other states as well - see `man squeue` for more details (under `JOB STATE CODES`).
6.  `TIME` shows how long each job has been running.
7.  `NODES` shows how many nodes are involved in each job allocation.
8.  `NODELIST` shows which node(s) each job is running on, or alternatively, why it is not running yet.

 
Showing your own jobs only:

```
squeue --me
```

`squeue` can show many other details about jobs as well. Run `man squeue` to see detailed documentation on how to do this.
