This guide will walk you through the process of running an Ollama container image on AI-LAB and using it to serve and run a Large Language Model (LLM) like Llam
Next, you'll run the container in [interactive mode](../additional-guides/running-a-container-in-interactive-mode.md). This allows you to interact with the container and execute commands within it. To do this, use the srun command with the --pty and --gres=gpu:1 options, which allocate a GPU for your session, and singularity shell --nv to open a shell within the container with GPU support enabled.

```
srun --pty --gres=gpu:1 singularity shell --nv /ceph/container/ollama_0.1.37.sif
```

<span style="font-weight: 600;">Note! </span>The container image might be newer version at this time.

Inside the container, start the Ollama service in the background by adding `&` to `ollama serve`. This will prepare the environment to serve LLM requests.

```
ollama serve &
```

The ollama serve command will initialize the server that can handle requests for running models.

When you get `Singularity>` again, then the Ollama service running in the background. You can now run a Large Language Model such as Llama3 by running the following commands:

```
ollama run llama3
```

You should shortly after be able to interact with the LLM.

This guide provides a basic framework for using Ollama on AI-LAB. Depending on your specific use case and requirements, you may need to adapt these instructions accordingly.