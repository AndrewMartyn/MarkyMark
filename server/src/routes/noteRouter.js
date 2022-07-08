const express = require("express");
const database = require("./models/Database");
let token = require('./createJWT');
const cors = require("cors");
const bodyParser = require("body-parser");

const noteRouter = express.Router();
noteRouter.use(cors());
noteRouter.use(bodyParser.json());

database.connect();

// user searches through their notes based on title and tags
noteRouter.get("/users/:userId/notes", async (req, res) => {
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
        userId: { _id: userId },
        noteTags: { $all: tags },
        noteName: { $regex: search + ".", $options: "i" }, // trying to search case-insensitive
      })
      .toArray();

    if (results.length > 0) {
      for (let i = 0; i < results.length; i++)
        searchResults.push({
          noteId: results[i]._id,
          noteName: results[i].noteName,
          noteBody: results[i].noteBody,
          noteTags: results[i].noteTags,
        });
      error = "Note(s) found";
    } else error = "No notes found";
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
noteRouter.delete("/users/:userId/notes/:noteId", async (req, res) => {
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
  const deleteMe = { userId: { _id: userId }, _id: noteId };

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
// if new note, default fileId to -1 or some invalid value
noteRouter.put("/users/:userId/notes/:noteId", async (req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;
  // !!! New note should not have empty title !!!
  const { name, body, tags, jwtToken } = req.body;

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

  let newNoteOnly = {userId: { _id: userId }, dateCreated: ''};
  let edits = {dateLastModified: ''};
  if (name != null) edits.noteName = name;
  if (body != null) edits.noteBody = body;
  if (tags != null) edits.noteTags = tags;

  try {
    const db = database.mongoDB;
    // if note with specified userId and noteId cannot be found within collection, upsert note
    await db
      .collection("Notes")
      .findOneAndUpdate({ userId: { _id: userId }, _id: noteId }, { $setOnInsert: newNoteOnly, $set: edits }, { upsert: true });
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

module.exports = noteRouter;

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
