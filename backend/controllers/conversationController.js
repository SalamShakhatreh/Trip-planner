const Conversation = require("../models/conversation");
const { createItinerary } = require("./chatbotController");

const extractTripDetails = (message) => {
    const details = {};

    const destinationMatch = message.match(
        /(?:visit|travel to|go to)\s+([a-zA-Z\s]+?)(?=\s+for\b|\s+with\b|[,.!?]|$)/i
    );

    const durationMatch = message.match(/(\d+)\s+days?/i);

   const budgetMatch = message.match(
    /(?:budget(?:\s+(?:of|is))?|spend)\s+(\d+(?:\.\d+)?)\s*(USD|EUR|JOD|dollars?|euros?|dinars?|JD|€|\$)?/i
);

    if (destinationMatch) {
        details.destination = destinationMatch[1].trim();
    }

    if (durationMatch) {
        details.duration = Number(durationMatch[1]);
    }

    if (budgetMatch) {
        details.budget = Number(budgetMatch[1]);

        const currency = budgetMatch[2]?.toLowerCase();

        if (["eur", "euro", "euros", "€"].includes(currency)) {
            details.currency = "EUR";
        } else if (
            ["jod", "jd", "dinar", "dinars"].includes(currency)
        ) {
            details.currency = "JOD";
        } else if (
            ["usd", "dollar", "dollars", "$"].includes(currency)
        ) {
            details.currency = "USD";
        }
    }

    const interestMatch = message.match(
        /(?:interested in|interests? (?:are|include)|I like|I love|enjoy)\s+(.+?)(?:[.!?]|$)/i
    );

    if (interestMatch) {
        details.interests = interestMatch[1].trim();
    }

    return details;
};

const startConversation = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Please provide a message"
            });
        }

        const userMessage = message.trim();
const extractedDetails = extractTripDetails(userMessage);

const conversation = await Conversation.create({
    user: req.user.id,
    messages: [
        {
            role: "user",
            content: userMessage
        }
    ],
    tripDetails: extractedDetails
});

        res.status(201).json({
            message: "Conversation started successfully",
            conversation
        });
    } catch (error) {
        console.error("Start conversation error:", error.message);

        res.status(500).json({
            message: "Failed to start conversation"
        });
    }
};


const sendMessage = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { message } = req.body;

        if (!message || !message.trim()) {
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

       const userMessage = message.trim();

conversation.messages.push({
    role: "user",
    content: userMessage
});

const extractedDetails = extractTripDetails(userMessage);

conversation.tripDetails = {
    ...conversation.tripDetails.toObject(),
    ...extractedDetails
};

await conversation.save();
const { destination, duration, budget, interests } =
    conversation.tripDetails;

const missingDetails = [];

if (!destination) missingDetails.push("destination");
if (!duration) missingDetails.push("duration");
if (!budget) missingDetails.push("budget");
if (!interests) missingDetails.push("interests");

if (missingDetails.length > 0) {
    const questions = {
        destination: "Which destination would you like to visit?",
        duration: "How many days will your trip last?",
        budget: "What is your total trip budget?",
        interests: "What activities do you enjoy, such as history, food, or nature?"
    };

    const assistantMessage = questions[missingDetails[0]];

    conversation.messages.push({
        role: "assistant",
        content: assistantMessage
    });

    await conversation.save();

    return res.status(200).json({
        message: assistantMessage,
        conversation
    });
}

       const itinerary = await createItinerary({
    destination,
    duration,
    budget,
    interests,
    currency: conversation.tripDetails.currency
});

conversation.itinerary = itinerary;

conversation.messages.push({
    role: "assistant",
    content: `Here is your ${duration}-day itinerary for ${destination}.`
});

conversation.status = "completed";

await conversation.save();

return res.status(200).json({
    message: "Itinerary generated successfully",
    itinerary,
    conversation
});
    } catch (error) {
        console.error("Send message error:", error.message);

        res.status(500).json({
            message: "Failed to send message"
        });
    }
};

module.exports = { startConversation, sendMessage };