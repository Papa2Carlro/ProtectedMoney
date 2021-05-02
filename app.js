const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express();

const api = require('./src/routes/api')

// Connect MongoDB
require('./src/utils/dbconnect')()

app.use(cors())
app.use(logger('dev'))
app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api', api)
app.use('/script', express.static('public'));

app.get('/', (req, res) => {
    return res.status(200).json({msg: 'Server working'})
})

module.exports = app;
