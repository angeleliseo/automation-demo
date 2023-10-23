# Required Data

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

