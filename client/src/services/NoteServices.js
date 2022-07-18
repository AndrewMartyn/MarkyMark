import axios from "axios";

export async function getAllNotes() {}

export async function createNote(name, userId, doc, tags) {
    let obj = {
        name: name,
        body: doc,
        tags: tags,
        jwtToken: localStorage.getItem("token_data"),
    };

    try {
        const response = await fetch("http://localhost:5001/api/users", {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" },
        });
        let res = JSON.parse(await response.text());

        console.log(res);
    } catch (e) {
        console.log(e.toString());
        return;
    }
}

export async function updateNote() {}

export async function deleteNote() {}

export async function getNoteByName() {}
