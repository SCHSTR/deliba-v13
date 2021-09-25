const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commandSchema = new Schema({
    cmdName: {type: String, required: true},
    cmdDesc: {type: String, require: true},
    cmdID: {type: String, required: true}
})

module.exports = mongoose.model('commands_id', commandSchema)