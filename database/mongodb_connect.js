const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect()
    } catch (err) {
        console.error('mongodb connection error, ', err)
    }
}

module.exports = { connect }