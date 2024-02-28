import express from "express";
const app = express();
const port = 3000;

// get request supported at root
app.get("/", (req, res) => {
    // console.log(req)
    res.send("<h1>Hello</h1>");
})

// get request supported at /about
app.get("/about", (req, res) => {
    console.log(req)
    res.send("<h1>About me</h1>");
})

// get request supported at /about
app.get("/contact", (req, res) => {
    console.log(req)
    res.send("<h1>contact me</h1>");
})

// If server is started at port, callback
app.listen(port, () => {
    console.log("Server running on port " + port);
})