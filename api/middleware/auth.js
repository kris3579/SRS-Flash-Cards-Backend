'use strict'; // eslint-disable-line

const UserSchema = require('../models/user/userSchema');
const Model = require('../models/model');

const UserModel = new Model(UserSchema);

const base64Decoder = (encodedString) => {
  const data = {
    username: '',
    password: '',
  };

  const decodedString = Buffer.from(encodedString, 'base64').toString();
  const info = decodedString.split(':');

  [data.username, data.password] = info;
  return data;
};

const getUserFromCredetials = async (userData) => {
  const possibleUsers = await UserModel.findByQuery({
    username: userData.username,
  });
  
  if (possibleUsers.length === 0) {
    return 'User Not Found';
  }
  const validatedUser = await possibleUsers[0].comparePasswords(userData.password);
  if (validatedUser) {
    return possibleUsers[0];
  }

  return 'Password Incorrect';
};

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new Error('Invalid Login');
  }

  const authPieces = req.headers.authorization.split(' ');
  if (authPieces.length === 2) {
    if (authPieces[0] === 'Basic') {
      try {
        const userData = base64Decoder(authPieces[1]);
        req.user = await getUserFromCredetials(userData);

        next();
      } catch (error) {
        throw new Error(error);
      }
    } else if (authPieces[0] === 'Bearer') {
      try {
        req.user = await UserSchema.verifyToken(authPieces[1]);

        next();
      } catch (error) {
        throw new Error('Bearer auth failed');
      }
    }
  }
};

module.exports = auth;
