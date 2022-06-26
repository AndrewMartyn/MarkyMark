const express = require('express');

const notesRouter = express.Router();

notesRouter.get('/', (req, res) => {
    res.send("notes");
});


module.exports = notesRouter;