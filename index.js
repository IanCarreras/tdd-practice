const express = require('express')
const server = express()

const router = require('./routes/index')

server.use('/', router)

server.listen(3000, () => {
    console.log('listening on 3000')
})