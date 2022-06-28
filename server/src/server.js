const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRouter = require('./routes/userRouter');
const notesRouter = require('./routes/notesRouter');

app.use('/api/users', userRouter);
app.use('/api/notes', notesRouter);

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.listen(5000, function(err) {
    if (err) console.log(err);
    console.log("Server listening on port 5000");
});