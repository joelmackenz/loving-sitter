const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// Connect to profile controller
const profileController = require("../controllers/profile");

/* POST route to create profile within a user object - POST PROFILE operation. */
router.post("/:id", auth, profileController.createProfile);

/* PUT route to add a profile to a user - UPDATE PROFILE operation. */
router.put("/:id", auth, profileController.updateProfile);

/* GET route to get a single profile - GET SINGLE PROFILE operation. */
router.get("/:id", auth, profileController.getOneProfile);

/* GET route to get all profiles - GET ALL PROFILES operation. */
router.get("/", auth, profileController.getAllProfiles);

/* GET route to get all profiles by search terms - GET PROFILES BY SEARCH operation. */
router.get("/search/city/:search", auth, profileController.getProfilesBySearch);

/* GET route to get all profiles by search terms - GET PROFILES BY DAY operation. */
router.get("/search/day/:search", auth, profileController.getProfilesByDay);

module.exports = router;
