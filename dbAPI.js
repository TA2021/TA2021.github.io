/* var http = require('http');
var url = require('url');
var fs = require('fs');
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if(err){
        res.writeHead(404, {'Content-type': 'text/html'});
        return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080); */

const {Pool} = require('pg');
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'Yasham1984',
  database: 'your-fashion-data'
});

//pool.connect();

/* pool.query('select * from Users', (err, res) => {
  if(!err){
    console.log(res.rows);
    console.log('connected');
  }else{
    console.log(err.message);
  }
  client.end;
}); */

const readImage = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
};

const insertProduct = async (productID, product_name, description, price, stock_level, imagePath, tag) => {
  try{
    const client = await pool.connect();
    const image = await readImage(imagePath);
    const query = 'INSERT INTO Products (productID, product_name, description, price, stock_level, image, tag) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [productID, product_name, description, price, stock_level, image, tag];
    await client.query(query, values);
    console.log('Product inserted successfully.');
    client.release();
  }catch(err){
    console.log(err.message);
  }
};

insertProduct(1, 'Blue Shirt', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..', 
29.99, 10, 'images/BlueShirt.jpg', 'BlueShirt');

