const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

const config = require("./config")

app.use(express.json())
app.use(cors())

//Import routes
const authRoute = require('./app/routes/auth')

//Configure routes
app.use('/api/user', authRoute)

//Connect to database
mongoose.connect(config.database)
.then(() => console.log('Database connection established!'))
.catch(() => console.log('Database connection failed!'))

app.get('/', (req, res) => {
    res.send('<h1>Role Based Authentication</h1>')
})

const port = 3000

app.listen(port, () => console.log(`Server is running at ${port} !`))