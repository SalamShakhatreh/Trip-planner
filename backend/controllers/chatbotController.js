const { GoogleGenAI, Type } = require("@google/genai");

const MODELS = [
    "gemini-3.8-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash"
];
const MAX_RETRIES = 1;

const periodSchema = {
    type: Type.OBJECT,
    properties: {
        activity: { type: Type.STRING },
        description: { type: Type.STRING },
        estimatedCost: { type: Type.NUMBER }
    },
    required: ["activity", "description", "estimatedCost"]
};

const itinerarySchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        destination: { type: Type.STRING },
        currency: { type: Type.STRING },
        totalEstimatedCost: { type: Type.NUMBER },
        days: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    theme: { type: Type.STRING },
                    morning: periodSchema,
                    afternoon: periodSchema,
                    evening: periodSchema,
                    dailyCost: { type: Type.NUMBER }
                },
                required: ["day", "theme", "morning", "afternoon", "evening", "dailyCost"]
            }
        },
        tips: { type: Type.ARRAY, items: { type: Type.STRING } },
        disclaimer: { type: Type.STRING }
    },
    required: ["title", "destination", "currency", "totalEstimatedCost", "days", "tips", "disclaimer"]
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isOverloaded = (error) =>
    error.status === 503 ||
    error.status === 429 ||
    /UNAVAILABLE|high demand|RESOURCE_EXHAUSTED/i.test(error.message || "");

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
                        responseSchema: itinerarySchema
                    }
                });
                return response.text;
            } catch (error) {
                lastError = error;
                console.error(`[${model}] attempt ${attempt} failed:`, error.message);

                if (isModelUnavailable(error)) break;
                if (!isOverloaded(error)) throw error;
                if (attempt < MAX_RETRIES) await sleep(1000 * 2 ** (attempt - 1));
            }
        }
    }

    throw lastError;
};


const calculateItineraryCosts = (itinerary) => {
    let totalEstimatedCost = 0;

    itinerary.days.forEach((day, index) => {
        day.day = index + 1;

        day.dailyCost = Number((
            Number(day.morning.estimatedCost) +
            Number(day.afternoon.estimatedCost) +
            Number(day.evening.estimatedCost)
        ).toFixed(2));

        totalEstimatedCost += day.dailyCost;
    });

    itinerary.totalEstimatedCost = Number(totalEstimatedCost.toFixed(2));

    return itinerary;
};

const validateItinerary = (itinerary, duration, budget) => {
    if (itinerary.days.length !== Number(duration)) {
        throw new Error("INVALID_ITINERARY_DURATION");
    }

    if (itinerary.totalEstimatedCost > Number(budget)) {
        throw new Error("ITINERARY_EXCEEDS_BUDGET");
    }

    return itinerary;
};


const createItinerary = async ({
    destination,
    duration,
    budget,
    interests,
    currency
}) => {
    const tripCurrency = currency || "USD";

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const prompt = `
Create a practical travel itinerary for ${destination}.
Trip duration: ${duration} days.
Total budget: ${budget} ${tripCurrency}.
Interests: ${interests}.

Return exactly ${duration} days. Each day must have a morning, afternoon, and evening activity.
All costs must be numbers in ${tripCurrency}. The total estimated cost must not exceed the budget.
In the disclaimer, state that activities and prices are suggestions, not guaranteed live prices.
`;

   const text = await generateWithFallback(ai, prompt);
const itinerary = JSON.parse(text);

return validateItinerary(
    calculateItineraryCosts(itinerary),
    duration,
    budget
);
};

const generateItinerary = async (req, res) => {
    try {
        const { destination, duration, budget, interests, currency } = req.body;

        if (
    !destination ||
    duration === undefined ||
    duration === null ||
    duration === "" ||
    budget === undefined ||
    budget === null ||
    budget === "" ||
    !interests
) {
    return res.status(400).json({
        message: "Please provide destination, duration, budget, and interests"
    });
}

        if (
            !Number.isInteger(Number(duration)) ||
            Number(duration) < 1 ||
            !Number.isFinite(Number(budget)) ||
            Number(budget) <= 0
        ) {
            return res.status(400).json({
                message: "Duration must be at least 1 day and budget must be greater than 0"
            });
        }

        const tripCurrency = currency || "USD";

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const prompt = `
Create a practical travel itinerary for ${destination}.
Trip duration: ${duration} days.
Total budget: ${budget} ${tripCurrency}.
Interests: ${interests}.

Return exactly ${duration} days. Each day must have a morning, afternoon, and evening activity.
All costs must be numbers in ${tripCurrency}. The total estimated cost must not exceed the budget.
In the disclaimer, state that activities and prices are suggestions, not guaranteed live prices.
`;

        const text = await generateWithFallback(ai, prompt);

        let itinerary;
        try {
            itinerary = validateItinerary(
    calculateItineraryCosts(JSON.parse(text)),
    duration,
    budget
);
        } catch (parseError) {
            console.error("Invalid JSON from model:", text);
            return res.status(502).json({
                message: "The AI returned an invalid response, please try again"
            });
        }

        res.status(200).json({ itinerary });
    } catch (error) {
        console.error("Chatbot error:", error);

        if (error.message === "INVALID_ITINERARY_DURATION") {
    return res.status(502).json({
        message: "The AI returned an itinerary with an incorrect number of days. Please try again."
    });
}

if (error.message === "ITINERARY_EXCEEDS_BUDGET") {
    return res.status(502).json({
        message: "The AI returned an itinerary that exceeds your budget. Please try again."
    });
}

        if (isOverloaded(error)) {
            return res.status(503).json({
                message: "The AI service is busy right now, please try again in a minute."
            });
        }

        res.status(500).json({
            message: "Failed to generate itinerary"
        });
    }
};

module.exports = { generateItinerary, createItinerary };