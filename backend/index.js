const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('./lib/db')

console.log(process.env.DATABASE_URL)

const table = require('./routes/table')

const app = express();

const port = 8088;

// Start connection to DB
client.connect();

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

// Start server
app.listen(port, (req, res) => console.log(`listening on port ${port}`))