const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url) {
        return /(http||https):\/\/(www\.)?[\w\S]*#?\./.test(url);
      },
      message: 'Ссылка не подходит',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Необходимо указать почту'],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неправильно указана почта',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходимо указать пароль'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
