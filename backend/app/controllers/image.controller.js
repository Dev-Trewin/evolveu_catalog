const db = require('../models')
const Image = db.image
const fs = require('fs')
const path = require('path')

exports.findAll = (req, res) => {
    Image.find((err, item) => {
        if (err) {
            console.log(err)
        } else {
            // res.send('working')
            res.send(item)
        }
    })
}
exports.findOne = (req, res) => {
    const id = req.params.id;
    Image.findOne({ _id: id }, (err, item) => {
        if (err) {
            console.log(err)
        } else {
            // res.send('working')
            res.send(item)
        }
    })
}


//fs.readFileSync(path.join(__dirname + '/../app/uploads/' + req.file.filename))
exports.createImage = (req, res, next) => {
    const obj = {
        name: req.body.name,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/../../app/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    }
    console.log('name: ', obj.name, " type: ", obj.type)
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err)
        } else {
            //item.save()
            console.log(item.id)
            res.send(item)
        }
    })
}