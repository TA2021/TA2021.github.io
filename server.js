const express = require('express');
const path = require('path');
const {Pool} = require('pg');
const app = express();
const port = 7000;

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'Yasham1984',
  database: 'your-fashion-data'
});



//Server static files from 'public' directory and CSS from '0public/css'
app.use(express.json());
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');



app.use(express.static('./css'));

//Routes setup
app.use('/', require('./routes/pages'));
app.use('/products', require('./routes/productsRouteFile'));

app.get('/', (req, res) => {
  res.send('Welcome to your fashion online shop');
});

//query for men-products
app.get('/men-products', async (req, res) => {
    try{
        const client = await pool.connect();
        const { rows } = await client.query("SELECT * FROM products WHERE category = 'men' LIMIT 6");
        res.json(rows);
        client.release();
    }catch(err){
        res.status(500).send('Server error');
        console.error(err);
    }
});
//query for women-products
app.get('/women-products', async (req, res) => {
  try{
      const client = await pool.connect();
      const { rows } = await client.query("SELECT * FROM products WHERE category = 'women'");
      res.json(rows);
      client.release();
  }catch(err){
      res.status(500).send('Server error');
      console.error('Error exucting query', err.stack);
  }
});

app.get('/kids-products', async (req, res) => {
  try{
      const client = await pool.connect();
      const { rows } = await client.query("SELECT * FROM products WHERE category = 'kids'");
      res.json(rows);
      client.release();
  }catch(err){
      res.status(500).send('Server error');
      console.error('Error exucting query', err.stack);
  }
});

app.get('/men-s-products', async (req, res) => {
  try{
      const client = await pool.connect();
      const { rows } = await client.query("SELECT * FROM products WHERE category = 'M-shoes'");
      res.json(rows);
      client.release();
  }catch(err){
      res.status(500).send('Server error');
      console.error('Error exucting query', err.stack);
  }
});

app.get('/women-s-products', async (req, res) => {
  try{
      const client = await pool.connect();
      const { rows } = await client.query("SELECT * FROM products WHERE category = 'W-shoes'");
      res.json(rows);
      client.release();
  }catch(err){
      res.status(500).send('Server error');
      console.error('Error exucting query', err.stack);
  }
});

 app.get('/kids-s-products', async (req, res) => {
  try{
      const client = await pool.connect();
      const { rows } = await client.query("SELECT * FROM products WHERE category = 'K-shoes'");
      res.json(rows);
      client.release();
  }catch(err){
      res.status(500).send('Server error');
      console.error('Error exucting query', err.stack);
  }
}); 

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});



