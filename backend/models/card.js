const mongoose = require('mongoose');

const avatarRegex = /^(https?:\/\/)?(www\.)?[\w\d.-]+(:\d+)?(\/[\w\d._~:/?%#[\]@!$&'()*+,;=-]*)?(#\w*)?$/i;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return avatarRegex.test(value);
      },
      message: 'URL de imagem inválida',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
