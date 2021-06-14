const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// Connect to conversation controller
const messageController = require("../controllers/message");

/* POST route to add a message - POST MESSAGE operation. */
router.post("/:convoId", auth, messageController.addMessage);

/* PUT route to edit a single message - PUT MESSAGE operation. */
router.put("/:convoId/:messageId", auth, messageController.editMessage);

/* DELETE route to delete a single message - DELETE MESSAGE operation. */
router.delete("/:convoId/:messageId", auth, messageController.deleteMessage);

module.exports = router;
