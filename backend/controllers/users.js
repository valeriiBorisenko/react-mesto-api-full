const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const MongoError = require('../errors/mongo-err');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const BadRequestError = require('../errors/badRequest-err');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ });

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find({ });
    const owner = await users.filter((user) => user.id === req.user._id);
    const ownerId = await owner.some((item) => item.id === req.user._id);
    if (ownerId) {
      res.status(200).send(...owner);
    } else {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).orFail(new Error('NotFoundError'));
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные пользователя'));
    } else if (err.message === 'NotFoundError') {
      next(new NotFoundError('Пользователь с указанным _id не найден'));
    }
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });

    res.status(200).send({ ...user._doc, password: undefined, __v: undefined});
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при создании пользователя'));
    } else if (err.name === 'MongoError' && err.code === 11000) {
      next(new MongoError('Пользователь с переданным email уже существует'));
    } else {
      next(err);
    }
  }
};

exports.updateProfileUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true }).orFail(new Error('CastError'));

    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
    } else if (err.message === 'CastError') {
      next(new NotFoundError('Пользователь с указанным _id не найден'));
    } else {
      next(err);
    }
  }
};

exports.updateAvatarUser = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const owner = req.user._id;
    const user = await User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true }).orFail(new Error('CastError'));

    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      throw new ValidationError('Переданы некорректные данные при обновлении аватара');
    } else if (err.name === 'CastError') {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    } else {
      next(err);
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').orFail(new Error('BadRequest'));
    const matched = await bcrypt.compare(password, user.password);
    if (matched) {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).send({ token, user });
    } else {
      throw new BadRequestError('Не правильный email или пароль');
    }
  } catch (err) {
    if (err.message === 'BadRequest') {
      next(new BadRequestError('Неправильные email или пароль'));
    } else {
      next(err);
    }
  }
};