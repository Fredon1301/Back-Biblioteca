'use strict'

const mongoose = require('mongoose')
const cors = require('cors');   
const fs = require('fs')
const http = require('http')
const https = require('https')
require('dotenv').config()


mongoose.connect('mongodb://127.0.0.1:27017/Back-Biblioteca')

const express = require('express')


const app = express()

http.createServer(app).listen(3333)

const middlewareAuth = require('./src/middlewareAuth')
const userRouter = require('./src/router/userRouter')

const bookRouter = require('./src/router/bookRouter')
const cartRouter = require('./src/router/cartRouter')
const jwtService = require('jsonwebtoken')


app.use(cors());
app.use(express.json())
app.use(middlewareAuth)
app.use(userRouter)
app.use(cartRouter)
app.use(bookRouter)










   console.log(`O servidor está em execução`)

