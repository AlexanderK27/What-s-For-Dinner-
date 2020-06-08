const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use('/api/recipes', require('./routes/spoonacular'))

// app.use(express.static(path.resolve(__dirname, 'client')))

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
// })

module.exports = app