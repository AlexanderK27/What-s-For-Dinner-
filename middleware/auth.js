const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        
        if (!token) {
            return res.status(401).json({ message: 'Please authorize' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded._id

        next()

    } catch (e) {
        res.status(401).json({ message: 'Please authorize' })
    }
}