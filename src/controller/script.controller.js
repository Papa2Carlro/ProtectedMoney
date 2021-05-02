const config = require('../../config/config')
const moment = require('moment')
const rename = require('../utils/editfile')

const services = require('../services/scripts.services')

let data = [
  {
    "_id": 1619520301029,
    "name": "asicfox1",
    "script": "asicfox/asicfox.js",
    "style": "asicfox/style.css",
    "lastDay": {
      "day": 27,
      "mount": 4,
      "year": 2021
    }
  }
]

exports.createScript = async (req, res) => {
  const error = {}
  const style = req.body.style

  const body = {
    name: req.body.name,
    script: req.body.script,
    lastDay: req.body.lastDay
  }

  if (style) body.style = style

  try {
    if (data.filter(item => item.name === body.name).length !== 0) error.name = 'Такое имя уже существует'
    if (!body.name) error.name = 'Поле обезательно для заполнения'
    if (!body.script) error.script = 'Поле обезательно для заполнения'
    if (!body.lastDay) error.lastDay = 'Поле обезательно для заполнения'

    // Throw out the error
    if (Object.keys(error).length) throw error

    await services.create(body)
    return res.status(201).json({ok: true, msg: 'Field created successful', data})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

exports.editScript = (req, res) => {
  const error = {}
  const style = req.body.style

  const body = {
    _id: req.body._id,
    name: req.body.name,
    script: req.body.script,
    lastDay: req.body.lastDay
  }

  try {
    if (data.filter(item => item.name === body.name && item._id !== body._id).length !== 0) error.name = 'Такое имя уже существует'
    if (!body._id) error.id = 'Поле обезательно для заполнения'
    if (!body.name) error.name = 'Поле обезательно для заполнения'
    if (!body.script) error.script = 'Поле обезательно для заполнения'
    if (!body.lastDay) error.lastDay = 'Поле обезательно для заполнения'

    data.map(item => {
      if (item._id === body._id) {
        item.name = body.name
        item.script = body.script
        item.lastDay = body.lastDay

        if (style) item.style = style
      }
    })

    // Throw out the error
    if (Object.keys(error).length) throw error

    return res.status(201).json({ok: true, msg: 'Field edit successful'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

exports.getScripts = (req, res) => {
  const name = req.params.name
  if(name === 'all') return res.status(200).json({ok: true, data})

  try {
    const result = data.filter(item => item.name === name)
    if (result.length === 0) throw 'Not found'

    return res.status(200).json({ok: true, data: result[0]})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

exports.getScript = (req, res) => {
  const name = req.params.name
  const date = new Date()
  const [day, mount, year] = [date.getDate(), date.getMonth(), date.getFullYear()]

  try {
    if (!name) throw 'Empty field'

    const result = data.filter(item => item.name === name)[0]
    const {day: endDay, mount: endMount, year: endYear} = result.lastDay
    const endDayBool = moment(`${endYear}-${endMount}-${endDay}`).isBefore(`${year}-${mount+1}-${day}`)

    if (endDayBool) rename(result.script, result.style)

    const response = {ok: true, script: config.baseUrl + result.script}
    if (result.style) response.style = config.baseUrl + result.style

    return res.json(response)
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

exports.removeScript = (req, res) => {
  const _id = req.body._id
  const dataLength = data.length

  try {
    data = data.filter(item => item._id !== _id)
    if (dataLength === data.length) throw 'Not Found'
    return res.status(201).json({ok: true, msg: 'Field delete successful'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
