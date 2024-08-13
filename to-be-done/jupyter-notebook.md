This guide will show you how to start a Jupyter Notebook on AI-LAB and access it in your browser.

To begin, copy `jupyter_notebook.sh` script from the `/ceph/course/claaudia` directory to your user directory:

```
cp /ceph/course/claaudia/jupyter_notebook.sh .
```

!!! info "Note"
    You also need a container image that includes Jupyter Notebook. Both the PyTorch and TensorFlow images in `/ceph/container` contain Jupyter.

Next, start a Jupyter Notebook session by running the script with the chosen image:

```
srun --pty bash jupyter_notebook.sh <image.sif>
```

This command allocates a compute node, finds an available port, and starts Jupyter Notebook on that port. The `--pty bash` part ensures a pseudo-terminal is created and a bash shell is started on the compute node.

After starting the Jupyter Notebook, you will see instructions similar to:

```
--------------------------------------------------------------------------------------------------
Use the following SSH port forwarding command:
ssh -L 8965:ailab-l4-01:8965 myuser@student.aau.dk@ailab-fe01.srv.aau.dk

Then access the Jupyter Notebook on:
http://localhost:8965/?token=11169962e9c5e3c7107ffcb17918cfbd
--------------------------------------------------------------------------------------------------
```

Next, open a new terminal window and run the provided SSH port forwarding command, e.g.:

```
ssh -L 8965:ailab-l4-01:8965 myuser@student.aau.dk@ailab-fe01.srv>.aau.dk
```

This sets up a port tunnel between AI-LAB and your local machine.

Open your browser and navigate to the provided URL, e.g.: [http://localhost:<port>/?token=<token>](http://localhost:8965/?token=11169962e9c5e3c7107ffcb17918cfbd)

### Important Notes
- **This guide is still in testing. If you experience any problems, please [contact us](../help-and-resources/support.md).**
- **Session Time Limit:** There is a 4-hour time limit on the Jupyter session.
- **Stop the Job:** It is recommended to stop the job once you are done working. Closing the terminal window where you ran the `srun --pty bash jupyter_notebook.sh <image>` command will stop the job.
