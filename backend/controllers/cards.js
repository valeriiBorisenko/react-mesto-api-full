const Card = require('../models/card');
const ValidationError = require('../errors/validation-err');
const NotValidIdError = require('../errors/not-validId-err');
const NotFoundError = require('../errors/not-found-err');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    next(err);
  }
};

exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    res.send(
      await Card.create({ name, link, owner }),
    );
    await Card.populate(['owner', 'likes']);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при создании карточки'));
    } else {
      next(err);
    }
  }
};

exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(new Error('NotFoundError'));
    if (card.owner === req.user._id) {
      res.send(await card.delete());
    } else {
      throw new NotValidIdError('Нет прав к удалению карточки');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные для удаления карточки'));
    } else if (err.message === 'NotFoundError') {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
    } else {
      next(err);
    }
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true }).orFail(new Error('NotFoundError'));

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные для постановки лайка'));
    } else if (err.message === 'NotFoundError') {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
    } else {
      next(err);
    }
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true }).orFail(new Error('NotFoundError'));

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные для снятия лайка'));
    } else if (err.message === 'NotFoundError') {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
    } else {
      next(err);
    }
  }
};
