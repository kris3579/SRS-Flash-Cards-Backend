const express = require('express'); // eslint-disable-line
const superagent = require('superagent');

const auth = require('../middleware/auth');
const getMAL = require('../getMAL');

const animeSchema = require('../models/anime/animeSchema');
const userSchema = require('../models/user/userSchema');
const UserModel = require('../models/user/userModel');

const userModel = new UserModel(userSchema);

const authRoutes =  express.Router();

authRoutes.post('/signup', async (req, res) => {
  const user = await userModel.create(req.body);
  
  const token = user.generateToken();

  res.status(200);
  res.send({ user, token });
});

authRoutes.post('/login', auth, async (req, res) => {
  if (req.user === 'User Not Found') {
    res.send('User Not Found');
    return;
  }
  if (req.user === 'Password Incorrect') {
    res.send('Password Incorrect');
    return;
  }

  const token = req.user.generateToken();

  res.status(200);
  res.send({ user: req.user, token });
});

module.exports = authRoutes;