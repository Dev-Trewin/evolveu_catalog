
module.exports = app => {
    const img = require("../app/controllers/image.controller")
    const express = require('express');
    const router = express.Router();
    const upload = require("../app/middleware/upload")



    router.get('/', img.findAll)
    // Retrieve a single image with id
    router.get("/:id", img.findOne);

    router.post('/', upload.single('image'), img.createImage)

    app.use("/api/image", router)
}
