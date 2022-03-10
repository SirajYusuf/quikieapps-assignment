const express = require('express')
require('./db/mongodb')
const userRouter = require('./routes/userRouter')

const app = express()

app.use(express.json())
app.use(userRouter)

module.exports = app