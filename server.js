// Load module dependencies
const bodyParser = require('body-parser');
const express = require('express');
const taskController = require('./api/controllers/task.controller');
// Create express app
const app = express();
// Middlewares
// Serialize form data into JSON
app.use(bodyParser.json());
//Enable request cross-domain
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
 });
// Map router with controller
app.use('/api/tasks', taskController);
// App listen on given port
app.listen(process.env.PORT || 3000, () => console.log('Express CRUD API is running...'));
