const userRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateAvatar,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
