var express = require("express");
var app = express();
var PORT = 3000;

const db = require("./db/db.json");
console.log(Array.isArray(db));

// set variables for express and PORT

// create API routes 
// GET - reads db.json and returns saved notes as JSON

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})
// POST - get user input on frontend, add to db.json, and append to frontend.
// DELETE - enter id of note to delete, delete note, write notes. 