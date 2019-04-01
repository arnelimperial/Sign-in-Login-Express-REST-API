'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const timestamps = require('mongoose-timestamp');

//var joigoose = require('joigoose')(mongoose);

const UserSchema = new Schema({
   username: String,
   email: String,
   password: String,
   confirmationPassword: String
});
  


//var userSchema = new mongoose.Schema(joigoose.convert(joiSchema));
UserSchema.plugin(timestamps);
mongoose.model('User', UserSchema);
const User = mongoose.model('User', UserSchema);
module.exports = User;


module.exports.hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
    } catch(error) {
      throw new Error('Hashing failed', error)
    }
  }

// username: joi.string().required().trim().alphanum().min(3).max(10),
// email: joi.string().required().email().trim(),
// password: joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/)