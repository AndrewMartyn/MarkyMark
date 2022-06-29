const express = require("express");
const app = express();

const userRouter = require('./routes/userRouter');
const notesRouter = require('./routes/notesRouter');

app.use('/api', userRouter);
app.use('/api', notesRouter);

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