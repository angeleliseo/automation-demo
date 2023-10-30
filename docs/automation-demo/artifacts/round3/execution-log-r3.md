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

