require('dotenv').config()

const express = require('express')
const app = express()

require('./configs/mongoose.config')
require('./configs/debugger.config')
require('./configs/middlewares.config')(app)
require('./configs/view-engine.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)


app.use('/api/auth', require('./routes/Auth.routes'))
app.use('/api/space', require('./routes/Space.routes'))
app.use('/api/event', require('./routes/Event.routes'))
app.use((req, res) =>{ res.sendFile(__dirname + "/public/index.html")})



module.exports = app