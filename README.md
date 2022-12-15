# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

The task is to create a 'to do list' application. It should allow the user to create a task, then it should store the task, display the tasks to the DOM, and have an option to complete or delete the task. When the task is marked complete, there should be a visual indication and a stored indication in the server. 

How to acheive this? 

### Create a Database
Should be called `weekend-to-do-app` through Postico

### Database Structure
Should have a `database.sql` in the repo

### Create a server
Server should have a router which uses '/tasks' to GET, POST, PUT, and DELETE tasks according to user manipulating.
Will need to install pg, express, and body-parser

### Create client-side code to manage user interactions
Need client.js and jQuery
jQuery should manage the event delegation of rendering and buttons features 
jQuery should also make get, post, put, and delete requests to the server
Logic in the client.js should determine style classes of data


Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
