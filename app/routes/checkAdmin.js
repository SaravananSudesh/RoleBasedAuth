const jwt = require("jsonwebtoken")

function checkAdmin (req, res, next){

    if (!req.header('auth-token')) return res.status(401).send('Access denied')

    const token = req.header('auth-token')

    try {
        const verified = jwt.verify(token, config.secret)
        req.user = verified
        if (verified._id && verified.role === 'admin') next()
    } catch (error) {
        return res.status(400).send('Invalid')
    }

}

module.exports = checkAdmin