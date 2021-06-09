const express = require("express");
const router = express.Router();

// Connect to conversation controller
const convoController = require("../controllers/convo");

/* POST route to create a conversation - POST CONVERSATION operation. */
router.post("/", convoController.createConvo);

/* GET route to fetch a single conversation - GET CONVERSATION operation. */
router.get("/", convoController.getSingleConvo);

/* GET route to get all messages in a conversation - GET CONVERSATION operation */
router.get("/messages/:id", convoController.getConvoMessages);

module.exports = router;
