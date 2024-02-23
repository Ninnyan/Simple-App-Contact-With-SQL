// import {Contact} from '../models'
const {contact} = require('../models')
const {body,validationResult} = require('express-validator');
const contactController = {}


/*
    this is auto generate example, you can continue 

*/
contactController.index = async(req,res) => {
    const mahasiswa = [
        {
            nama: 'Ichihou Ririka',
            email: 'Ririka@mail.com'
        },
        {
            nama: 'Noel',
            email: 'Noel@mail.com'
        },
        {
            nama: 'Kazusa',
            email: 'Kazusa@mail.com'
        },
    ]


    res.render('index', { 
        nama: 'Ichijou Ririka',
        title: 'Welcome Home',
        mahasiswa,
        layout: 'layouts/main'

    })
}


contactController.about = async (req,res) => {
    res.render('about', {
        layout: 'layouts/main',
        title: 'Welcome About'
    })
}


contactController.getContact = async (req,res) => {
    try {
        const contacts = await contact.findAll()
    
        res.render('contact', {
            layout: 'layouts/main',
            title: 'Welcome Contact',
            contacts,
            msg: req.flash('msg')
        })
        
    } catch (error) {
        res.status(500).json({
            message: error
        })
        
    }
   
}



contactController.getOne = async (req,res) => {
    try {

        const id = await contact.findOne({
            where: {
                id: req.params.id
            }
        })
        
        res.render('detail', {
            layout: 'layouts/main',
            title: 'Detail Contact',
            id
        })
    } catch  (error) {
        res.status(500).json({
            message: error
        })
        
    }
}


contactController.addContact = async (req,res) => {
    try {
        res.render('add-contact', {
            layout: 'layouts/main',
            title: 'Tambah Contact',
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

contactController.tambah =  

    async (req,res) => {
    try {
        const result = validationResult(req);  
        console.log(result.array());
        const {nama,email,noHP} = req.body

        if(!result.isEmpty()) {
            res.render('add-contact', {
                layout: 'layouts/main',
                title: 'Tambah Contact',
                result: result.array()
            })
        } else { 
            console.log(req.body);
            await contact.create({
                nama,
                email,
                noHP
            })

            req.flash('msg', 'Data Contact Berhasil Ditambahkan !')
            res.redirect('/contact')
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }

}


contactController.hapus = async (req,res) => {
    try {
        const id = await contact.findOne({
            where : {
                id: req.params.id
            }
        })
        if (!id) {
            res.status(404).send('<h1>404</h1>')
        } else {
            await contact.destroy({
                where: {
                    id: req.params.id
                }
            })
            req.flash('msg', `Data Contact ${id.nama} Berhasil Dihapus !!`)
            res.redirect('/contact')
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }

}


contactController.getEdit = async (req,res) => {
    try {
        const id = await contact.findOne({
            where : {
                id: req.params.id
            }
        })
    res.render('edit-contact', {
        layout: 'layouts/main',
        title: 'Tambah Contact',
        id
    })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}


contactController.edit = async (req,res) => {
    try {
        const result = validationResult(req); 
        const {nama,email,noHP,oldId,oldNama} = req.body
        if(!result.isEmpty()) {
            res.render('edit-contact', {
                layout: 'layouts/main',
                title: 'Update Contact',
                result: result.array(),
                id: req.body
            })
        } else {
            const id = await contact.findOne({
                where : {
                    id: oldId
                }
            })
            
            await contact.update({
                nama,
                email,
                noHP
            },{
                where: {
                    id: oldId
                }
            }
        )
        
        req.flash('msg', `Data Contact ${id.nama} Berhasil Diubah, Menjadi ${nama} !`)
        res.redirect('/contact')
    }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

module.exports = contactController

