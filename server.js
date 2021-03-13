// Dependencies
// This sets up the basic properties for our express server
const express = require('express');
// Tells node that we are creating an "express" server
const app = express();
// need path for filename paths
const path = require("path");
// need fs to read and write to files
const fs = require("fs");

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

// GET /notes should return the notes.html file.
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname + '/notes.html'));
  });

// GET * should return the index.html file.
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", function(err, res){
    try{
        let noteData = fs.readFileSync("db\db.json");
        noteData = JSON.parse(noteData);
    } catch (err) {
        console.log(err);
    }
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post("/api/notes", function(err, res){

});












// Start app on specified port
app.listen(PORT, function() {
    console.log("Listening on: " + PORT);
});