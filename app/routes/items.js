const router = require('express').Router()

const checkAdmin = require('./checkAdmin')
const checkUser = require('./checkUser')

const Item = require('../models/Item')

//All items
router.get('/', checkUser, async (req, res) => {
    try {
        const items = await Item.find({})
        res.status(200).json({
            message: "success",
            data: items
        })
    } catch (error) {
        res.status(400).json({  message: "error" })
    }
})

//Find item
router.get('/:id', checkUser, async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findById(id)
        res.status(200).json({
            message: "success",
            data: {
                id: item._id,
                name: item.name,
                price: item.price,
                image: item.image
            }
        })
    } catch (error) {
        res.status(400).json({  message: "invalid" })
    }
})

//Add item
router.post('/', checkAdmin, token, async (req, res) => {
    try {
        await Item.create({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        })
        res.status(200).json({  message: "success" })
    } catch (error) {
        res.status(400).json({  message: "invalid" })
    }
})

//Edit item
router.put('/:id', checkAdmin, async (req, res) => {
    try {
        const { id } = req.params
        await Item.findByIdAndUpdate(id, {
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        })
        res.status(200).json({ message: "success" })
    } catch (error) {
        res.status(400).json({  message: "invalid" })
    }
})

//Delete item
router.delete('/:id', checkAdmin, async (req, res) => {
    try {
        const { id } = req.params
        await Item.findByIdAndDelete(id)
        res.status(200).json({ message: "success" })
    } catch (error) {
        res.status(400).json({  message: "invalid" })
    }
})

module.exports = router