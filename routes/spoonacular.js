const { Router } = require('express')

const router = Router()

const spURL = 'https://api.spoonacular.com/recipes'
const apiKey = `apiKey=${process.env.SP_API_KEY}`
const fetchParams = {method: 'GET', body: null, headers: { 'Content-Type': 'application/json' }}

// Gets list of recipes
router.get('/search', async (req, res) => {
    // TODO: implement query params
    try {
        const recipes = await fetch(`${spURL}/search?${apiKey}`, fetchParams)
        res.status(200).send(recipes)
    } catch (e) {
        console.log(e)
    }
})

// Gets one detailed recipe
router.get('/:id', async (req, res) => {
    try {
        const recipe = await fetch(`${spURL}/${req.params.id}/information?${apiKey}&includeNutrition=false`, fetchParams)

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }

        res.status(200).send(recipe)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router