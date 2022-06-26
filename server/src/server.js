const express = require("express");
const app = express();

const userRouter = require('./routes/userRouter');
const notesRouter = require('./routes/notesRouter');

app.use('/api/users/', userRouter);
app.use('/api/notes/', notesRouter);

app.listen(5000, console.log("Server running on port 5000"));