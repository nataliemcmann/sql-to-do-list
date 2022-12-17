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

// PUT //

// DELETE //

//export router
module.exports = taskRouter;