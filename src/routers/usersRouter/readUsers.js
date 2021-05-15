const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()

// User Profile After Logging in
router.get('/user/me', auth, (req, res) => {
  res.status(200).send(req.user)
})

module.exports = router
