import express, { request } from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.get("/", function(req, res){
    // res.send("<h1>Hello</h1>")
    res.sendFile(__dirname + "/index.html") 
})

// Listen in on Port 3000 for any http requests
app.listen(3000, function(){
    console.log("Server started on port 3000")
});