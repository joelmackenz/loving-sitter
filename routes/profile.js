const express = require("express");
const router = express.Router();

const protect = require('../middleware/auth');
const { validateCreateProfile } = require('../validate');
const { 
  createProfile,
  getOneProfile,
  getAllProfiles,
  getProfilesBySearch,
  getProfilesByDay,
  getOneFullUserProfile
} = require('../controllers/profile');


router.post("/createorupdate", validateCreateProfile, protect, createProfile);

router.get("/one", protect, getOneProfile);

router.get("/:userId", protect, getOneFullUserProfile);

router.get("/", protect, getAllProfiles);

router.get("/search/city/:search", protect, getProfilesBySearch);

router.get("/search/day/:search", protect, getProfilesByDay);

module.exports = router;
