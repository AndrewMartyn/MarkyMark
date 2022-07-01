const express = require("express");
const database = require("./models/Database");
let token = require('./createJWT');
const cors = require("cors");
const bodyParser = require("body-parser");

const notesRouter = express.Router();
notesRouter.use(cors());
notesRouter.use(bodyParser.json());

database.connect();

// user searches through their notes based on title and tags
notesRouter.get("/users/:userId/notes", async (req, res) => {
  const userId = req.params.userId;
  const { tags, searchText, jwtToken } = req.body;

  // check for token first
  try {
    if (token.isExpired(jwtToken)) {
      let r = {error: 'JWT no longer valid\n', jwtToken:''};
      res.status(200).json(r);
      return
    }
  }
  catch (e) {
    console.log(e.message);
  }

  let error;
  let searchResults = [];
  let search = searchText.trim();

  try {
    const db = database.mongoDB;
    const results = await db
      .collection("Notes")
      .find({
        UserID: userId,
        NoteTags: { $all: tags },
        NoteTitle: { $regex: search + ".", $options: "i" }, // trying to search case-insensitive
      })
      .toArray();

    if (results.length > 0) {
      for (let i = 0; i < results.length; i++)
        searchResults.push({
          noteId: results[i].NoteID,
          noteTitle: results[i].NoteTitle,
          noteBody: results[i].NoteBody,
          noteTags: results[i].NoteTags,
        });
      error = "Note(s) found";
    } else error = "No matches found";
  } catch (e) {
    error = "Server error:\n" + e.toString();
  }

  // refresh token before sending response
  let refreshedToken;
  try {
    refreshedToken = token.refresh(jwtToken);
  }
  catch (e) {
    console.log(e.message);
  }

  let ret = { results: searchResults, error: error, jwtToken: refreshedToken };
  res.status(200).json(ret);
});

// user deletes a note
notesRouter.delete("/users/:userId/notes/:noteId", async (req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;
  const jwtToken = req.body;

  // check for token first
  try {
    if (token.isExpired(jwtToken)) {
      let r = {error: 'JWT no longer valid\n', jwtToken:''};
      res.status(200).json(r);
      return
    }
  }
  catch (e) {
    console.log(e.message);
  }

  let error;
  const deleteMe = { UserID: userId, NoteId: noteId };

  try {
    const db = database.mongoDB;
    await db.collection("Notes").findOneAndDelete(deleteMe);
    error = "Note deleted";
  } catch (e) {
    error = "Server error:\n" + e.toString();
  }

  // refresh token before sending response
  let refreshedToken;
  try {
    refreshedToken = token.refresh(jwtToken);
  }
  catch (e) {
    console.log(e.message);
  }

  res.status(200).json({ error: error, jwtToken: refreshedToken });
});

// user creates a new note or saves updates to an old note
notesRouter.put("/users/:userId/notes/:noteId", async (req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;
  // !!! New note should not have empty title !!!
  const { title, body, tags, jwtToken } = req.body;

  // check for token first
  try {
    if (token.isExpired(jwtToken)) {
      let r = {error: 'JWT no longer valid\n', jwtToken:''};
      res.status(200).json(r);
      return
    }
  }
  catch (e) {
    console.log(e.message);
  }

  let error;

  let newNoteOnly = {UserID: userId, NoteID: noteId};
  let edits = {};
  if (title != null) edits.NoteTitle = title;
  if (body != null) edits.NoteBody = body;
  if (tags != null) edits.NoteTags = tags;

  try {
    const db = database.mongoDB;
    await db
      .collection("Notes")
      .findOneAndUpdate({ UserID: userId, NoteID: noteId }, { $setOnInsert: newNoteOnly, $set: edits }, { upsert: true });
    error = "Note updated";
  } catch (e) {
    error = "Server error:\n" + e.toString();
  }

  // refresh token before sending response
  let refreshedToken;
  try {
    refreshedToken = token.refresh(jwtToken);
  }
  catch (e) {
    console.log(e.message);
  }

  res.status(200).json({ error: error, jwtToken: refreshedToken });
});

database.close();

module.exports = notesRouter;

// // user creates a new note (DEPRECATED)
// notesRouter.post("/users/:userId/notes/:noteId", async (req, res) => {
//   const userId = req.params.userId;
//   const noteId = req.params.noteId;
//   const { noteTitle, noteBody, noteTags, jwtToken } = req.body;
//
//   // check for token first
//   try {
//     if (token.isExpired(jwtToken)) {
//       let r = {error: 'JWT no longer valid\n', jwtToken:''};
//       res.status(200).json(r);
//       return
//     }
//   }
//   catch (e) {
//     console.log(e.message);
//   }
//
//   let error;
//
//   let newNote = {
//     UserID: userId,
//     NoteID: noteId,
//     NoteTitle: noteTitle,
//     NoteBody: noteBody,
//     NoteTags: noteTags,
//   };
//
//   try {
//     const db = database.mongoDB;
//     await db.collection("Notes").insertOne(newNote);
//     error = "Note created";
//   } catch (e) {
//     error = "Server error:\n" + e.toString();
//   }
//
//   // refresh token before sending response
//   let refreshedToken;
//   try {
//     refreshedToken = token.refresh(jwtToken);
//   }
//   catch (e) {
//     console.log(e.message);
//   }
//
//   res.status(200).json({ error: error, jwtToken: refreshedToken });
// });