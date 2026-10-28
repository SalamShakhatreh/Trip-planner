
const { GoogleGenAI, Type } = require("@google/genai");
const Conversation = require("../models/conversation");
const { createItinerary } = require("./chatbotController");

const MODELS = [
    "gemini-3.8-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash"
];

const MAX_RETRIES = 1;

const conversationSchema = {
    type: Type.OBJECT,
    properties: {
        reply: { type: Type.STRING },
        tripDetails: {
            type: Type.OBJECT,
            properties: {
                destination: { type: Type.STRING },
                duration: { type: Type.INTEGER },
                budget: { type: Type.NUMBER },
                currency: { type: Type.STRING },
                interests: { type: Type.STRING }
            },
            required: [
                "destination",
                "duration",
                "budget",
                "currency",
                "interests"
            ]
        },
        suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
    },
    required: ["reply", "tripDetails", "suggestions"]
};

const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const isOverloaded = (error) =>
    error.status === 503 ||
    error.status === 429 ||
    /UNAVAILABLE|high demand|RESOURCE_EXHAUSTED/i.test(
        error.message || ""
    );

const isModelUnavailable = (error) =>
    error.status === 404 ||
    /NOT_FOUND|no longer available/i.test(error.message || "");

const generateWithFallback = async (ai, prompt) => {
    let lastError;

    for (const model of MODELS) {
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const response = await ai.models.generateContent({
                    model,
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: conversationSchema
                    }
                });

                if (!response.text) {
                    throw new Error("The AI returned an empty response");
                }

                return JSON.parse(response.text);
            } catch (error) {
                lastError = error;

                console.error(
                    `[${model}] attempt ${attempt} failed:`,
                    error.message
                );

                if (isModelUnavailable(error)) break;

                if (!isOverloaded(error)) throw error;

                if (attempt < MAX_RETRIES) {
                    await sleep(1000 * 2 ** (attempt - 1));
                }
            }
        }
    }

    throw lastError;
};

const getAI = () => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured");
    }

    return new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });
};

const getConversationResponse = async (messages, existingDetails = {}) => {
    const prompt = `
You are a friendly travel-planning assistant.

Read the entire conversation and the existing trip details.

Existing trip details:
${JSON.stringify(existingDetails)}

Conversation:
${JSON.stringify(messages)}

Collect these details:
- destination
- duration in whole days
- total budget as a positive number
- currency: JOD, USD, or EUR
- interests and travel preferences

Rules:
1. Preserve information the user has already provided.
2. Only update a detail when the user clearly provides or changes it.
3. Never invent the user's budget or trip duration.
4. If the user asks for destination recommendations and has no destination,
   suggest 3 suitable destinations based on their interests and known budget.
5. Put those destination names in the suggestions array.
6. Ask the user to choose one of the suggested destinations.
7. Do not set destination to a suggested destination until the user chooses it.
8. If the budget is unknown, ask for it naturally when appropriate.
9. Ask one useful follow-up question at a time.
10. Do not ask for information that is already known.
11. If all required details are known, say that you have enough information
    to prepare the itinerary.
12. Unknown destination and interests must be empty strings.
    Unknown duration and budget must be 0.
13. Use USD when the user has not specified a currency.
14. If the user selects a destination from your previous suggestions,
    save that destination.
15. Return only the JSON matching the requested schema.

The suggestions array should be empty unless destination recommendations
are useful at this point in the conversation.
`;

    return generateWithFallback(getAI(), prompt);
};

const mergeTripDetails = (existing = {}, incoming = {}) => {
    const merged = { ...existing };

    if (
        typeof incoming.destination === "string" &&
        incoming.destination.trim()
    ) {
        merged.destination = incoming.destination.trim();
    }

    if (
        Number.isInteger(incoming.duration) &&
        incoming.duration > 0
    ) {
        merged.duration = incoming.duration;
    }

    if (
        Number.isFinite(incoming.budget) &&
        incoming.budget > 0
    ) {
        merged.budget = incoming.budget;
    }

    if (
        typeof incoming.currency === "string" &&
        ["USD", "EUR", "JOD"].includes(incoming.currency.toUpperCase())
    ) {
        merged.currency = incoming.currency.toUpperCase();
    }

    if (
        typeof incoming.interests === "string" &&
        incoming.interests.trim()
    ) {
        merged.interests = incoming.interests.trim();
    }

    return merged;
};

const getMissingDetails = (details) => {
    const missing = [];

    if (
        typeof details.destination !== "string" ||
        !details.destination.trim()
    ) {
        missing.push("destination");
    }

    if (
        !Number.isInteger(Number(details.duration)) ||
        Number(details.duration) < 1
    ) {
        missing.push("duration");
    }

    if (
        !Number.isFinite(Number(details.budget)) ||
        Number(details.budget) <= 0
    ) {
        missing.push("budget");
    }

    if (
        typeof details.interests !== "string" ||
        !details.interests.trim()
    ) {
        missing.push("interests");
    }

    return missing;
};

const startConversation = async (req, res) => {
    try {
        const { message } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                message: "Please provide a message"
            });
        }

        const conversation = await Conversation.create({
            user: req.user.id,
            messages: [
                {
                    role: "user",
                    content: message.trim()
                }
            ],
            tripDetails: {
                currency: "USD"
            }
        });

        const aiResponse = await getConversationResponse(
            conversation.messages.map(({ role, content }) => ({
                role,
                content
            })),
            conversation.tripDetails.toObject()
        );

        conversation.tripDetails = mergeTripDetails(
            conversation.tripDetails.toObject(),
            aiResponse.tripDetails
        );

        conversation.messages.push({
            role: "assistant",
            content: aiResponse.reply
        });

        await conversation.save();

        return res.status(201).json({
            message: aiResponse.reply,
            suggestions: aiResponse.suggestions || [],
            conversation
        });
    } catch (error) {
        console.error("Start conversation error:", error.message);

        if (isOverloaded(error)) {
            return res.status(503).json({
                message: "The AI service is busy. Please try again shortly."
            });
        }

        return res.status(500).json({
            message: "Failed to start conversation"
        });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { message } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                message: "Please provide a message"
            });
        }

        const conversation = await Conversation.findOne({
            _id: conversationId,
            user: req.user.id
        });

        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found"
            });
        }

        if (conversation.status === "completed") {
            return res.status(400).json({
                message: "This conversation is already completed"
            });
        }

        const userMessage = message.trim();

        // Prevent an immediate accidental duplicate submission.
        const lastMessage =
            conversation.messages[conversation.messages.length - 1];

        if (
            lastMessage?.role === "user" &&
            lastMessage.content === userMessage
        ) {
            return res.status(409).json({
                message: "This message is already being processed."
            });
        }

        conversation.messages.push({
            role: "user",
            content: userMessage
        });

        const aiResponse = await getConversationResponse(
            conversation.messages.map(({ role, content }) => ({
                role,
                content
            })),
            conversation.tripDetails.toObject()
        );

        conversation.tripDetails = mergeTripDetails(
            conversation.tripDetails.toObject(),
            aiResponse.tripDetails
        );

        const details = conversation.tripDetails.toObject();
        const missingDetails = getMissingDetails(details);

        if (missingDetails.length > 0) {
            conversation.messages.push({
                role: "assistant",
                content: aiResponse.reply
            });

            await conversation.save();

            return res.status(200).json({
                message: aiResponse.reply,
                suggestions: aiResponse.suggestions || [],
                conversation
            });
        }

        const itinerary = await createItinerary({
            destination: details.destination,
            duration: Number(details.duration),
            budget: Number(details.budget),
            interests: details.interests,
            currency: details.currency || "USD"
        });

        conversation.itinerary = itinerary;

        const assistantMessage =
            `Here is your ${details.duration}-day itinerary for ${details.destination}.`;

        conversation.messages.push({
            role: "assistant",
            content: assistantMessage
        });

        conversation.status = "completed";

        await conversation.save();

        return res.status(200).json({
            message: assistantMessage,
            itinerary,
            conversation
        });
    } catch (error) {
        console.error("Send message error:", error.message);

        if (isOverloaded(error)) {
            return res.status(503).json({
                message: "The AI service is busy. Please try again shortly."
            });
        }

        return res.status(500).json({
            message: "Failed to process your message"
        });
    }
};

const getUserConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            user: req.user.id
        }).sort({ updatedAt: -1 });

        return res.status(200).json({ conversations });
    } catch (error) {
        console.error("Get conversations error:", error.message);

        return res.status(500).json({
            message: "Failed to fetch conversations"
        });
    }
};

module.exports = {
    startConversation,
    sendMessage,
    getUserConversations
};
