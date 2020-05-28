
DEVELOPER ENVIRONMENT SETUP                                                                                                                                        for Project 101 


Step 1: Install Pre-requisite software

1)	Install the latest Java version in your local machine. (Java 11 recommended as of now)
2)	Ensure google chrome is available in the machine.
3)	Use this link to install react plugin on chrome
4)	Install git
5)	Install IntelliJ Idea or any of your preffered text editors.

Step 2: Setup the Repository

1)	Create a folder named 101 in local machine.
2)	Create a github account, if you do not have one already.
3)	Fork this repository to your github account
github.com/acntech/project-101/
4)	Clone the project-101 repository from your github to the 101 directory
-Open the terminal on the above directory and use the command below:
 git clone https://github.com/<your_github_user>/project-101.git      
5)	Open intelliJ, click “Open”, and select pom.xml file from the project-101/backend/ and create the maven project.   
6)	When the project is created and opened in intelliJ, change the branch to development (this branch contains the frontend part as well), which is missing from the default branch.
7)	Install maven plugin in intelliJ
8)	run Projet101Application.java
9)	Access the following link from Chrome 
localhost:8080/h2-console
 
10)	 Click test connection - If all fine, click Connect 

Step 3: 

1) Manually add one entry to Companies
Verify if the company is added from localhost:8080/companies
2) Install postman and try to add a company via postman

Step 4 : Setting up Front-end

1) Download and install Nodejs as administrator. 

ReactJs with Express Backend

2)	Navigate to frontend/api and do npm i to install the dependecncies.
3)	Download and install MongoDB : remember to update the path variable in your environment variables.
4)	Open a terminal on the same location and execute mongod --dbpath db\data 
5)	Open another terminal and execute nodemon server.js
	





