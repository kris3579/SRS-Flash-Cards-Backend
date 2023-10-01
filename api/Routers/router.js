'use strict'; // eslint-disable-line

const express = require('express');

const authRoutes = require('./authRoutes');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('heard');
})

router.post('/addCards', async (req, res) => {

});

router.use(authRoutes);

module.exports = router;
