The AI-LAB platform is built around several key components, including two front-end nodes for managing tasks and code, and 11 compute nodes equipped with diverse hardware options.

In this overview, you will find a description of each major component of AI-LAB. Below, is a diagram illustrating the architecture of the AI-LAB platform.

``` mermaid
flowchart LR
  subgraph id1[<p style="font-family: Barlow, sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; color: #221a52; letter-spacing: 1px; margin: 5px;">Compute nodes</p>]
  direction TB
  A["<span><img src="/assets/img/server.svg"  width='25' height='25' >ailab-l4-[01-11]</span>"]
  end

  subgraph id2[<p style="font-family: Barlow, sans-serif; font-weight: 800; font-size: 16px; text-transform: uppercase; color: #221a52; letter-spacing: 1px; margin: 10px;">AI-LAB</p>]
  direction TB
  subgraph id3[<p style="font-family: Barlow, sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; color: #221a52; letter-spacing: 1px; margin: 5px;">Front-end nodes</p>]
    direction TB
    G["<span><img src="/assets/img/server.svg" width='25' height='25'>ailab-fe[01-02]</span>"]
    end
  id3 --> id1 

  subgraph id4[<p style="font-family: Barlow, sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; color: #221a52; letter-spacing: 1px; margin: 5px;">File storage</p>]
    direction TB
    E["<span><img src="/assets/img/server.svg" width='25' height='25'>Ceph</span>"]
    end

  id1 & id3 <--> id4
  end

  F[<span><img src="/assets/img/person.svg" width='25' height='25'>User laptop</span>]-- SSH --> id3

```




<hr>

## Front-end nodes
You start by logging into a front-end node, either `ailab-fe01` or `ailab-fe02`. These nodes act as the gateway to the HPC system. Here, you can manage files, write and edit code, and prepare your computational tasks. It is important to note that front-end nodes are not intended for heavy computations; they are optimized for task preparation and interaction with the HPC environment.

<hr>

## Compute nodes
AI-LAB currently include the following compute nodes:

| Node name            | CPU model             | Number of CPUs | Number of cores | Number of GPUs | GPU Model | Total Memory (GB) |
| -------------------- | --------------------- | -------------- | --------------- | -------------- | --------- | ----------------- |
| ailab-l4-[01-11]     | AMD EPYC 7543 32-Core | 128            | 64              | 8              | NVIDIA L4 | 500               |
