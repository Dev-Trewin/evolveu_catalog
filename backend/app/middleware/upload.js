
const multer = require('multer')

const fs = require('fs')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname + '/../uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
//cb(null, 'uploads')
const upload = multer({ storage: storage })
module.exports = upload