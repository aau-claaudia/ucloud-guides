To login you need to [SSH connect](https://www.cloudflare.com/learning/access-management/what-is-ssh/) to either of the two front-end nodes, `ailab-fe01` or `ailab-fe02`. 

Run the following command on a command-line interface on your local Windows (*Windows PowerShell*), macOS, or Linux computer:

```
ssh -l user@student.aau.dk ailab-fe01.srv.aau.dk
```
or
```
ssh -l user@student.aau.dk ailab-fe02.srv.aau.dk
```

Replace `user@student.aau.dk` with your AAU email address.

!!! info
    The first time you connect, you will get a message like:

    ```
    The authenticity of host 'ailab-fe01.srv.aau.dk (172.21.131.1300)' can't be established.
    ED25519 key fingerprint is SHA256:xosJtOSfQyyW16c6RtpN8tAi/91XHCR3GxM9/KJEogg.
    This key is not known by any other names.
    Are you sure you want to continue connecting (yes/no/[fingerprint])?
    ```

    Please confirm by typing 'yes' to proceed with the connection.

Enter your AAU password when prompted. 

When you can see `user@student.aau.dk@ailab-fe01:~$` you are succesfully logged in.

<hr>

You are now ready to proceed to learn about [**file management :octicons-arrow-right-24:**](file-management.md)