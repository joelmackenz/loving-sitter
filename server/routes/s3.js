const multer = require("multer");
const express = require("express");
const router = express.Router();

const { uploadImage } = require("../controllers/s3")

const upload = multer({
  limits: {
    fieldSize: 1 * 1024 * 1024
  }
})
  .array('photos', 5);


router.post("/uploadimage", upload, uploadImage);

module.exports = router;
