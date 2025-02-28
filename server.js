// Dependencies
// This sets up the basic properties for our express server
const express = require('express');
// Tells node that we are creating an "express" server
const app = express();
// need path for filename paths
const path = require("path");
// need fs to read and write to files
const fs = require("fs");
// need uuid to generate unique id's for each saved note
const {
    v4: uuidv4
} = require('uuid');

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

// GET /notes should return the notes.html file.
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

// GET * should return the index.html file.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', function (req, res) {
    let noteData = fs.readFileSync("./db/db.json");
    noteData = JSON.parse(noteData);
    res.json(noteData)
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post("/api/notes", function (req, res) {
    try {
        let obj = req.body; //object
        let noteData = fs.readFileSync("./db/db.json");
        noteData = JSON.parse(noteData);
        obj.id = uuidv4();
        noteData.push(obj);
        console.log(noteData);

        fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
        res.redirect('back'); //redirects to the URL derived from the specified path,

    } catch (err) {
        console.log(err);
    }
});

// `DELETE /api/notes/:id` should receive a query parameter containing the id of a note to delete.
// In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.delete('/api/notes/:id', function (req, res) {
    let noteData = fs.readFileSync("./db/db.json");
    noteData = JSON.parse(noteData);
    const id = req.params.id;

   const index = noteData.findIndex(x => x.id === id);
   noteData.splice(index, 1);
   console.log(index);
   console.log(noteData);

   fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
   res.redirect('back');
})


// Start app on specified port
app.listen(PORT, function () {
    console.log("Listening on: " + PORT);
});