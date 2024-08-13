It is often desirable to monitor the resource status of the compute nodes when you wish to run a job. 

The `sinfo` command shows basic information about partitions in the queue system and what the states of nodes in these partitions are.

<div class="show-on-ai-lab" style="display:none;" markdown="span">
    ```
    sinfo
        
    PARTITION       AVAIL      TIMELIMIT      NODES      STATE             NODELIST
    l4*                up       12:00:00         11       idle     ailab-l4-[01-11]
    vmware             up          10:00          4       idle        vmware[01-04]
    ```
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="span">
    ```
    sinfo
        
    PARTITION   AVAIL  TIMELIMIT  NODES  STATE NODELIST
    batch*         up   12:00:00      1    mix nv-ai-04
    batch*         up   12:00:00      8   idle a256-t4-[01-02],i256-a10-06,i256-a40-[01-02]...
    prioritized    up 6-00:00:00      8   idle a256-t4-[01-02],i256-a10-06,i256-a40-[01-02]...
    ```
</div>

1.  `PARTITION` can be understood as distinct categories or groups of compute nodes, essentially serving as separate queues for jobs.
2.  `AVAIL` shows the availability of the partition where `up` is normal, working state where you can submit jobs to it.
3.  `TIMELIMIT` shows the time limit imposed by each partition in `HH:MM:SS` format.
4.  `NODES` shows how many nodes are in the shown state in the specific partition.
5.  `STATE` shows which state the listed nodes are in: `mix` means that the nodes are partially full - some jobs are running on them and they still have available resources; `idle` means that they are completely vacant and have all resources available; `allocated` means that they are completely occupied. Many other states are possible, most of which mean that something is wrong.
6.  `NODELIST` shows the specific compute nodes that is affected by the job.

You can also use the command `scontrol show node` or `scontrol show node <node name>` to show details about all nodes or a specific node, respectively.

<div class="show-on-ai-lab" style="display:none;" markdown="span">
    ```
    scontrol show node ailab-l4-04

    NodeName=ailab-l4-04 Arch=x86_64 CoresPerSocket=32
    CPUAlloc=0 CPUTot=128 CPULoad=2.00
    AvailableFeatures=(null)
    ActiveFeatures=(null)
    Gres=gpu:l4:8(S:0-1)
    ...
    ```
</div>

<div class="show-on-ai-cloud" style="display:none;" markdown="span">
    ```
    scontrol show node a256-t4-01

    NodeName=a256-t4-01 Arch=x86_64 CoresPerSocket=16 
    CPUAlloc=12 CPUTot=64 CPULoad=0.50
    AvailableFeatures=(null)
    ActiveFeatures=(null)
    Gres=gpu:t4:6
    ...
    ```
</div>


The two commands `sinfo` and `scontrol show node` provide information which is either too little or way too much detail in most situations. As an alternative, we provide the tool `nodesummary` to show a hopefully more intuitive overview of the used/available resources.

```
nodesummary
```

![Screenshot of `nodesummary` in use.](../assets/img/nodesummary.png)