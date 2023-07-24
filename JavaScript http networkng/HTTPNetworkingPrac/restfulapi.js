/* 

Representational State Transfer, or REST, is a 
popular convention that HTTP servers follow. 
Not all HTTP APIs are "REST APIs", or "RESTful", 
but it is very common.

RESTful servers follow a loose set of rules that 
makes it easy to build reliable and predictable 
web APIs. REST is more or less a set of 
conventions about how HTTP should be used.

The big idea behind REST is that resources are 
transferred via well-recognized, 
language-agnostic client/server interactions. 
A RESTful style means the implementation of 
the client and server can be done independently 
of one another, as long as some simple standards, 
like the names of the available resources, have 
been established. (example: backend and 
frontend can be written in diff languages)

A RESTful architecture is stateless, which means 
the server does not need to know what state the 
client is in, nor does the client need to know 
what state the server is in. Statelessness in 
REST is enforced by interacting with resources 
instead of commands. Keep in mind, this doesn't 
mean the applications are stateless - on the 
contrary, what would "updating a resource" even 
mean if the server wasn't keeping track of its 
state?
*/