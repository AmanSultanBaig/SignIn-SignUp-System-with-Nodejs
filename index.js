const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' })
require('./config/db.config')


app.use(express.json())
app.use(require('./routes/routes'))

// middleware trigger when such endpoint not found
app.use((req, res, next) => {
    const error = new Error("Endpoint not Found");
    error.status = 404;
    next(error)
})

// middleware trigger when any kind of error throw from anywhere 
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    })
})

let portNo = process.env.PORT

app.listen(portNo, __ => console.log(`Server is Running on Port ${portNo}! `))