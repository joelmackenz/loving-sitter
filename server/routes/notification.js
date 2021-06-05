const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");
const { 
    getAllNotification,
    getUnreadNotification,
    createNotification,
    updateReadNotification
} = require("../controllers/notification");

router.get("/", protect, getAllNotification)
router.post("/create", protect, createNotification);
router.put("/update", protect, updateReadNotification);
router.post("/unread", protect, getUnreadNotification);

module.exports = router;
