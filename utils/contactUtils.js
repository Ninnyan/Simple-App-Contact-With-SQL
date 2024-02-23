const {body} = require('express-validator');
const {contact} = require('../models')

const contactUtils = [body('nama').custom(async (value) => {
        const cek = await contact.findOne({
            where: {
                nama: value
            }
        })
        if (cek) {
            throw new Error('Nama Sudah Dipakai, Mohon Masukan Nama lain')
        }
        return true
    }),
    body('email').isEmail().withMessage('Email Tidak Sesuai'),
    body('noHP').isMobilePhone('id-ID').withMessage(`noHP Bukan Termasuk no Indonesia, Silahkan Input sesuai Pedoman no Seluler yang berlaku di Indonesia ~~! `)
    ]




module.exports = contactUtils