
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    uploadTravelPhoto,
    getMyTravelPhotos,
    updateTravelPhoto,
    deleteTravelPhoto
} = require("../controllers/travelPhotoController");

router.post("/", authMiddleware, upload.single("image"), uploadTravelPhoto);
router.get("/", authMiddleware, getMyTravelPhotos);
router.put("/:id", authMiddleware, updateTravelPhoto);
router.delete("/:id", authMiddleware, deleteTravelPhoto);

module.exports = router;
