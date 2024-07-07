const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword === this.password;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
