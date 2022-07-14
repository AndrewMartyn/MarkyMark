const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 5001;
const app = express();
app.set("port", process.env.PORT || 5001);

const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
const verificationRouter = require("./routes/verificationRouter");

app.use("/api", userRouter);
app.use("/api", noteRouter);
app.use("/api", verificationRouter);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
