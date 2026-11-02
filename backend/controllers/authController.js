
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedName = name.trim();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword,
            role: "user"
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        console.error("Register error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user || !user.password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (typeof credential !== "string" || !credential) {
            return res.status(400).json({
                message: "Google credential is required"
            });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email || !payload.email_verified || !payload.sub) {
            return res.status(401).json({
                message: "Invalid Google account"
            });
        }

        const normalizedEmail = payload.email.toLowerCase();
        const googleId = payload.sub;

        let user = await User.findOne({ googleId });

        if (!user) {
            user = await User.findOne({ email: normalizedEmail });

            if (user) {
                if (user.googleId && user.googleId !== googleId) {
                    return res.status(409).json({
                        message: "This email is linked to another Google account"
                    });
                }

                user.googleId = googleId;
                await user.save();
            } else {
                user = new User({
                    name: payload.name || normalizedEmail.split("@")[0],
                    email: normalizedEmail,
                    googleId,
                    role: "user"
                });

                await user.save();
            }
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Google login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Google login error:", error);

        return res.status(500).json({
            message: "Google login failed"
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -googleId");

        return res.status(200).json({
            users,
            totalUsers: users.length
        });

    } catch (error) {
        console.error("Get users error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = { register, login, googleLogin, getAllUsers };
