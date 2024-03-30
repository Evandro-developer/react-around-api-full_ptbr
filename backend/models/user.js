const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { emailRegex, urlRegex } = require('../utils/validations');

const defaultValues = {
  name: 'Jacques Cousteau',
  about: 'Sailor, researcher',
  avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: defaultValues.name,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: defaultValues.about,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: defaultValues.avatar,
    required: true,
    trim: true,
    lowercase: true,
    validate: [
      {
        validator: (value) => urlRegex.test(value) || validator.isURL(value),
        message: 'Invalid avatar URL',
      },
    ],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: [
      {
        validator: (value) => emailRegex.test(value) || validator.isEmail(value),
        message: 'Invalid email address',
      },
    ],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError();
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError();
        }
        return user;
      });
    });
};

module.exports = mongoose.model('User', userSchema);
