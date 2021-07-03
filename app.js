const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDb = require('./config/db')

dotenv.config({ path: './config/config.env' })

const app = express()
connectDb()


app.engine('.hbs', exphbs({
    defaultLayout : 'main',
    extname : '.hbs'
}));

app.set('view engine','.hbs')

app.use(express.static(path.join(__dirname, 'views/public')));
app.use(express.urlencoded({ extended: false }))

app.use('',require('./routes/index'))

app.listen(process.env.PORT,() =>{console.log("Server running on PORT  : " + process.env.PORT)});