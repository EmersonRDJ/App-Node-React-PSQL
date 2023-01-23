// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('../lib/db');

// Connect to the DB (Do not remove)
client.connect()

// Routes Imports
const table = require('./routes/table')

// Express App
const app = express();

// console.log(process.env.DATABASE_URL)

// Middleware
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/table', table);

// Error handling route
app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;

    console.log(err)

    res.status(statusCode).json(err)
})

module.exports = app;