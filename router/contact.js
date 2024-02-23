const express = require("express");
const contactController = require("../controller/contactController");
const contactUtils = require("../utils/contactUtils");
const contactUtils2 = require("../utils/contactUtils2");
const routeContact = express.Router()



routeContact.get('/',contactController.getContact)
routeContact.get('/add',contactController.addContact)
routeContact.post('/',contactUtils,contactController.tambah)
routeContact.get('/delete/:id',contactController.hapus)
routeContact.get('/edit/:id',contactController.getEdit)
routeContact.post('/update',contactUtils2,contactController.edit)
routeContact.get('/:id',contactController.getOne)




module.exports = routeContact


