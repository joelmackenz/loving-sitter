const multer = require("multer");
const express = require("express");
const router = express.Router();

const { s3Storage } = require("../controllers/s3")

const upload = multer({ 
    dest: 'temp/',
    limits: {
        fieldSize: 1 * 1024 * 1024
    }
 })
    .single('photo');


router.post("/saveImage", upload, s3Storage);

module.exports = router;