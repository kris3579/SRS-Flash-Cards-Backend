'use strict'; // eslint-disable-line

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  cardList: { type: 'Object', required: true },
});

userSchema.pre('save', async function preSave() {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePasswords = async function comparePasswords(givenPassword) {
  return bcrypt.compare(givenPassword, this.password);
};

userSchema.methods.generateToken = function generateToken() {
  return jwt.sign(
    { data: { _id: this._id } },
    process.env.SECRET,
  );
};

userSchema.statics.verifyToken = function verifyToken(token) {
  const parsedToken = jwt.verify(token, process.env.SECRET);
  return this.findOne({ _id: parsedToken.data._id });
};

module.exports = mongoose.model('user', userSchema);
