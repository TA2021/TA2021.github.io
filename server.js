const express = require('express');
const path = require('path');
const app = express();
const publicDirectory = path.join(__dirname, './public');

/* console.log(__dirname);
console.log(publicDirectory); */
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));
app.use('/products', require('./routes/productsRouteFile'));

/* app.use('http://localhost:5000/products'); */

/* const productList = require('./products');

// Route to get products
app.get('/products', (req, res) => {
    // Send the products as JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(productList);
  }); */

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
