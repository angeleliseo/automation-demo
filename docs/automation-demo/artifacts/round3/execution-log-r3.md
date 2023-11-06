# Execution Log Iteration 3

- It was noticed the test started very good after the adjustments on hardware
- After more than 15 threads where introduced and load went beyond the planned 3 TPS there was a point where the response time moved up from ~ 1 second per transaction to ~ 4 seconds per transaction
- Average TPS are ~ 7 TPS so, this is provoking the high RTs due to we are over stressing the application.
- As how the test is configured today it is a 2X test (200%) of load
- The pacing time needs to be adjusted to the double to attempt to emulate the production load correctly to target 3 TPS
- Before the adjustment on pacing for trying to reach the planned load. It needs to be explored the recommendations.
- In spite the overload, this time errors terms of transactions fails and error rate was not that bad as first tests. 
- Also it seems Memory counters looks better, we need to wait until review the server side KPI with *nmon*
- There is a worry when watching the Memory utilization in real time, the memory seems not to be released correctly and in spite the steady state was reached more than 10 minutes ago the memory keep being exhausted, keep used and doesn't release.
- Also the hard disk is being full it started in 60% now it went until 95%

### Supporting Images

**JMeter Execution**
![Threads](img/jmeter_r3.png)

**Test Side KPI with Grafana**
![Threads](img/grafana_r3.png)

**Response Over Time**
![Threads](img/rt_r3.png)

**Transactions per Second**
![Threads](img/tps_r3.png)

**CPU Utilization**
![Threads](img/cpu_r3.png)

**Disk Busy**
![Threads](img/diskbusy_r3.png)

**Memory Free and Memory Cached**
![Threads](img/memoryfree_r3.png)

![Threads](img/memorycache_r3.png)

**Apache (web server) CPU Waits **

![Threads](img/apachewait_r3.png)

### Memory and disk space issue

**Disk Space issue noticed**

![Threads](img/diskspace_r3.png)

**Memory not released issue**

![Threads](img/memory_rt_r3.png)

![Threads](img/memory_rt2_r3.png)

