require("dotenv").config()
const mongoose = require("mongoose")
const express = require('express')
const cors = require('cors')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user')
const instructorRoutes = require('./routes/instructor')
const courseRoutes = require('./routes/course')
const categoryRoutes = require('./routes/category')

const morgan = require('morgan'), 
 app = express(),
 port = process.env.PORT || 4000,
 csrfProtection = csrf({ cookie: true })

mongoose.connect("mongodb://localhost:27017/finalyrproj", { useNewUrlParser: true, useUnifiedTopology: true, })
 .then(() => console.log('DB CONNECTED'))
 .catch((err) => console.log("DB CONNECTION ERR =>", err))

// apply middlewares
app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', userRoutes)
app.use('/api', instructorRoutes)
app.use('/api', courseRoutes)
app.use('/api', categoryRoutes)
app.use(cookieParser())
app.use(csrfProtection)


app.get('/api/csrf-token', (req, res) => { res.json({ csrfToken: req.csrfToken() })})
app.listen(port, () => console.log(`Server is running on port ${port}`))