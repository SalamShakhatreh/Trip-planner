const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    register,
    login,
    googleLogin,
    getAllUsers
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/admin/all", authMiddleware, adminMiddleware, getAllUsers);



module.exports = router;

