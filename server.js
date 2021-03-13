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

