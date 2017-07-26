const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');


// create express app
const app = express();

// dont know yet?
app.use(express.static(__dirname));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle routes
app.use('/',routes);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.notFound);

app.use(errorHandlers.productionErrors);

module.exports = app;






