const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");
const { validateCreateNotification } = require("../validate");
const { 
  getAllNotification,
  getUnreadNotification,
  createNotification,
  updateReadNotification,
} = require("../controllers/notification");

router.get("/", protect, getAllNotification);
router.get("/unread", protect, getUnreadNotification);
router.post("/create", protect, validateCreateNotification, createNotification);
router.put("/updatereadstatus", protect, updateReadNotification);

module.exports = router;
