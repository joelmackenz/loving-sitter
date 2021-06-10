const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// Connect to profile controller
const profileController = require("../controllers/profile");

/* PUT route to add a profile to a user - UPDATE PROFILE operation. */
router.put("/:id", auth, profileController.updateProfile);

/* GET route to get a single profile - GET SINGLE PROFILE operation. */
router.get("/:id", auth, profileController.getOneProfile);

/* GET route to get a single profile - GET ALL PROFILES operation. */
router.get("/", auth, profileController.getAllProfiles);

module.exports = router;
