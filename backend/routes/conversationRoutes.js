const express = require("express");
const router = express.Router();

const {
    startConversation,
    sendMessage
} = require("../controllers/conversationController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, startConversation);

router.post("/:conversationId/messages", authMiddleware, sendMessage);

module.exports = router;