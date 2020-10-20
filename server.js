//////// dependencies
const { notStrictEqual } = require('assert');
var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
var PORT = 3000;

const notes = require("./Develop/db/db.json");
console.log(Array.isArray(notes));



//////// routes
// GET requests to the 2 given html files 
// GET reads db.json and returns saved notes as JSON
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});
// GET -  API route to get notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});


// POST request to API ROUTE, get user input on frontend, add to db.json, and append to frontend.
// JSON function returns as string
app.post('/api/notes', (req, res) => {
       var addNote = req.body; 
       notes.push(addNote);
       fs.writeFileSync(path.join(__dirname, './Develop/db/db.json'),JSON.stringify(notes))
});

//// listener
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
});

// DELETE - enter id of note to delete, delete note, write notes. 