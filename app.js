const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 4000
const MathController = require('./math/math-controller')
const UserController = require('./users/users-controller')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

MathController(app)
UserController(app)

app.listen(port)