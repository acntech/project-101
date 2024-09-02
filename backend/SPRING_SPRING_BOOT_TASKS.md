# Tasks for Spring and Spring Boot presentation

The application consists of a Company part, and an Employee part. The company part is already implemented and working.

Your task will be to implement the Employee part. Here we will focus on the WEB layer but also to ensure that we keep the 
data stored in memory as java objects.

### Domain layer

* We will create a domain object representing an employee

### SERVICE Layer

* We will create a Service for employee that can delegate between the resource and the repository
* We will fix the config so that spring knows about our service


### WEB layer

* Start with the EmployeeResource. This is where we will create the REST endpoints that we can call
* Create the endpoints and verify that you can call them from POSTMAN. Don't worry about what they do or return yet.
Just hardcode a value they always return. First step is creating endpoints we can call.
* Focus on one at the time.
* As you create the endpoints, the tests in no.acntech.project101.web.employee.resources.EmployeeResourceTest should go green if done correctly (should... )
* If you don't have time to finish all the REST endpoints thats ok.

#### If you have time

* Implement the full "flow" of data, including mapping between the Dto and the domain objects but also service logic.

#### If you have even more time
If you have time, then create a connection between an employee and a company.

* An employee needs to have a foreign key constraint to a company
* The entity for employee will need a mapping to company. Since a company can have more than one employee, but an employee (here) can only have one company
  the mapping will ManyToOne (tip: google that to figure out how the mapping can be done)
* In the resource for employee the DTO needs to include a company ID
* The resource needs to look up the company based on the id and set it on the Employee entity before saving.

#### If you extreme amount of more time!
* Create a new endpoint, either in company og in employee that does something you want it to do. Only your imagination can stop you! ;)