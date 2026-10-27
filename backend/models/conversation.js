const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        messages: [
            {
                role: {
                    type: String,
                    enum: ["user", "assistant"],
                    required: true
                },
                content: {
                    type: String,
                    required: true
                }
            }
        ],

        tripDetails: {
            destination: {
                type: String,
                default: ""
            },
            duration: {
                type: Number,
                default: null
            },
            budget: {
                type: Number,
                default: null
            },
            currency: {
                type: String,
                default: "USD"
            },
            interests: {
                type: String,
                default: ""
            }
        },
        itinerary: {
    type: mongoose.Schema.Types.Mixed,
    default: null
},

        status: {
            type: String,
            enum: ["collecting", "ready", "completed"],
            default: "collecting"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);