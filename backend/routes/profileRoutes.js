
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    getMyProfile,
    updateMyProfile,
    uploadProfileImage,
    getSavedPlaces,
    savePlace,
    removeSavedPlace
} = require("../controllers/profileController");

router.get("/me", authMiddleware, getMyProfile);

router.put("/me", authMiddleware, updateMyProfile);

router.post(
    "/me/image",
    authMiddleware,
    upload.single("profileImage"),
    uploadProfileImage
);

router.get("/me/saved-places", authMiddleware, getSavedPlaces);

router.post("/me/saved-places", authMiddleware, savePlace);

router.delete(
    "/me/saved-places/:placeId",
    authMiddleware,
    removeSavedPlace
);

module.exports = router;
