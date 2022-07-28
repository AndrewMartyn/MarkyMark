const express = require("express");
const database = require("../models/Database");
const ObjectId = require("mongodb").ObjectId;
let jwt = require("../createJWT");
const cors = require("cors");
const bodyParser = require("body-parser");

const noteRouter = express.Router();
noteRouter.use(cors());
noteRouter.use(bodyParser.json());

database.connect();

// user searches through their notes based on title and tags
noteRouter.get("/users/:userId/notes", async (req, res) => {
    const userId = req.params.userId;
    const { searchText, tags, accessToken } = req.query;

    // try {
    //     if (jwt.isExpired(accessToken)) {
    //         res.status(200).json({ error: "Token is no longer valid" });
    //         return;
    //     }
    // } catch (e) {
    //     console.log(e.message);
    // }

    let searchResults = [];
    let search = searchText.trim();
    let error = "";

    let query = {
        userId: { _id: userId },
        noteName: { $regex: search + ".*", $options: "i" },
    };
    if (tags.toString() !== "") query.noteTags = { $all: tags };

    try {
        const db = database.mongoDB;
        const results = await db.collection("Notes").find(query).toArray();

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
        error = "Server error: " + e.toString();
    }

    let refreshedToken = null;
    try {
        refreshedToken = jwt.refresh(accessToken);
    } catch (e) {
        console.log(e.message);
    }

    let ret = {
        results: searchResults,
        error: error,
        accessToken: refreshedToken,
    };
    res.status(200).json(ret);
});

// user deletes a note
noteRouter.delete("/users/:userId/notes", async (req, res) => {
    const userId = req.params.userId;
    const { accessToken } = req.query;

    let { noteIds } = req.body;
    if (noteIds == null) {
        console.log("No notes selected for delete");
        res.status(200).json({ error: "Empty noteIds" });
        return;
    }

    noteIds.forEach((element, index) => {
        noteIds[index] = new ObjectId(element);
    });

    // check for token first
    try {
        if (jwt.isExpired(accessToken)) {
            res.status(200).json({ error: "Token is no longer valid" });
            return;
        }
    } catch (e) {
        console.log(e.message);
    }

    let error;
    const deleteMe = { userId: { _id: userId }, _id: { $in: noteIds } };
    console.log(deleteMe);

    try {
        const db = database.mongoDB;
        await db.collection("Notes").deleteMany(deleteMe, (err, d) => {
            if (d.deletedCount >= 1) console.log("Note(s) deleted");
            else console.log("Note(s) could not be deleted");
        });
        error = "DELETE request sent";
    } catch (e) {
        error = "Server error: " + e.toString();
    }

    // refresh token before sending response
    let refreshedToken = null;
    try {
        refreshedToken = jwt.refresh(accessToken);
    } catch (e) {
        console.log(e.message);
    }

    res.status(200).json({ error: error, accessToken: refreshedToken });
});

// user creates a new note or saves updates to an old note
// if updating old note, query in path with noteId, else leave empty
noteRouter.put("/users/:userId/notes/", async (req, res) => {
    const userId = req.params.userId;
    let noteId = new ObjectId(req.query.noteId);

    // !!! New note should not have empty name !!!
    const { name, body, tags } = req.body;
    const { accessToken } = req.query;

    // check for token first
    // try {
    //     if (jwt.isExpired(accessToken)) {
    //         res.status(200).json({ error: "Token is no longer valid" });
    //         return;
    //     }
    // } catch (e) {
    //     console.log(e.message);
    // }

    let error = "";

    let edits = {};
    if (name != null) edits.noteName = name;
    if (body != null) edits.noteBody = body;
    if (tags != null) edits.noteTags = tags;

    try {
        const db = database.mongoDB;
        // if note with specified userId and noteId cannot be found within collection, upsert note
        await db.collection("Notes").updateOne(
            { userId: { _id: userId }, _id: noteId },
            {
                $setOnInsert: { dateCreated: new Date() },
                $set: edits,
                $currentDate: { dateLastModified: true },
            },
            { upsert: true },
            (err, d) => {
                if (d.matchedCount === 1) console.log("Note updated");
                else if (d.upsertedCount === 1) console.log("Note created");
                else console.log("Note could not be created/updated");
            }
        );
        error = "PUT request sent";
    } catch (e) {
        error = "Server error: " + e.toString();
    }

    // refresh token before sending response
    let refreshedToken = null;
    try {
        refreshedToken = jwt.refresh(accessToken);
    } catch (e) {
        console.log(e.message);
    }

    res.status(200).json({ error: error, accessToken: refreshedToken });
});

database.close();

module.exports = noteRouter;
