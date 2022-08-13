const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  checkingUserId,
  checkingUpdateUser,
  checkingUpdateAvatar,
} = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', checkingUserId, getUserById);
router.patch('/me', checkingUpdateUser, updateUser);
router.patch('/me/avatar', checkingUpdateAvatar, updateAvatar);

module.exports = router;
