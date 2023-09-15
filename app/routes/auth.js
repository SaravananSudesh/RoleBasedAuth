const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

//Register
router.post('/register', async (req, res) => {

    const emailExist = await User.findOne({ email: req.body.email })

    if (emailExist) res.status(400).send({ message : 'exists' })

    //Password hashing
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role: 'user'
    })

    try {
        await user.save()
        res.status(200).send({ message : 'success' })
    } catch (error) {
        res.status(400).send({ message : 'failed' })
    }
})

//Login
router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) return res.status(400).send({ message : 'invalid' })

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) return res.status(400).send({ message : 'incorrect' })

        const token = jwt.sign({ _id: user.id }, config.secret)

        return res.header('auth-token', token).send({ token : token, message : 'success' })
    } catch (error) {
        return res.status(400).send({ message : 'error' })
    }

    
})

module.exports = router