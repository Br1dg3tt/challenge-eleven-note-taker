// Imports the required modules and functions
const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

//Adds the middleware to parse the incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => {
    fs.readFile(.db/db.json, "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    }
