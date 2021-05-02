const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

// connect to DB
module.exports = function connectDB () {
  mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})

  mongoose.connection.on('connected', () => console.log('С БД связь установленно!'))
  mongoose.connection.on('error', err => console.log(`Бд сломалась: ${err}`))
}
