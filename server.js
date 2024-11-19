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
    });
})

// GET Route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET Route for all notes
app.get('/api/notes', (req, res) => {
    res.json(db);
});

// POST Route for new notes
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    db.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
            console.error(err);
        } else {
            res.json(newNote);
        }
    });
});         

// DELETE Route for notes
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const noteIndex = db.findIndex(note => note.id === noteId);
    db.splice(noteIndex, 1);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
            console.error(err);
        } else {
            res.json(db);
        }
    });
});

// GET Route for all other pages
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
