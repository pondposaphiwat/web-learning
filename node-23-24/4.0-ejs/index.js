import express from "express";

const app = express();
const port = 3000;

const d = new Date();
let day = d.getDay();

let advice_day;

if (day == 0 | day == 6) {
    advice_day = "Hey! It's the weekend, it's time to have fun!";
} else {
    advice_day = "Hey! It's a weekday, it's time to work hard!";
};

// console.log(advice_day);

app.get('/', (req, res) => {
    // res.send(`<h1>${advice_day}</h1>`);
    res.render("index.ejs", {
        advice: advice_day
    });
});

app.listen(port, () => {
   console.log(`Server running on port ${port}`) 
});