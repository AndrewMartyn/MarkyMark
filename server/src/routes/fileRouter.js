const express = require("express");
const database = require("./models/Database");
let token = require('./createJWT');
const cors = require("cors");
const bodyParser = require("body-parser");

const fileRouter = express.Router();
fileRouter.use(cors());
fileRouter.use(bodyParser.json());

database.connect();

// user searches through their notes based on title and tags
fileRouter.get("/users/:userId/files", async (req, res) => {
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
      .collection("Files")
      .find({
        userId: userId,
        fileTags: { $all: tags },
        fileName: { $regex: search + ".", $options: "i" }, // trying to search case-insensitive
      })
      .toArray();

    if (results.length > 0) {
      for (let i = 0; i < results.length; i++)
        searchResults.push({
          fileId: results[i]._id,
          fileName: results[i].fileName,
          fileBody: results[i].fileBody,
          fileTags: results[i].fileTags,
        });
      error = "File(s) found";
    } else error = "No files found";
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
fileRouter.delete("/users/:userId/files/:fileId", async (req, res) => {
  const userId = req.params.userId;
  const fileId = req.params.fileId;
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
  const deleteMe = { userId: userId, _id: fileId };

  try {
    const db = database.mongoDB;
    await db.collection("Files").findOneAndDelete(deleteMe);
    error = "File deleted";
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
// if new file, default fileId to -1 or some invalid value
fileRouter.put("/users/:userId/files/:fileId", async (req, res) => {
  const userId = req.params.userId;
  const fileId = req.params.fileId;
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

  let newFileOnly = {userId: userId};
  let edits = {};
  if (name != null) edits.fileName = name;
  if (body != null) edits.fileBody = body;
  if (tags != null) edits.fileTags = tags;

  try {
    const db = database.mongoDB;
    // if file with specified userId and fileId cannot be found within collection, upsert file
    await db
      .collection("Files")
      .findOneAndUpdate({ userId: userId, _id: fileId }, { $setOnInsert: newFileOnly, $set: edits }, { upsert: true });
    error = "File updated";
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

module.exports = fileRouter;

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
