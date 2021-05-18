const express = require('express');

const {
  getUsers, getUserById, updateProfileUser, updateAvatarUser, getUser,
} = require('../controllers/users');
const { joiUserId, joiProfileUser, joiAvatarUser } = require('../middlewares/joi');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getUser);
usersRoutes.patch('/me', express.json(), joiProfileUser, updateProfileUser);
usersRoutes.patch('/me/avatar', express.json(), joiAvatarUser, updateAvatarUser);
usersRoutes.get('/:userId', joiUserId, getUserById);

exports.usersRoutes = usersRoutes;
