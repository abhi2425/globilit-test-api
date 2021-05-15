require('dotenv').config()
require('./db/connection')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const createUsers = require('./routers/usersRouter/createUsers')
const readUsers = require('./routers/usersRouter/readUsers')
const updateUsers = require('./routers/usersRouter/updateUsers')

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use(createUsers)
app.use(readUsers)
app.use(updateUsers)

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('Server is up at ', port)
})
