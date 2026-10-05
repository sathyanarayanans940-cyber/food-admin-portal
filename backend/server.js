const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); 

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS RESTAURANT (
    restaurant_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    rating REAL,
    admin_id INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS FOOD_ITEM (
    food_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL,
    category TEXT,
    restaurant_id INTEGER,
    FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT(restaurant_id)
  )`);
});

app.get('/api/restaurants', (req, res) => {

  db.all('SELECT * FROM RESTAURANT', [], (err, rows) => {
    if (err) return res.status(500).send("Server Error");
    res.json(rows);
  });
});

app.post('/api/restaurants', (req, res) => {
  const { id, name, location, rating, adminId } = req.body;

  db.run(
    'INSERT INTO RESTAURANT (restaurant_id, name, location, rating, admin_id) VALUES (?, ?, ?, ?, ?)',
    [id, name, location, rating, adminId],
    function(err) {
      if (err) return res.status(500).send("Server Error");
      res.json({ message: "Restaurant added successfully!" });
    }
  );
});

app.get('/api/food', (req, res) => {
  db.all('SELECT * FROM FOOD_ITEM', [], (err, rows) => {
    if (err) return res.status(500).send("Server Error");
    res.json(rows);
  });
});

app.post('/api/food', (req, res) => {
  const { id, name, price, category, restaurantId } = req.body;
  db.run(
    'INSERT INTO FOOD_ITEM (food_id, name, price, category, restaurant_id) VALUES (?, ?, ?, ?, ?)',
    [id, name, price, category, restaurantId],
    function(err) {
      if (err) return res.status(500).send("Server Error");
      res.json({ message: "Food item added successfully!" });
    }
  );
});

app.listen(5001, () => {
  console.log('Backend API running on http://localhost:5001');
});