const express = require("express");
const router = express.Router();

// Connect to conversation controller
const messageController = require("../controllers/message");

/* POST route to add a message - POST MESSAGE operation. */
router.post("/:id", messageController.addMessage);

// /* PUT route to edit a single message - PUT MESSAGE operation. */
// router.put("/:id", messageController.editMessage);

// /* DELETE route to delete a single message - DELETE MESSAGE operation. */
// router.delete("/:id", messageController.deleteMessage);

module.exports = router;
