# Performance Recommendations

After doing an analysis of the execution and performance counter in test side and server side it was noticed an impact in Memory, CPU and Disk. So the following recommendation is given.

- CPU has to be increase do avoid the *PROC wait* spikes that will impact application performance
- Memory is high consumed when the application is trying to handle the *Expected Load* this provokes the server start using the HD which is considerably slower to cache Memory when the RAM is exhausted.
- Finally after checking the server by SSH into it, it was noticed the SDA/SDA3 partition is very small in terms of space. This probably provoke issues when caching memory.
- After these adjustments are done a validation regression has to be executed to analyze if the TPS are being possessively affected by the change and they are under the SLO.

> [!important]
> It was discussed with Dev and Business team and they actually manifest that there was a time where the server didn't come up after a reboot due to lack of space on the main partition. This has to be addressed ASAP.

