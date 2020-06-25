const express = require('express')
const passport = require('passport')
const path = require('path')
require('./oauth-setup')

const app = express()

app.use(express.json())
app.use(passport.initialize())

app.use('/api/recipes', require('./routes/spoonacular'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

module.exports = app