require('dotenv').config()
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = require('../schemas/userSchema')

//Generates auth token, every time when user sign in for new account.
userSchema.methods.getAuthToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id.toString(),
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '7 days',
    }
  )
  this.tokens = this.tokens.concat({
    token,
  })
  await this.save()
  return token
}

//Deleting sensitive data before sending to client.
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.tokens
  return userObject
}
//Find the user when they Login
userSchema.statics.findByCredential = async (email, password) => {
  try {
    const user = await Users.findOne({
      email,
    })
    if (!user) throw new Error('E-Mail Not Found!!!')
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) throw new Error('Unable To Login')

    return user
  } catch (error) {}
}

//Hashing The Password Before Saving
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password'))
    user.password = await bcryptjs.hash(user.password, 8)
  next()
})

//Generating Users collection to save in database
const Users = mongoose.model('Users', userSchema)
module.exports = Users
