# Execution Log Iteration 3

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

**This partition will go away on reboot or shutdown**

- It was noticed the test started very good after the adjustments on hardware
- After more than 15 threads where introduced and load went beyond the planned 3 TPS there was a point where the response time moved up from ~ 1 second per transaction to ~ 4 seconds per transaction
- Average TPS are ~ 7 TPS so, this is provoking the high RTs due to we are over stressing the application.
- As how the test is configured today it is a 2X test (200%) of load
- The pacing time needs to be adjusted to the double to attempt to emulate the production load correctly to target 3 TPS
- In spite the overload, this time errors terms of transactions fails and error rate was not that bad as first tests. 
- Also it seems Memory counters looks better, we need to wait until review the server side KPI with *nmon*
- There is a worry when watching the Memory utilization in real time, the memory seems not to be released correctly and in spite the steady state was reached more than 10 minutes ago the memory keep being exhausted, keep used and doesn't release.
- Also the hard disk is being full it started in 60% now it went until 95%
- it was found after checking the root cause of the disk space saturation was the log files generated for the web application that reach more than 2GB per log and seems not to be purged 
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
- 