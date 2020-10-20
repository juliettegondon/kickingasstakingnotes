//////// dependencies & variables
const { notStrictEqual } = require("assert");
var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();

//changed port for heroku
var PORT =  process.env.PORT || 3000;

const notes = require("./Develop/db/db.json");
console.log(Array.isArray(notes));

//middleware makes data available before it hits route
//setup to handle URL encodings and json that goes between function calls
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));


//////// routes

// GET requests to the 2 given html files & API
// GET reads db.json and returns saved notes as JSON
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});
// GET -  API route to get notes /// ASK TA ABOUT THIS FUNCTION TO READ & RETURN NOTES AS JSON
app.get("/api/notes", (req, res) => {
    res.json(notes);
});


// POST request to API ROUTE,get user input on frontend, add to db.json, and append to frontend.
// JSON function returns as string
app.post("/api/notes", (req, res) => {
       var addNote = req.body; 
       console.log(addNote);
       notes.push(addNote);
       fs.writeFileSync(path.join(__dirname, './Develop/db/db.json'),JSON.stringify(notes))
});

//// listener
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
});

// DELETE - enter id of note to delete, delete note, write notes. 