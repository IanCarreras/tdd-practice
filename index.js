const express = require('express')
const server = express()
const mongoose = require('mongoose')

const dbURI = 'mongodb://localhost/TDD'
mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true})

server.use(express.json())

const todoRoutes = require('./routes/todo_routes')

server.use('/todos', todoRoutes)

server.use((error, req, res, next) => {
    res.status(500).json({ message: error.message })
})
module.exports = server