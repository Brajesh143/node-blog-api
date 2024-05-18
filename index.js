const express = require('express')
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose')
const asyncHandlr = require('express-async-handlr')

const listenPort = process.env.PORT
const dbURI = process.env.DB_URL

const app = express()

app.listen(listenPort, (err) => {
    if (err) {
        console.log("Error")
    }

    (async () => {
        try {
          await mongoose.connect(dbURI)
          console.log("Database connected")
        } catch (err) {
          console.log('error: ' + err)
        }
    })()

    console.log("Server starts on port ", listenPort)
})