const express = require('express')
const auth = require('../../middleware/auth')
const Users = require('../../models/userCollection')

const router = new express.Router()

//signup User
router.post('/user/signup', async (req, res) => {
  const user = new Users(req.body)
  try {
    await user.save()
    const token = await user.getAuthToken()
    res.status(201).send({
      user,
      token,
    })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

//logging User
router.post('/user/login', async (req, res) => {
  try {
    const user = await Users.findByCredential(req.body.email, req.body.password)
    const token = await user.getAuthToken()

    res.send({
      user,
      token,
    })
  } catch (error) {
    res.status(404).send({
      error: 'User Not Found',
    })
  }
})

//logout User
router.post('/user/logout', auth, (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    )
    req.user.save()
    res.status(200).send({
      message: 'Logged Out!!',
    })
  } catch (error) {
    res.status(500).send({
      error: error.message,
    })
  }
})

//logout User From All Places
router.post('/user/logoutAll', auth, (req, res) => {
  try {
    req.user.tokens = []
    req.user.save()
    res.status(200).send({
      message: 'Logged Out From All Devices !!',
    })
  } catch (error) {
    res.status(500).send({
      error: error.message,
    })
  }
})
module.exports = router
