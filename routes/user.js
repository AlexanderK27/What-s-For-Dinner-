const { Router } = require('express')
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

router.delete('/me', auth, async (req, res) => {
    try {
        const response = await User.deleteOne({ _id: req.userId })

        if (response.ok !== 1) {
            throw new Error({ status: 500, message: 'DB error, try again later' })
        }

        res.status(200).json({ message: 'Deleted' })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong on server side' })
    }
})

module.exports = router