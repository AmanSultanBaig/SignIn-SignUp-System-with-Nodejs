const express = require('express');
const app = express();
require('dotenv').config({path: './config/.env'})
require('./config/db.config')
let portNo = process.env.PORT

app.listen(portNo, __ => console.log(`Server is Running on Port ${portNo}! `))