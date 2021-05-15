const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Not Valid Email!!')
        }
      },
    },
    password: {
      required: true,
      type: String,
      trim: true,
      validate(value) {
        if (value.length < 8) {
          throw new Error('Password Must be greater Than 7 Characters')
        } else if (value.toLowerCase().includes('password')) {
          throw new Error("Password can't set be password")
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = userSchema
