# Tasks for data access presentation

We should already have created some endpoints in the EmployeeResource class. Now it's time to do something other than returning hardcoded values.

### Domain layer

* We will create a table in the database for storing an employee.
* We will create an entity representing an employee

### SERVICE Layer

* We will create a repository for doing CRUD operations on an employee
* We will create a Service for employee that can delegate between the resource and the repository
* We will fix the config so that spring knows about our repo and service

The test no.acntech.project101.employee.repository.EmployeeRepositoryTest has some lines commented out. Running it should verify that the
repository works as intended. Naming may be wrong depending on how you named things.

### WEB layer
* Instead of hardcoding return values we should call our service.
* The service will return the entity version of an employee, but our resource should return the DTO version (data transfer object)
* Implement the converters for going between an entity and a DTO
* Use the converters in the resource 

To verify that it works from the resource all the way to the database, use the test src/test/java/no/acntech/project101/web/employee/resources/EmployeeResourceIT.java

Note that is will probably not compile, depending on how you named things. Fix as needed. 

Also an easy way to verify that it works is to run it and call it via POSTMAN

#### If you have time
If you have time, then create a connection between an employee and a company. 

* An employee needs to have a foreign key constraint to a company 
* The entity for employee will need a mapping to company. Since a company can have more than one employee, but an employee (here) can only have one company 
the mapping will ManyToOne (tip: google that to figure out how the mapping can be done)
* In the resource for employee the DTO needs to include a company ID
* The resource needs to look up the company based on the id and set it on the Employee entity before saving. 

#### If you still have time
* Create a new endpoint, either in company og in employee that does something you want it to do. Only your imagination can stop you

