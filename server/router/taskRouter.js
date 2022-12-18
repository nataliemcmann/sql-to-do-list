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
    ORDER BY "date" ASC;
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
    ("date", "freq", "task", "complete")
    VALUES
    ($1, $2, $3, $4); 
    ` //complete is assumed to be no upon task entry
    let task = req.body;
    let sqlValues = [task.date, task.freq, task.task, task.complete];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes)=> {
        res.sendStatus(201);
    })
    .catch((dbErr)=>{
        console.log('error in POST route');
        res.sendStatus(500);
    })
})

// PUT //



// DELETE //

//export router
module.exports = taskRouter;