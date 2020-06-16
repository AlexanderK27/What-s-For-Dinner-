const { Router } = require('express')
const fetch = require('node-fetch');

const router = Router()

const spURL = 'https://api.spoonacular.com/recipes'
const apiKey = `apiKey=${process.env.SP_API_KEY}`

// Gets list of recipes
router.get('/search', async (req, res) => {
    let qParams = ''
    if (req.query.title && req.query.title !== '') {
        qParams = `&query=${req.query.title}`
    }

    if (req.query.filters && req.query.filters !== '') {
        const filters = JSON.parse(req.query.filters)

        if (filters.diets.length > 1) {
            return res.status(400).json({ message: 'You cannot select more then one diet' })
        } 
        if (filters.diets.length) {
            qParams = qParams + `&diets=${filters.diets[0]}`
        } 
        if (filters.cuisines.length) {
            qParams = qParams + `&cuisine=${filters.cuisines.join(',')}`
        } 
        if (filters.intolerances.length) {
            qParams = qParams + `&intolerances=${filters.intolerances.join(',')}`
        }
    }

    try {
        const response = await fetch(`${spURL}/search?${apiKey}${qParams}`)
        const recipes = await response.json()

        if (!recipes.results.length) {
            return res.status(404).json({ message: "Sorry, there are no such recipes" })
        }

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