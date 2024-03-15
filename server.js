const express = require('express');
const path = require('path');
const {Pool} = require('pg');
const cors = require('cors')
const app = express();
const port = 7000;
const hbs = require('hbs');
const crypto = require('crypto');
const nodemailer = require('nodemailer')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'Yasham1984',
  database: 'your-fashion-data'
});

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c16e97160a283c",
    pass: "b0744070dad435"
  }
});



const partialsDir = path.join(__dirname, 'views');


hbs.registerPartials(partialsDir);
//Server static files from 'public' directory and CSS from '0public/css'
app.use(express.json());
app.use(cors())
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');





app.use(express.static('./css'));

//Routes setup
app.use('/', require('./routes/pages'));

app.get('/', (req, res) => {
  res.send('Welcome to your fashion online shop');
});


function sha256Hash(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    const hashedString = hash.digest('hex');
    return hashedString;
}

function generateRandomSixDigitNumber() {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return randomNumber;
  }
  

//query for men-products
app.get('/men-products', async (req, res) => {
    try{
        const client = await pool.connect();
        const { rows } = await client.query("SELECT * FROM products WHERE category = 'men'");
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

app.get('/men-shoes-products', async (req, res) => {
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

app.get('/women-shoes-products', async (req, res) => {
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

app.get('/kids-shoes-products', async (req, res) => {
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

app.post('/shopping-cart', async (req, res) => {
    try{
        const client = await pool.connect();
        const { body:{ userId, productId } } = req;
        await client.query(`INSERT INTO shopping_cart (user_id, product_id) VALUES (${userId}, ${productId});`);
        res.sendStatus(201);
        client.release();
    }catch(err){
        res.status(500).send('Server error');
        console.error('Error exucting query', err.stack);
    }
  }); 


  app.get('/users/:userId/shoppingCart', async (req, res) => {
    try{
        const client = await pool.connect();
        const { rows } = await client.query(`SELECT * FROM shopping_cart WHERE user_id = ${req.params.userId}`);
        res.json(rows);
        client.release();
    }catch(err){
        res.status(500).send('Server error');
        console.error('Error exucting query', err.stack);
    }
  }); 


app.post('/register', async (req, res) => {
    try{
        const client = await pool.connect();

        let { body:{ email, username, password } } = req;
        username = username || email.split('@')[0]
        const code = generateRandomSixDigitNumber()
        await client.query(`INSERT INTO users (email, username, password, code) VALUES ('${email}', '${username}', '${sha256Hash(password)}', '${code}');`);
        await transporter.sendMail({
            from: '<fashion-store@style.com>',
            to: email,
            subject: "Confirm your account", 
            html: `
            <p>
                Click the following link and input this code: <strong>${code}</strong> to
                activate your account.
            </p>
            <p>
                <a href="http://localhost:7000/activate-account"> Activation link </a> 
            </p>
            `, 
          });
        res.sendStatus(201);
        client.release();
    }catch(err){
        res.status(500).send('Server error');
        console.error('Error exucting query', err.stack);
    }
  }); 


  app.post('/activate-account', async (req, res) => {
    try{
        const client = await pool.connect();
        const { body:{ email, code } } = req;
        await client.query(`UPDATE users set is_active = true WHERE "users"."email" = '${email}' AND 
            "users"."code" = ${code}
        `);
        res.sendStatus(201);
        client.release();
    }catch(err){
        res.status(500).send('Server error');
        console.error('Error exucting query', err.stack);
    }
  }); 


  app.post('/login', async (req, res) => {
    try{
        const client = await pool.connect();
        const { body:{ email, password } } = req;
        const { rows } = await client.query(`SELECT * from users WHERE "users"."password" = '${sha256Hash(password)}'
        AND "users"."is_active" = true AND "users"."email" = '${email}'`);
        if (rows.length) {
            res.json(rows[0]);
            client.release();
            return
        }

        throw new Error()
       
      
    }catch(err){
        res.status(500).send('Server error');
        console.error('Could not login user', err.stack);
    }
  }); 



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});



