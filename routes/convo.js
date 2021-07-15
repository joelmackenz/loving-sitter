const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const convoController = require("../controllers/convo");

router.post("/", auth, convoController.createConvo);

router.get("/", auth, convoController.getAllConvos);

router.get("/:convoId", auth, convoController.getSingleConvo);

router.get("/messages/:convoId", auth, convoController.getConvoMessages);

module.exports = router;
