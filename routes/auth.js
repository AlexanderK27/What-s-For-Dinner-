const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const router = Router()

router.post('/registrate',
    [
        check('username', 'Username must be at least 3 symbols long').trim().isLength({ min: 3 }),
        check('password', 'Password must be at least 6 symbols long').trim().isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid registration data'
                })
            }

            const { username, password } = req.body

            const candidate = await User.findOne({ username })
            if (candidate) {
                return res.status(400).json({ message: 'User already exists' })
            }

            const hashedPassword = await bcrypt.hash(password, 8)
            const user = new User({ username, password: hashedPassword })

            await user.save()

            const token = await user.generateAuthToken()
            const tokenExpires = 24*60*60*1000 + Date.now()
            res.status(201).json({ user, token, tokenExpires })
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again later' })
        }
    }
)

router.post('/login',
    [
        check('username', 'Username must be at least 3 symbols long').trim().isLength({ min: 3 }),
        check('password', 'Password must be at least 6 symbols long').trim().isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid authorization data'
                })
            }

            const { username, password } = req.body

            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ message: 'Invalid username or password' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid username or password' })
            }

            const token = await user.generateAuthToken()
            const tokenExpires = 24*60*60*1000 + Date.now()
            res.status(200).json({ user, token, tokenExpires })
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again later' })
        }
    }
)

module.exports = router