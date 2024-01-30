const express = require('express');

const app = express();

app.get("/index", (req, res) => {
    res.send("Welcome to your fashion");
})

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
})