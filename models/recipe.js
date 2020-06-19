const { Schema, model } = require('mongoose')

const recipeSchema = new Schema({
    saved: { type: Boolean, required: true },
    id: { type: Number, required: true },
    image: { type: String, required: true },
    readyInMinutes: { type: Number, required: true },
    servings: { type: Number, required: true },
    title: { type: String, required: true },
    diets: { type: Array },
    cuisines: { type: Array },
    dishTypes: { type: Array },
    extendedIngredients: { type: Array },
    analyzedInstructions: { type: Array },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe