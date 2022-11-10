const userRouter = require('express').Router();
const {
  userIdValid,
  updateUserValid,
  updateAvatarValid,
} = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  updateAvatar,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', userIdValid, getUserById);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUserValid, updateUser);
userRouter.patch('/me/avatar', updateAvatarValid, updateAvatar);

module.exports = userRouter;
