const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  checkingCreateCard,
  checkingCardId,
} = require('../middlewares/validations');

router.get('/', getCards);
router.post('/', checkingCreateCard, createCard);
router.delete('/:cardId', checkingCardId, deleteCard);
router.put('/:cardId/likes', checkingCardId, likeCard);
router.delete('/:cardId/likes', checkingCardId, dislikeCard);

module.exports = router;
