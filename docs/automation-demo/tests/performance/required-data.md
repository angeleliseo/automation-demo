# Required Data

### Index
- [Data required for scripting proposes](required-data.md#data-scripts)
- Data required before the execution of the test scenario
- Data cleanup post test execution


### [Data required for scripting proposes ](#data-scripts)
In order to create the script to test the scenario, it will be required to have a list of user of **customer type** that will be the one will create tickets in the UVDesk web application. The number of users will be at least 3 users so hidden correlations can be explored by changing this data in different iterations during *dry runs*.

Password will not be displayed here for security concerns:

| No  | user        |
| --- | ----------- |
| 01  | test1@local |
| 02  | test2@local |
| 03  | test3@local |


### Data required before the execution of the test scenario
To test the required scenarios  a wide list of users will be required, the number of users will depend on how much load is required and if the user support multiple-sessions active from the same IP Addresses or Agents (browsers).

| No  | user         |
| --- | ------------ |
| 01  | test1@local  |
| 02  | test2@local  |
| 03  | test3@local  |
| 04  | test4@local  |
| 05  | test5@local  |
| 06  | test6@local  |
| 07  | test7@local  |
| 08  | test8@local  |
| 09  | test9@local  |
| 10  | test10@local |


### Data Cleanup post test execution
Since the critical scenario to test is the Ticket creation, the necessity of having existing tickets or deleting existing tickets post an execution is going to be very helpful to maintain the environment in good shape.

After doing reverse engineering (or collaborate with dev or DB admin) it was identified the following tables below as key to delete tickets once created. 
Same tables are going to be impacted if we want to create tickets.

Primary tables to clear when ticket is deleted:

~~~
agent_activity
uv_thread
uv_ticket
uv_tickets_collaborators
uv_tickets_labels
uv_tickets_tags
~~~

Secondary tables:
~~~
uv_tickets_attachments --> (related with uv_thread)
uv_ticket_rating
~~~

### This is the query to delete all the created tickets:

~~~sql
delete from uv_ticket where id='2';
~~~

Where id is the *ticket_id* you want to delete from the system. 
If all the created tickets during a test wants to be deleted the below query can be executed instead:

~~~sql
delete from uv_ticket;
~~~

> [!important]
> This can be done in that simple way due to the database has all the FK configured in the right way and cascade options are setup.

---
## Cleaning mysql DB 

### How to connect docker container

~~~shell
sudo docker exec -ti 96019da746eb sh
~~~

### How to connect mysql

~~~shell
mysql -h localhost -u root -p uvdesk
~~~

### Check the space consumed for all the DB

~~~sql
SELECT 
    table_schema 'Database Name',
    SUM(data_length + index_length) 'Size in Bytes',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) 'Size in MiB'
FROM information_schema.tables 
GROUP BY table_schema;
~~~

Expected output:

~~~
+--------------------+---------------+-------------+                          
| Database Name      | Size in Bytes | Size in MiB |                          
+--------------------+---------------+-------------+                          
| information_schema |        163840 |        0.16 |                          
| mysql              |       8132559 |        7.76 |                          
| performance_schema |             0 |        0.00 |                          
| sys                |         16384 |        0.02 |                          
| uvdesk             |       1851392 |        1.77 |                          
+--------------------+---------------+-------------+                          

5 rows in set (2.10 sec)
~~~



