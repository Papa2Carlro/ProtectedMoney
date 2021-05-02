const mongoose = require('mongoose')

const ScriptSchema = new mongoose.Schema({
    name: String,
    script: String,
    style: {
        type: String,
        default: undefined
    },
    lastDay: Object
})

module.exports = mongoose.model('Scripts', ScriptSchema)