const express = require('express');
const path = require('path');
const app = express();
const publicDirectory = path.join(__dirname, './public');
/* console.log(__dirname);
console.log(publicDirectory); */
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
})