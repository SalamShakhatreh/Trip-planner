
const TravelPhoto = require("../models/TravelPhoto");
const cloudinary = require("../config/cloudinary");

const uploadTravelPhoto = async (req, res) => {
    try {
        const { title, description, country, city } = req.body;

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

        if (description && (typeof description !== "string" || description.length > 500)) {
            return res.status(400).json({
                message: "Description must be 500 characters or less"
            });
        }

        if (country && typeof country !== "string") {
            return res.status(400).json({
                message: "Invalid country"
            });
        }

        if (city && typeof city !== "string") {
            return res.status(400).json({
                message: "Invalid city"
            });
        }

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {
                folder: "trip-planner/travel-photos",
                resource_type: "image"
            }
        );

        try {
            const travelPhoto = await TravelPhoto.create({
                user: req.user.id,
                image: result.secure_url,
                public_id: result.public_id,
                title: title.trim(),
                description: description?.trim() || "",
                country: country?.trim() || "",
                city: city?.trim() || ""
            });

            return res.status(201).json({
                message: "Travel photo uploaded successfully",
                travelPhoto
            });

        } catch (error) {
            await cloudinary.uploader.destroy(result.public_id);
            throw error;
        }

    } catch (error) {
        console.error("Upload travel photo error:", error);

        return res.status(500).json({
            message: "Travel photo upload failed"
        });
    }
};

const getMyTravelPhotos = async (req, res) => {
    try {
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

        if (title !== undefined) {
            if (typeof title !== "string" || !title.trim() || title.trim().length > 100) {
                return res.status(400).json({
                    message: "Title is required and must be 100 characters or less"
                });
            }

            updates.title = title.trim();
        }

        if (description !== undefined) {
            if (typeof description !== "string" || description.length > 500) {
                return res.status(400).json({
                    message: "Description must be 500 characters or less"
                });
            }

            updates.description = description.trim();
        }

        if (country !== undefined) {
            if (typeof country !== "string") {
                return res.status(400).json({
                    message: "Invalid country"
                });
            }

            updates.country = country.trim();
        }

        if (city !== undefined) {
            if (typeof city !== "string") {
                return res.status(400).json({
                    message: "Invalid city"
                });
            }

            updates.city = city.trim();
        }

        const travelPhoto = await TravelPhoto.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            { $set: updates },
            { returnDocument: "after", runValidators: true }
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
        const travelPhoto = await TravelPhoto.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!travelPhoto) {
            return res.status(404).json({
                message: "Travel photo not found"
            });
        }

        await cloudinary.uploader.destroy(travelPhoto.public_id);

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
