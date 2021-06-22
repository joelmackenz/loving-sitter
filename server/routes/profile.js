const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const profileController = require("../controllers/profile");

router.post("/:id", auth, profileController.createProfile);

router.put("/:id", auth, profileController.updateProfile);

router.get("/:id", auth, profileController.getOneProfile);

router.get("/", auth, profileController.getAllProfiles);

router.get("/search/city/:search", auth, profileController.getProfilesBySearch);

router.get("/search/day/:search", auth, profileController.getProfilesByDay);

module.exports = router;
