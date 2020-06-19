const { Router } = require('express')
const Recipe = require('../models/recipe')
const auth = require('../middleware/auth')
const { Error } = require('mongoose')

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
        console.log(response)
        
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

module.exports = router