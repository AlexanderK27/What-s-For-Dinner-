const { Router } = require('express')
const fetch = require('node-fetch');

const router = Router()

const spURL = 'https://api.spoonacular.com/recipes'
const apiKey = `apiKey=${process.env.SP_API_KEY}`
// const fetchParams = {method: 'GET', body: null, headers: { 'Content-Type': 'application/json' }}

// Gets list of recipes
router.get('/search', async (req, res) => {
    // TODO: implement query params
    try {
        const response = await fetch(`${spURL}/search?${apiKey}`)
        const recipes = await response.json()

        res.status(200).json(recipes)
    } catch (e) {
        console.log(e)
    }
})

// Gets one detailed recipe
router.get('/:id', async (req, res) => {
    try {
        const response = await fetch(`${spURL}/${req.params.id}/information?${apiKey}&includeNutrition=false`)
        const recipe = await response.json()

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }

        res.status(200).json(recipe)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router