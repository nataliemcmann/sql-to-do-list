//import pg library
//this is to coneect the database with the server. 
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
	database: 'weekend-to-do-app', //name of database
	host: 'localhost', //where the database is
	port: 5432, //this is the default port for postgres
	max: 10, //how many queries the database can handle at one time
	idleTimeoutMillis: 30000 //30 seconds to try to connect, else cancel connection
});

//turn pool on
pool.on('connect', () => {
	console.log('Postgresql connected');
});

//error message to return if any occur
pool.on('error', (error) => {
	console.log('Error with postgres pool', error)
});

//export pool
module.exports = pool;