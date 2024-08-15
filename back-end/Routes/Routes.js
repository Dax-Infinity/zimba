const express = require('express')
const { postData, getData, deleteData, putData } = require('../Controller/Controller')
const app = express()


app.post('/', postData)
app.get('/', getData)
app.delete('/:id', deleteData)
app.put('/:id', putData)

module.exports = app;