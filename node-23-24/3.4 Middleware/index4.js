import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let name;

app.use(bodyParser.urlencoded({extended:true}));

function generateBandName(req, res, next) {
  console.log(req.body);
  name = req.body["pet"] + req.body["street"];
  console.log("here" + name);
  next();
};

app.use(generateBandName);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
});

app.post('/submit', (req, res) => {
  // generateBandName(req, res)
  res.send(`<p>${name}</p>`)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
