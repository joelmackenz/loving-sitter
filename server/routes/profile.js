const express = require("express");
const router = express.Router();

const protect = require('../middleware/auth');
const { validateCreateProfile } = require('../validate');
const { createProfile, getOneProfile } = require('../controllers/profile');


router.post("/createorupdate", validateCreateProfile, protect, createProfile);

router.get("/", protect, getOneProfile);

module.exports = router;
