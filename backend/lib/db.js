const { Client } = require('pg');

process.env.DATABASE_URL = 'postgresql://postgres:12345@localhost:5432/postgres'

console.log(process.env.DATABASE_URL)
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

module.exports = client;