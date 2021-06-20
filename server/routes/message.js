const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const messageController = require("../controllers/message");

router.post("/:convoId", auth, messageController.addMessage);

router.put("/:convoId/:messageId", auth, messageController.editMessage);

router.delete("/:convoId/:messageId", auth, messageController.deleteMessage);

module.exports = router;
