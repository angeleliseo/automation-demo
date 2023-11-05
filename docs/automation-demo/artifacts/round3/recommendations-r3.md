# Analysis and Recommendations

It was noticed the amount of allocated memory for temporary files was  increased this time until 3.1 GB on this for the partition tmpfs as can be seen below:

~~~shell
user@uvdesk:~/monitor$ df -h                                                                         
Filesystem                         Size  Used Avail Use% Mounted on                                                                             
tmpfs                              618M  1.2M  617M   1% /run                                                                                   
/dev/mapper/ubuntu--vg-ubuntu--lv   18G   14G  3.4G  81% /                                                                                      
tmpfs                              3.1G     0  3.1G   0% /dev/shm                                                                               
tmpfs                              5.0M     0  5.0M   0% /run/lock                                                                              
/dev/sda2                          1.8G  251M  1.4G  16% /boot                                                                                  
tmpfs                              618M  4.0K  618M   1% /run/user/1000
~~~

This started to be a concern if this can provoke the Hard disk to be exhausted again, after a quick research to understand tmpfs partition behavior in [the official documentation](https://docs.kernel.org/filesystems/tmpfs.html?highlight=tmpfs). The maximum size allocated for this partition will be half of the RAM assigned to the VM, so in this case 3GB.

|   |   |
|---|---|
|size|The limit of allocated bytes for this tmpfs instance. The default is half of your physical RAM without swap. If you oversize your tmpfs instances the machine will deadlock since the OOM handler will not be able to free that memory.|
|nr_blocks|The same as size, but in blocks of PAGE_SIZE.|
|nr_inodes|The maximum number of inodes for this instance. The default is half of the number of your physical RAM pages, or (on a machine with highmem) the number of lowmem RAM pages, whichever is the lower.|

**This partition data will go away on reboot or shutdown**

### Disk space issue

it was found after checking the root cause of the disk space saturation was the log files generated for the web application that reach more than 2GB per log and seems not to be purged 
~~~shell 
root@uvdesk:~# sudo find / -type f -size +500M

/var/lib/docker/overlay2/90cdc41b323d4137cff9bf6c5a86f273546960d2da5a7594af693ac893cca1ae/diff/var/www/uvdesk/var/log/dev.log                   

/var/lib/docker/overlay2/90cdc41b323d4137cff9bf6c5a86f273546960d2da5a7594af693ac893cca1ae/merged/var/www/uvdesk/var/log/dev.log
~~~

- After deleted the dev.log file from diff and reboot the server recovered 2GB space and was able to start MYSQL server
- Also due to the stress test it might be convenient to take a look into the system logs if they are not over loading the disk. We can do that by checking the folder */var/log* and executing the command:
~~~shell
sudo find . -type f -size +500M
~~~
- In order to get the files which size is more than 500MB
- It was found the logging part of the linux system was not optimized to handle the periodical log. So to change the purge for *journald*  and *logrotate* has been suggested to the DevOps team.
- [check this link](https://askubuntu.com/questions/100004/how-can-i-free-space-from-a-massive-39-5gb-var-log-folder)
- There has been done the following steps to clear logs and follow good practices of disk space and logs recantations. 
	- Validate amount of data consumed by journalctl logs
	~~~shell
		journalctl --disk-usage
	~~~

	- Set a *vacuum-size* and *vacuum-time*
	~~~shell
		sudo journalctl --vacuum-size=200M
		sudo journalctl --vacuum-time=2d
	~~~
	- Force log rotate and delete latest logs to release space if not debugging
	~~~shell
		sudo /etc/cron.daily/logrotate
	~~~

- Additionally we can we reclaim some space from docker using the following commands:
~~~shell
sudo docker container prune
sudo docker images prune
sudo docker system prune (care!)
~~~
- It is has been recommended to the Dev team and DevOps team to implement a centralized logging solution to avoid this kind of high Disk IO just for the logging and disk space issues.
- As temporal solution the log creation on Docker can be handled and limited by using the following command: 
~~~shell
sudo docker run --log-opt max-size=10m --log-opt max-file=10 my_container:latest
~~~
- We suggested the DevOps team to use the command below to investigate large files in the system:
~~~shell
du -sh *
~~~
- There has been some issues to process the nmon file with the Visualizer so the following [URL](https://158.175.161.166/) was used
- [Removing](https://forums.uvdesk.com/topic/1885/remove-symfony-web-profiler) the Simphony profiler. Also it was recommended to Dev team to disable all the information logs by [modifying](https://stackoverflow.com/questions/14938355/cache-folder-grown-very-very-fast) the web_profiler.yaml from symphony profiler to the following config:
~~~yaml
web_profiler:                                                                 
    toolbar: false                                                            
    intercept_redirects: false                                                
framework:                                                                    
    profiler: { only_exceptions: true }
~~~
- Go inside the docker container of UVDesk and then to the path  */var/www/uvdesk/var/cache/dev*  and perform cmd:
~~~shell
rm -rf *
~~~
- After that the disk space was released and healthy one more time:
~~~ shell
user@uvdesk:~$ df -h                                                                                                                            
Filesystem                         Size  Used Avail Use% Mounted on           
tmpfs                              618M  1.2M  617M   1% /run                 
/dev/mapper/ubuntu--vg-ubuntu--lv   18G  5.8G   12G  34% /                    
tmpfs                              3.1G     0  3.1G   0% /dev/shm             
tmpfs                              5.0M     0  5.0M   0% /run/lock            
/dev/sda2                          1.8G  251M  1.4G  16% /boot                
tmpfs                              618M  4.0K  618M   1% /run/user/1000
~~~

