const express = require('express')
const dotenv = require("dotenv")
const route = require('./router')
const app = express()

const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

dotenv.config()

// Gunakan EJS
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(expressLayouts)
app.use(express.urlencoded({extended:true}))

app.use(cookieParser('secret'))
app.use(session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.use(express.json())
app.use(route)

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_URL}:${process.env.APP_PORT}`)
})