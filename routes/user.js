const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const Recipe = require('../models/recipe')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = Router()

router.post('/recipe', auth, async (req, res) => {
    try {
        const recipe = new Recipe({ saved: true, ...req.body.recipe, owner: req.userId })
        await recipe.save()

        res.status(201).json({ message: 'Saved' })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

router.delete('/recipe', auth, async (req, res) => {
    try {
        const response = await Recipe.deleteMany({ id: req.body.id, owner: req.userId })
        
        if (response.ok !== 1) {
            throw new Error({ status: 500, message: 'DB error, try again later' })
        }

        res.status(200).json({ message: 'Deleted' })
    } catch (e) {
        if (e.status === 500) {
            res.status(500).json({ message: e.message })
        } else {
            res.status(400).json({ message: e.message })
        }
    }
})

router.get('/me/recipes', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        await user.populate({
            path: 'recipes',
            options: { 
                sort: { createdAt: -1 } 
            }
        }).execPopulate()

        if (!user.recipes) {
            return res.status(200).json({ message: 'You have not saved any recipes yet' })
        }

        res.send(user.recipes)
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong on server side' })
    }
})

router.get('/me', auth, async(req, res) => {
    try {
        const user = await User.findById(req.userId)
        res.send(user)
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong on server side' })
    }
})

router.patch('/me', auth, [
    check('oldPassword', 'Missing old password').trim().notEmpty(),
    check('newPassword', 'Password must be at least 6 symbols long').trim().isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Unable to change password. Entered data is not valid.'
        })
    }

    const { oldPassword, newPassword } = req.body

    try {
        const user = await User.findById(req.userId)

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is invalid' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 8)
        user.password = hashedPassword

        await user.save()

        res.status(200).json({ message: 'Your password has been updated' })
    } catch {
        res.status(500).json({ message: 'Something went wrong on server side' })
    }
})

router.delete('/me', auth, check('password', 'Missing password').trim().notEmpty(), 
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Please, enter your password'
                })
            }

            const user = await User.findById(req.userId)

            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Password is invalid' })
            }
 
            await user.remove()

            res.status(200).json({ message: 'Your account has been deleted' })
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong on server side' })
        }
    }
)

module.exports = router