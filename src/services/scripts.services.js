const Script = require('../models/scripts.model')

exports.create = async data => {
    const newScript = new Script({
        name: data.name,
        script: data.script,
        style: data.style ?? null,
        lastDay: data.lastDay
    })

    try {
        return await newScript.save()
    } catch (err) {
        throw err
    }
}