# Project-101 backend
Backend provides REST APIs for CRUD operations on Companies and Employees and is used consumed by UI in the frontend application
# Getting started

### Build
````(bash)
mvn clean install
````

### Run from IntelliJ
1. Navigate to the [Project101Application.java](web/src/main/java/no/acntech/project101/Project101Application.java)
1. Click on the green play button :arrow_forward: on the left side

# REST APIs
Base Url: `http://localhost:8080`

### Companies APIs
- `GET /companies` - read all companies, returns `200` and array of companies
- `GET /companies/{id}` - read company by id, returns `200` if found, otherwise `404` not found
- `POST /companies` - create new company by request body, returns `201` if created, otherwise `500` internal server error
- `POST /companies/{orgnr}` - create new company by orgnr (valid orgnr must be used, duplicates allowed), returns `201` if created, otherwise `500` internal server error
- `DELETE /companies/{id}` - delete company by id, returns `202` if deleted, otherwise `404` if not found

### Employees APIs
- `GET /employees` - read all employees, returns `200` and array of employees
- `GET /employees/{id}` - read employee by id, returns `200` if found, otherwise `404` not found
- `POST /employees` - create new employee by request body, returns `201` if created, otherwise `500` internal server error
- `PATCH /employees` - update existing employee by request body, returns `200` if updated, `404` if not found, otherwise `500` internal server error
- `DELETE /employees/{id}` - delete employee by id, returns `202` if deleted, otherwise `404` if not found

# Testing APIs with Postman
To quickly get started with testing APIs mentioned above you can import predefined Postman collections stored in this repository, see [postman](postman) folder.

1. Create new Postman `Workspace` with name `Accenture IES project-101`
1. Click `Import` button to the top left > `Import Folder` > select [postman](postman) folder 
1. Select `localhost` in the Environment dropdown to the top right