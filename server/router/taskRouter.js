const { Router, application } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const taskRouter = express.Router();

//make routes for '/tasks' in here

// GET //
taskRouter.get('/', (req,res)=> {
    console.log('in GET route');
    let sqlQuery = `
    SELECT * FROM "tasks"
    ORDER BY "complete" ASC, "date" ASC;
    `;
    pool.query(sqlQuery)
    .then((dbRes) => {
        res.send(dbRes.rows);
    })
    .catch((dbErr) => {
        console.log('GET route not working', dbErr);
        res.sendStatus(500);
    })
})


// POST //
taskRouter.post('/', (req,res) => {
    console.log('in POST route');
    let sqlQuery = `
    INSERT INTO "tasks"
    ("date", "task", "complete")
    VALUES
    ($1, $2, $3); 
    ` //complete is assumed to be no upon task entry
    let task = req.body;
    let sqlValues = [task.date, task.task, task.complete];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes)=> {
        res.sendStatus(201);
    })
    .catch((dbErr)=>{
        console.log('error in POST route', dbErr);
        res.sendStatus(500);
    })
})

// PUT //
taskRouter.put('/:id', (req,res) => {
    console.log('in PUT route', req.body);
    let completeDate = req.body.date_completed;
    let idToUpdate = req.params.id;
    let sqlQuery = `
    UPDATE "tasks"
    SET "complete" = 'Y', "date_completed" = $1
    WHERE "id" = $2;
    `;
    let sqlValues = [completeDate, idToUpdate];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((dbErr) => {
        console.log('error in PUT route', dbErr);
        res.sendStatus(500);
    })
})


// DELETE //
taskRouter.delete('/:id', (req,res) => {
    console.log('in DELETE route');
    let idToDelete = req.params.id;
    let sqlQuery = `
    DELETE FROM "tasks"
    WHERE "id" = $1;
    `
    let sqlValues = [idToDelete];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((dbErr) => {
        console.log('error in DELETE route', dbErr);
        res.sendStatus(500);
    })
})

//export router
module.exports = taskRouter;