const multer = require("multer");
const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");
const { uploadImage } = require("../controllers/s3")

const upload = multer({
  limits: {
    fileSize: 1.5 * 1024 * 1024 // 1.5 MB limit 
  }
})
  .fields([
    { name: "background", maxCount: 1 },
    { name: "profile", maxCount: 1 },
  ])


router.post("/uploadimage", protect, upload, uploadImage);

module.exports = router;
