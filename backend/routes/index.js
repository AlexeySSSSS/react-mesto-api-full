const router = require('express').Router();
const NotFound = require('../errors/NotFound');

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res, next) => {
  next(new NotFound('Сервер не найден'));
});

module.exports = router;
