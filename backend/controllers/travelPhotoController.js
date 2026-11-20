
const mongoose = require("mongoose");
const TravelPhoto = require("../models/TravelPhoto");
const cloudinary = require("../config/cloudinary");

const uploadTravelPhoto = async (req, res) => {
    let uploadedPublicId = null;

    try {
        const { title, description, country, city } = req.body;

        if (!req.user?.id) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please select an image"
            });
        }

        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Photo title is required"
            });
        }

        if (title.trim().length > 100) {
            return res.status(400).json({
                message: "Title must be 100 characters or less"
            });
        }

        if (
            description !== undefined &&
            (typeof description !== "string" || description.length > 500)
        ) {
            return res.status(400).json({
                message: "Description must be 500 characters or less"
            });
        }

        if (typeof country !== "string" || !country.trim()) {
            return res.status(400).json({
                message: "Country is required"
            });
        }

        if (country.trim().length > 100) {
            return res.status(400).json({
                message: "Country must be 100 characters or less"
            });
        }

        if (city !== undefined && typeof city !== "string") {
            return res.status(400).json({
                message: "Invalid city"
            });
        }

        if (city && city.trim().length > 100) {
            return res.status(400).json({
                message: "City must be 100 characters or less"
            });
        }

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {
                folder: "trip-planner/travel-photos",
                resource_type: "image"
            }
        );

        uploadedPublicId = result.public_id;

        const travelPhoto = await TravelPhoto.create({
            user: req.user.id,
            image: result.secure_url,
            public_id: result.public_id,
            title: title.trim(),
            description: description?.trim() || "",
            country: country.trim(),
            city: city?.trim() || ""
        });

        return res.status(201).json({
            message: "Travel photo uploaded successfully",
            travelPhoto
        });

    } catch (error) {
        if (uploadedPublicId) {
            try {
                await cloudinary.uploader.destroy(uploadedPublicId);
            } catch (cloudinaryError) {
                console.error("Cloudinary cleanup error:", cloudinaryError);
            }
        }

        console.error("Upload travel photo error:", error);

        return res.status(500).json({
            message: "Travel photo upload failed"
        });
    }
};

const getMyTravelPhotos = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const travelPhotos = await TravelPhoto.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            travelPhotos
        });

    } catch (error) {
        console.error("Get travel photos error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateTravelPhoto = async (req, res) => {
    try {
        const { title, description, country, city } = req.body;
        const updates = {};

        if (!req.user?.id) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid travel photo ID"
            });
        }

        if (title !== undefined) {
            if (
                typeof title !== "string" ||
                !title.trim() ||
                title.trim().length > 100
            ) {
                return res.status(400).json({
                    message: "Title is required and must be 100 characters or less"
                });
            }

            updates.title = title.trim();
        }

        if (description !== undefined) {
            if (
                typeof description !== "string" ||
                description.length > 500
            ) {
                return res.status(400).json({
                    message: "Description must be 500 characters or less"
                });
            }

            updates.description = description.trim();
        }

        if (country !== undefined) {
            if (
                typeof country !== "string" ||
                !country.trim() ||
                country.trim().length > 100
            ) {
                return res.status(400).json({
                    message: "Country is required and must be 100 characters or less"
                });
            }

            updates.country = country.trim();
        }

        if (city !== undefined) {
            if (
                typeof city !== "string" ||
                city.trim().length > 100
            ) {
                return res.status(400).json({
                    message: "City must be 100 characters or less"
                });
            }

            updates.city = city.trim();
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "Please provide at least one field to update"
            });
        }

        const travelPhoto = await TravelPhoto.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!travelPhoto) {
            return res.status(404).json({
                message: "Travel photo not found"
            });
        }

        return res.status(200).json({
            message: "Travel photo updated successfully",
            travelPhoto
        });

    } catch (error) {
        console.error("Update travel photo error:", error);

        return res.status(500).json({
            message: "Travel photo update failed"
        });
    }
};

const deleteTravelPhoto = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid travel photo ID"
            });
        }

        const travelPhoto = await TravelPhoto.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!travelPhoto) {
            return res.status(404).json({
                message: "Travel photo not found"
            });
        }

        const result = await cloudinary.uploader.destroy(
            travelPhoto.public_id
        );

        if (result.result !== "ok" && result.result !== "not found") {
            return res.status(500).json({
                message: "Could not delete image from Cloudinary"
            });
        }

        await travelPhoto.deleteOne();

        return res.status(200).json({
            message: "Travel photo deleted successfully"
        });

    } catch (error) {
        console.error("Delete travel photo error:", error);

        return res.status(500).json({
            message: "Travel photo deletion failed"
        });
    }
};

module.exports = {
    uploadTravelPhoto,
    getMyTravelPhotos,
    updateTravelPhoto,
    deleteTravelPhoto
};
