const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true, 
        trim: true 
    }
})

// userSchema.virtual('usertickets', {
//     ref: 'Ticket',
//     localField: '_id',
//     foreignField: 'owner'
// })

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password

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