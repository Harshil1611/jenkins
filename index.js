const express= require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const connection = require('./dbConfig.js')
const Student = require('./Models/Student.model.js')
const router = require('./Routes/studentRoute.js')
const path = require('path')


const app = express()
const port = process.env.PORT 

//middlewares
app.use(express.json())
app.use(cors())

//connecting with Database
connection()

app.use('/api/v1/',router)
// app.use("/StudentImage", express.static())

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})