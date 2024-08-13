AI-LAB utilizes [Ceph](https://docs.ceph.com/) as its storage solution, providing a robust and scalable file system for your data needs. Your files are organized within the Ceph file system hierarchy, ensuring efficient access and management across the entire platform.

<hr>

## User Directory
Your user directory serves as the primary location for storing personal files and data. It is structured within the Ceph file system as follows:

<div class="tree">
    <ul>
    <li><i class="fa fa-folder-open"></i> /ceph <span>AI-LAB's file system</span>
        <ul>
        <li><i class="fa fa-folder-open"></i> home <span>user home directories</span>
            <ul>
            <li><i class="fa fa-folder-open"></i> [domain] <span>e.g student.aau.dk</span>
                <ul>
                    <li><i class="fa fa-folder"></i> [user] <span>your user directory</span></li>
                </ul>
            </li>
            </ul>
        </li>
        </ul>
    </li>
    </ul>
</div>

Here, [domain] represents your domain or institution (e.g., student.aau.dk), and [user] denotes your unique username on the platform. Any files you store within your user directory are private.

!!! info "Storage quota"
    When users log in to AI-LAB for the first time, a user directory is created for them. These directories are allocated 1 TB of storage by default. When you log in to the platform, you can see your storage usage of the user directory at the very top line:

    ```
    Current quota usage: 181GiB / 1.0TiB
    Welcome to Ubuntu 20.04.6 LTS (GNU/Linux 5.4.0-169-generic x86_64)

    * Documentation:  https://help.ubuntu.com
    * Management:     https://landscape.canonical.com
    * Support:        https://ubuntu.com/pro

    System information as of Fri Mar 15 11:09:21 CET 2024
    ```

<hr>

## Shared Project Directories
AI-LAB fosters collaborative work through shared project directories. These directories enable multiple users to collaborate on projects by providing a centralized space for data sharing and collaboration. Shared project directories are organized under the project directory within the Ceph file system:

<div class="tree">
    <ul>
    <li><i class="fa fa-folder-open"></i> /ceph <span>AI-LAB's file system</span>
        <ul>
        <li><i class="fa fa-folder-open"></i> project <span>shared project directories</span>
            <ul>
            <li><i class="fa fa-folder"></i> project_X
            </li>
            </ul>
        </li>
        </ul>
    </li>
    </ul>
</div>

==TODO: Guide on how to utilize this==

<hr>

## Course Materials
To support educational activities, AI-LAB hosts course-specific materials within dedicated directories. These materials include lecture notes, assignments, datasets, and any resources relevant to the course curriculum. Course directories are structured under the course directory within the Ceph file system:

<div class="tree">
    <ul>
    <li><i class="fa fa-folder-open"></i> /ceph <span>AI-LAB's file system</span>
        <ul>
        <li><i class="fa fa-folder-open"></i> course <span>directory with course specific material</span>
            <ul>
                <li><i class="fa fa-folder-open"></i> Course 1. Introduction to TensorFLow
                <ul>
                    <li><i class="fa fa-folder"></i> Images</li>
                    <li><i class="fa fa-file"></i> tensorflow.sif</li>
                </ul>
                </li>
                <li><i class="fa fa-folder-open"></i> Course 2. ...
            </li>
            </ul>
        </li>
        </ul>
    </li>
    </ul>
</div>

Students and instructors can access course materials effortlessly, enhancing the learning experience and facilitating hands-on exercises.

<hr>

## Ready-to-Use Applications
For convenience and efficiency, AI-LAB offers a collection of ready-to-use applications packaged as container images that can easily be copied to your user directoty. We aim to consistently update these images to the latest versions.

<div class="tree">
    <ul>
    <li><i class="fa fa-folder-open"></i> /ceph
        <ul>
        <li><i class="fa fa-folder-open"></i> container <span>directory with ready-to-use applications</span>
            <ul>
            <li><i class="fa fa-file"></i> tensorflow.sif</li>
            <li><i class="fa fa-file"></i> pytorch.sif</li>
            <li><i class="fa fa-file"></i> ...sif</li>
            </ul>
        </li>
        </ul>
    </li>
    </ul>
</div>

If you have specific container image requests, we welcome your input. Please reach out to us via the [AAU service portal](https://www.serviceportal.aau.dk/) and include "CLAAUDIA" and "AI-LAB" in the subject line.