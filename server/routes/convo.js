const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// Connect to conversation controller
const convoController = require("../controllers/convo");

/* POST route to create a conversation - POST CONVERSATION operation. */
router.post("/", auth, convoController.createConvo);

/* GET route to fetch all conversations - GET CONVERSATION operation. */
router.get("/", auth, convoController.getAllConvos);

/* GET route to fetch a single conversation - GET CONVERSATION operation. */
router.get("/:convoId", auth, convoController.getSingleConvo);

/* GET route to get all messages in a conversation - GET CONVERSATION operation */
router.get("/messages/:id", auth, convoController.getConvoMessages);

module.exports = router;
