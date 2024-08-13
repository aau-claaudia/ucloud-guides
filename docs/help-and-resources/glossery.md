### HPC
High-performance computing (HPC) uses powerful resources to perform complex, data-intensive tasks beyond a single computer's capacity. HPC systems include multiple processors, large memory, and specialized networking for rapid data exchange. Researchers can simulate, model, and analyse data at unprecedented speed and scale.

<hr>

### Deep learning
The AI Cloud is a facility consisting of several servers designed to be ideal for training deep learning algorithms. Deep learning is in many cases branded as artificial intelligence (AI) - hence the name AI Cloud. This also makes the facility good for a wide range of computationally intensive work such as numerical simulations and high-performance data analysis (HPDA). See "Overview" in the menu above for more details on what the AI Cloud consists of.

<hr>

### Parallel Computing
Parallel computing refers to the simultaneous execution of multiple tasks or parts of a single task across multiple processing units, such as CPUs or GPUs. This approach significantly accelerates computational tasks by dividing the workload among several processors, thereby reducing overall processing time.

<hr>

### Front-end node
The front-end node is used for logging into the platform, accessing your files, and starting jobs on the compute nodes. The front-end node is a relatively small server which is *not* meant for performing heavy computations; only light-weight operations such as transferring files to and from AI-LAB and defining and launching job scripts.

<hr>

### Computing cluster
A computing cluster is a collection of interconnected computers (compute nodes) that work together as a single, integrated computing resource. This setup is designed to handle large computational tasks more efficiently than a single computer could. Clusters are used for tasks that require high performance and availability, such as scientific simulations, data analysis, and large-scale web services.

<hr>

### Compute nodes
Compute Nodes are the individual computers within the Computing cluster that perform the actual computational work. Each compute node is a separate computer, equipped with its own processors (CPUs), memory (RAM), and GPUs for specialized computations. Compute nodes are networked together and run a unified operating system and software environment. Compute nodes are tasked with executing the computational jobs submitted by users. In AI-LAB, users don't interact directly with compute nodes. Instead, they submit jobs through the job scheduler Slurm, which then allocates the necessary resources and runs the job on the compute nodes.

<hr>

### Slurm
The Slurm queue system is AI-LABs job scheduling and management tool commonly used in HPC environments. It efficiently allocates computing resources by prioritizing and scheduling jobs submitted by users based on their requirements and available resources. Through Slurm, users can submit their computational tasks to a centralized queue, allowing for fair resource distribution and optimal utilization of the HPC system.

<hr>

### Image
An image is a static, portable file that contains all the components needed to run a piece of software, including the code, runtime, system tools, libraries, and settings. It serves as a blueprint for creating containers.

<hr>

### Container
A container is a runtime instance of an image that is executed and managed by Singularity. Containers provide an isolated environment to run applications, ensuring consistency and portability across different systems.
