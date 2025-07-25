require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(require('cors')({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  headers: ['Content-Type'],
  credentials: true
}));
app.use(express.json());

const connectToDB = require('./db.js');
app.use(connectToDB);
const ListItem = require('./models/listItem');

app.get('/', async (req, res) => {
  const list = await ListItem.find();
  console.log('GET deez nuts');
  res.status(200).send({ list: list });
});

app.post('/', async (req, res) => {
  console.log('ts pmo before send');
  const newItem = new ListItem({ text: req.body.text });
  const saved = await newItem.save();
  res.status(201).send({ saved: saved });

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
