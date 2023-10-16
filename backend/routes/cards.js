const express = require("express");
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const {
  validateCardCreation,
  validateCardId,
} = require("../utils/validations");

const router = express.Router();

router.get("/", getAllCards);
router.post("/", validateCardCreation, createCard);
router.delete("/:cardId", validateCardId, deleteCard);
router.put("/likes/:cardId", validateCardId, likeCard);
router.delete("/likes/:cardId", validateCardId, dislikeCard);

module.exports = router;
