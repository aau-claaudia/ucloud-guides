# Setup Visual Studio Code on AI-LAB

1. Open VS Code
2. Go to the Extensions, search for "Remote - SSH" and install it
3. Open your SSH configuration file (usually located at ~/.ssh/config or C:\Users\<YourUsername>\.ssh\config on Windows). If it isn't there create it
4. Enter

```
Host ailab-fe01
  HostName ailab-fe01.srv.aau.dk
  User <email>
```

Replace <email> with your AAU email

4. Open the Command Palette (F1) and select Remote-SSH: Connect to Host...
5. Click ailab-fe01
6. Choose Linux as operating system, if asked
7. Enter your password

You can now enter commands through VS codes til AI-LAB in the VS Code terminal

## Setup file explorer in VS Code

1. Go to Explorer and click "Open Folder" below "Connected to remote"
2. Click "OK" to the deafult directory path'

You now have a file explorer to AI-LAB