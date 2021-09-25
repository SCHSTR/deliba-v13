require('dotenv').config();
const mongoose = require('mongoose');

const database_uri = process.env.DB_URI;

mongoose.connect(database_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }, error => {
        if (error) return console.log(error)
        console.log('Connected to datase')
    })

module.exports = mongoose