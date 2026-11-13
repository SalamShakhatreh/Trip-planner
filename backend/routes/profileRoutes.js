
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    getMyProfile,
    updateMyProfile,
    uploadProfileImage
} = require("../controllers/profileController");

router.get("/me", authMiddleware, getMyProfile);

router.put("/me", authMiddleware, updateMyProfile);

router.post(
    "/me/image",
    authMiddleware,
    upload.single("profileImage"),
    uploadProfileImage
);

module.exports = router;
