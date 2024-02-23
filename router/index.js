const express = require("express");
const contactController = require("../controller/contactController");
const routeContact = require("./contact");
const route = express.Router()


route.get('/',contactController.index)
route.get('/about',contactController.about)
route.use('/contact',routeContact)



module.exports = route