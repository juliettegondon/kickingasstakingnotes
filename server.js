//////// dependencies & variables
var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();

//changed port for heroku
var PORT =  process.env.PORT || 8000;

const notes = require("./db/db.json");
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
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// GET -  API route to get notes // READ & LATER RETURN NOTES AS JSON
app.get("/api/notes", (req, res) => {
    res.json(notes);
});


// POST request to API ROUTE,get user input on frontend, add to db.json, and append to frontend.
// JSON function returns as string
app.post("/api/notes", (req, res) => {
       var newNote = req.body;
       newNote.id = Date.now(); 
       notes.push(newNote);
       fs.writeFileSync(path.join(__dirname, './db/db.json'),JSON.stringify(notes))
        res.json(newNote.id)
        console.log(newNote.id);
    });
//DELETE REQUEST 
app.delete("/api/notes/:id", (req, res) => {
    console.log(req.params.id);
    var id = req.params.id
    var deletedID = id;
    var newNotesArray = notes.filter(newValue => {
        return newValue.id !== id
    }) 
    // iterating over the array & generating ID for deleted note
        for (newValue of newNotesArray) {
            newValue.id = deletedID.toString();
            deletedID++;
        }
     fs.writeFileSync(path.join(__dirname, './db/db.json'),JSON.stringify(newNotesArray))
    console.log(newNotesArray);
    res.json(newNotesArray);
})

//// listener
app.listen(PORT, () => {
    console.log(`listening at ${PORT}`)
});

