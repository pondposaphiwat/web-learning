//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
// import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let correctPassword = false;

app.use(bodyParser.urlencoded({extended:true}))
app.use((req, res, next) => {
    const password = req.body["password"];
    if (password == 'ILoveProgramming') {
        // res.sendFile(__dirname + '/public/secret.html');
        correctPassword = true;
    } else {
        correctPassword = false;
        console.log(`Wrong password`);
    }
    next();
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post("/check", (req, res) => {
    if (correctPassword) {
        res.sendFile(__dirname + '/public/secret.html');
    } else {
        res.sendFile(__dirname + '/public/index.html')
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });