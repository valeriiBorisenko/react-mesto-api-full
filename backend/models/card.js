const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /(http||https):\/\/(www\.)?[\w\S]*#?\./.test(url);
      },
      message: 'Ссылка не подходит',
    },
  },
  owner: {
    type: String,
    required: true,
  },
  likes: [String]
  ,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
