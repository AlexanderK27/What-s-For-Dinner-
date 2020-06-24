const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const Recipe = require('./recipe')

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        trim: true 
    },
    password: { 
        type: String, 
        trim: true 
    },
    provider: {
        type: String,
        trim: true
    },
    idFromProvider: {
        type: String,
        trim: true
    }
})

userSchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.pre('remove', async function(next) {
    const user = this
    await Recipe.deleteMany({ owner: user._id })
    next()
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.idFromProvider

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    return jwt.sign(
        { _id: user._id.toString() }, 
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}

const User = model('User', userSchema)

module.exports = User