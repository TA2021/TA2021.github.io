const express = require('express');
const path = require('path');
const app = express();
const publicDirectory = path.join(__dirname, './public');
/* console.log(__dirname);
console.log(publicDirectory); */
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    res.render('index');
})

app.get("/men", (req, res) => {
    res.render('men');
})

app.get("/women", (req, res) => {
    res.render('women');
})

app.get("/kids", (req, res) => {
    res.render('kids');
})

app.get("/men-shoes", (req, res) => {
    res.render('men-shoes');
})

app.get("/women-shoes", (req, res) => {
    res.render('women-shoes');
})

app.get("/kids-shoes", (req, res) => {
    res.render('kids-shoes');
})

app.get("/cart", (req, res) => {
    res.render('cart');
})
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
})