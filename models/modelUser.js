const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Имя пользователя
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    // match: /^[A-Z]\w+$/i,
  },
  // Мы не храним пароль, а только его хэш
  pass: {
    type: String,
    required: true,
    minlength: 2,
  },
  // Email
  email: {
    type: String,
    required: true,
    minlength: 3,
    // match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
});

module.exports = mongoose.model('User', UserSchema);
