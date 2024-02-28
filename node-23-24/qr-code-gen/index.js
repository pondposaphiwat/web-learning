import fs from "fs";
// var iq = require("inquirer")
// var qr = require("qr-image");
import inquirer from "inquirer";
import qr from "qr-image";
// var qr = require('qr-image');


// Prompt
inquirer
    .prompt([
        {
            message: "type in url",
            name: "URL"
        }
    ])
    .then((answers) => {
        const url = answers.URL;
        console.log(url);
        var qr_svg = qr.image(url, { type: 'png' });
        qr_svg.pipe(fs.createWriteStream('qr_image.png.png'));

        fs.writeFile("log.txt", url, (err) => {
            if (err) {
                console.log(err);
            }
        })
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        }
    });


// function make_qr {

// }
// // Make QR image
// qr.image()