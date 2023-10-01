'use strict'; // eslint-disable-line

require('dotenv').config();
const express = require('express');
const sessions = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const router = require('./Routers/router');

const { PORT, DATABASE_URI } = process.env;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'testSecret',
  resave: false,
  saveUninitalized: true
}));

app.use(router);

app.all('*', (req, res) => {
  console.log('Returning 404 from catch-all route');
  return res.sendStatus(404);
});

const start = async () => {
  await mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  app.listen(PORT, () => {
    console.log(`Server up on Port: ${PORT}`);
  });
}

start();

module.exports = app;