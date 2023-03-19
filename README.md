# Busy Bee To-Do List

This bee-themed to-do list application can help you keep track of your busy schedule. 

## Technology
- PostgresSQL and Postico
- jQuery
- Express
- Node
- Body-Parser

## Installation
1. Make sure Postgres SQL and Postico are installed. Using Postico, create a database named `weekend-to-do-app`.
2. Run the queries from `database.sql` to set up the database in Postico.
3. Open the terminal or your text editor of choice or your computer terminal and run `npm install` to install all necessary dependencies. 
4. Then run `node server/server.js` in your terminal to start the server.
5. In your preferred internet browers, open a new tab and put `http://localhost:5000/` in the url.

## Usage

Upon opening the app, users can submit tasks by adding a due date for the task and a short description. Tasks will populate below, sorted by oldest to newest first. 

![usage](/documentation/addTask.gif)

In the task table, users can see when they need to complete the task, the task description, the completion status, an option to mark the task complete, when the task was completed, and an option to delete the task. 

When a task is completed, it is moved to the bottom of the list. 

![usage](/documentation/completeTask.gif)

## Technologies
-Javascript -CSS -HTML

## Acknowledgement
Thanks to Prime Digital Academy who equipped me with the skills to make this application a reality.

