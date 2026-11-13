
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password -googleId");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({ user });

    } catch (error) {
        console.error("Get profile error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateMyProfile = async (req, res) => {
    try {
        const { name, bio, location } = req.body;
        const updates = {};

        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    message: "Name cannot be empty"
                });
            }

            updates.name = name.trim();
        }

        if (bio !== undefined) {
            if (typeof bio !== "string" || bio.length > 160) {
                return res.status(400).json({
                    message: "Bio must be 160 characters or less"
                });
            }

            updates.bio = bio.trim();
        }

        if (location !== undefined) {
            if (typeof location !== "string") {
                return res.status(400).json({
                    message: "Invalid location"
                });
            }

            updates.location = location.trim();
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-password -googleId");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        console.error("Update profile error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please select an image"
            });
        }

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {
                folder: "trip-planner/profiles",
                resource_type: "image"
            }
        );

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: result.secure_url },
            { new: true, runValidators: true }
        ).select("-password -googleId");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile image uploaded successfully",
            user
        });

    } catch (error) {
        console.error("Upload profile image error:", error);

        return res.status(500).json({
            message: "Image upload failed"
        });
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile,
    uploadProfileImage
};
