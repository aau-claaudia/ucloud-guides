### Why do I get `\r` error when running my Python script?
If you encounter an error message like: `/usr/bin/env python3/r: bad interpreter: No such file or directory` while running a .py file, it might be because the file was edited on your local Windows computer before moving it to AI-LAB. Line endings often get converted when files are moved between Linux and Windows. This conversion is a frequent issue as Linux and Unix-like systems use `\n` for line breaks, whereas Windows uses `\r\n` (CRLF, Carriage Return + Line Feed). 

**Solution:** In code editors such as VS Code or PyCharm, you can switch between LF (Linux endings) and CRLF (Windows endings) from the right-hand side of the status bar at the bottom of the window. Therefore, use LF endings if you wish to move a file to AI-LAB.

<hr>

### Why do I get `Error generating job credential` when running a job?
Sometimes there are challenges with Active Directory (AD) at Aalborg University where AD fails to translate UIDs to people's usernames. Consequently, Slurm may encounter authentication issues, preventing you from running a job, and you may notice the job hanging when you run `sinfo`.

**Solution:** Often, the problem resolves itself after some time (~20 minutes), and you will be able to run jobs again. You can also try running the `id` command to translate the username to UID, which usually gets cached and starts working after a while.

<hr>