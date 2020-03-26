const express = require('express')
const server = express()
const mongoose = require('mongoose')

const dbURI = 'mongodb://localhost/TDD'
mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true})

server.use(express.json())

const todoRoutes = require('./routes/todo_routes')

server.use('/todos', todoRoutes)

module.exports = server