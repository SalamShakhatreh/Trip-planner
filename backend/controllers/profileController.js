
const User = require("../models/User");
const Place = require("../models/Place");
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
            { returnDocument: "after", runValidators: true }
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
            { returnDocument: "after", runValidators: true }
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

const getSavedPlaces = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate({
                path: "savedPlaces",
                populate: {
                    path: "destination"
                }
            })
            .select("savedPlaces");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            savedPlaces: user.savedPlaces
        });

    } catch (error) {
        console.error("Get saved places error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const savePlace = async (req, res) => {
    try {
        const { placeId } = req.body;

        if (!placeId || !/^[0-9a-fA-F]{24}$/.test(placeId)) {
            return res.status(400).json({
                message: "Valid place ID is required"
            });
        }

        const place = await Place.findById(placeId);

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { savedPlaces: placeId } },
            { returnDocument: "after" }
        ).select("savedPlaces");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Place saved successfully",
            savedPlaces: user.savedPlaces
        });

    } catch (error) {
        console.error("Save place error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const removeSavedPlace = async (req, res) => {
    try {
        const { placeId } = req.params;

        if (!/^[0-9a-fA-F]{24}$/.test(placeId)) {
            return res.status(400).json({
                message: "Valid place ID is required"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { savedPlaces: placeId } },
            { returnDocument: "after" }
        ).select("savedPlaces");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Place removed from saved places",
            savedPlaces: user.savedPlaces
        });

    } catch (error) {
        console.error("Remove saved place error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile,
    uploadProfileImage,
    getSavedPlaces,
    savePlace,
    removeSavedPlace
};
