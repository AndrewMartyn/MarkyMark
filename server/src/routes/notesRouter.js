const express = require('express');
const database = require('./models/Database');
database.connect();

const notesRouter = express.Router();

notesRouter.get('/searchNote', async (req, res) => {
    const {userID, searchText} = req.body;

    let error = '';
    let searchResults = [];
    let search = searchText.trim();

    try {
        const db = database.mongoDB;
        const results = await db.collection('Notes').find({
            'UserID': userID,
            'NoteTitle': {$regex: search + './i', $options: 'r'} // trying to search case-insensitive
        }).toArray();

        for (let i = 0; i < results.length; i++)
            searchResults.push({noteID: results[i].NoteID, noteTitle:results[i].NoteTitle, noteText:results[i].NoteText, noteTags:results[i].NoteTags});
    }
    catch(e) {
        error = e.toString();
    }

    let ret = {results:searchResults, error:error};
    res.status(200).json(ret);
});

notesRouter.post('/createNote', async (req, res) => {

    res.send("notes");
});

notesRouter.post('/deleteNote', async (req, res) => {
    res.send("notes");
});

notesRouter.post('/saveNote', async (req, res) => {
    res.send("notes");
});

notesRouter.post('/tagNote', async (req, res) => {
    res.send("notes");
});

database.close();

module.exports = notesRouter;