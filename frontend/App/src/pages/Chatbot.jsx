
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const interestOptions = [
  "Adventure",
  "Nature",
  "History",
  "Culture",
  "Food",
  "Shopping",
  "Relaxation",
  "Nightlife",
  "Beaches",
  "Photography",
];

const Chatbot = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const tripData = location.state || {};

  const [destination, setDestination] = useState(
    tripData.destination || ""
  );
  const [duration] = useState(tripData.duration || 5);
  const [budget] = useState(tripData.budget || 1000);
  const [travelers] = useState(tripData.travelers || 1);
  const [budgetType] = useState(tripData.budgetType || "person");

  const [interests, setInterests] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInterestChange = (interest) => {
    setInterests((previous) =>
      previous.includes(interest)
        ? previous.filter((item) => item !== interest)
        : [...previous, interest]
    );
  };

  const handleGenerateItinerary = async () => {
    if (!destination.trim()) {
      setError("Please enter your destination first.");
      return;
    }

    if (interests.length === 0) {
      setError("Please choose at least one interest.");
      return;
    }

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setItinerary(null);

      const response = await fetch(
        "https://trip-planner-vyu6.onrender.com/api/chatbot/itinerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            destination,
            duration,
            budget,
            interests,
            currency: "USD",
            travelers,
            budgetType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Failed to generate your itinerary."
        );
      }

      setItinerary(data.itinerary);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderPeriod = (title, period) => {
    if (!period) return null;

    return (
      <div className="chatbot-period">
        <h4>{title}</h4>
        <h5>{period.activity}</h5>
        <p>{period.description}</p>

        {period.estimatedCost !== undefined && (
          <span className="chatbot-cost">
            Estimated cost: ${period.estimatedCost}
          </span>
        )}
      </div>
    );
  };

  return (
    <main className="chatbot-page">
      <style>{`
        .chatbot-page {
          min-height: 100vh;
          padding: 50px 7%;
          background: #f7f6fb;
          color: #29263d;
          font-family: inherit;
        }

        .chatbot-container {
          max-width: 1050px;
          margin: 0 auto;
        }

        .chatbot-back {
          border: none;
          background: transparent;
          color: #6258a8;
          font-size: 15px;
          cursor: pointer;
          margin-bottom: 28px;
        }

        .chatbot-heading {
          text-align: center;
          margin-bottom: 35px;
        }

        .chatbot-heading span {
          color: #8176c8;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .chatbot-heading h1 {
          font-size: clamp(30px, 5vw, 44px);
          margin: 12px 0;
        }

        .chatbot-heading p {
          color: #77748a;
          line-height: 1.7;
        }

        .chatbot-panel {
          background: white;
          padding: 30px;
          border-radius: 18px;
          margin-bottom: 24px;
          box-shadow: 0 8px 30px rgba(40, 35, 75, 0.05);
        }

        .chatbot-panel h2 {
          font-size: 21px;
          margin: 0 0 8px;
        }

        .chatbot-description {
          color: #858195;
          font-size: 14px;
          margin: 0 0 22px;
        }

        .chatbot-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #dedbea;
          border-radius: 10px;
          font-size: 15px;
          box-sizing: border-box;
          outline: none;
        }

        .chatbot-input:focus {
          border-color: #8176c8;
        }

        .chatbot-trip-info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .chatbot-info-item {
          background: #f7f6fb;
          border-radius: 12px;
          padding: 17px;
        }

        .chatbot-info-item span {
          display: block;
          color: #858195;
          font-size: 12px;
          margin-bottom: 8px;
        }

        .chatbot-info-item strong {
          font-size: 17px;
        }

        .chatbot-interests {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .chatbot-interest {
          border: 1px solid #dedbea;
          border-radius: 25px;
          padding: 10px 17px;
          background: white;
          color: #625d75;
          cursor: pointer;
          transition: 0.2s;
        }

        .chatbot-interest.selected {
          background: #eeeafd;
          color: #6258a8;
          border-color: #8176c8;
        }

        .chatbot-generate {
          width: 100%;
          border: none;
          border-radius: 12px;
          padding: 16px;
          background: #7166b5;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .chatbot-generate:hover {
          background: #5e53a1;
        }

        .chatbot-generate:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .chatbot-error {
          padding: 13px 16px;
          border-radius: 10px;
          background: #fff0f0;
          color: #b33d3d;
          margin-bottom: 18px;
          font-size: 14px;
        }

        .chatbot-loading {
          text-align: center;
          padding: 30px;
          color: #7166b5;
        }

        .chatbot-day {
          border: 1px solid #e9e6f2;
          border-radius: 14px;
          padding: 22px;
          margin-top: 18px;
        }

        .chatbot-day h3 {
          margin: 0 0 6px;
          color: #6258a8;
        }

        .chatbot-day-theme {
          color: #858195;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .chatbot-period {
          padding: 15px 0;
          border-top: 1px solid #eeeaf4;
        }

        .chatbot-period h4 {
          color: #8176c8;
          font-size: 13px;
          margin: 0 0 8px;
          text-transform: uppercase;
        }

        .chatbot-period h5 {
          font-size: 16px;
          margin: 0 0 7px;
        }

        .chatbot-period p {
          color: #77748a;
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 8px;
        }

        .chatbot-cost {
          color: #6258a8;
          font-size: 13px;
          font-weight: 600;
        }

        .chatbot-total {
          background: #eeeafd;
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .chatbot-total strong {
          color: #6258a8;
          font-size: 22px;
        }

        .chatbot-tips {
          padding-left: 22px;
          color: #77748a;
          line-height: 1.8;
        }

        .chatbot-disclaimer {
          color: #858195;
          font-size: 13px;
          line-height: 1.7;
          margin-top: 20px;
        }

        @media (max-width: 650px) {
          .chatbot-page {
            padding: 30px 5%;
          }

          .chatbot-panel {
            padding: 22px;
          }

          .chatbot-trip-info {
            grid-template-columns: 1fr;
          }

          .chatbot-total {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="chatbot-container">
        <button
          type="button"
          className="chatbot-back"
          onClick={() => navigate("/plan-trip")}
        >
          ← Back to trip planner
        </button>

        <header className="chatbot-heading">
          <span>YOUR PERSONAL TRIP ASSISTANT</span>
          <h1>Let's plan your adventure.</h1>
          <p>
            Tell us what you enjoy, and we'll create a day-by-day itinerary
            for your trip.
          </p>
        </header>

        <section className="chatbot-panel">
          <h2>Your trip details</h2>
          <p className="chatbot-description">
            These details were transferred from your trip planner.
          </p>

          <div className="chatbot-trip-info">
            <div className="chatbot-info-item">
              <span>DESTINATION</span>
              <strong>{destination || "Not selected"}</strong>
            </div>

            <div className="chatbot-info-item">
              <span>DURATION</span>
              <strong>{duration} days</strong>
            </div>

            <div className="chatbot-info-item">
              <span>TRAVELERS</span>
              <strong>{travelers}</strong>
            </div>

            <div className="chatbot-info-item">
              <span>BUDGET</span>
              <strong>
                ${budget.toLocaleString()} /{" "}
                {budgetType === "person" ? "person" : "group"}
              </strong>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <label htmlFor="chatbot-destination">
              <strong>Destination</strong>
            </label>

            <input
              id="chatbot-destination"
              className="chatbot-input"
              style={{ marginTop: 10 }}
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination..."
            />
          </div>
        </section>

        <section className="chatbot-panel">
          <h2>What are you interested in?</h2>
          <p className="chatbot-description">
            Choose the activities and experiences you'd like to include.
          </p>

          <div className="chatbot-interests">
            {interestOptions.map((interest) => (
              <button
                type="button"
                key={interest}
                className={`chatbot-interest ${
                  interests.includes(interest) ? "selected" : ""
                }`}
                onClick={() => handleInterestChange(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </section>

        {error && <div className="chatbot-error">{error}</div>}

        <button
          type="button"
          className="chatbot-generate"
          onClick={handleGenerateItinerary}
          disabled={loading}
        >
          {loading ? "Creating your itinerary..." : "Generate my itinerary ✦"}
        </button>

        {loading && (
          <div className="chatbot-loading">
            Your personal itinerary is being prepared. Please wait...
          </div>
        )}

        {itinerary && (
          <section className="chatbot-panel" style={{ marginTop: 30 }}>
            <div className="chatbot-heading">
              <span>YOUR PERSONALIZED PLAN</span>
              <h2>{itinerary.title || "Your Trip Itinerary"}</h2>
              <p>{itinerary.destination || destination}</p>
            </div>

            {Array.isArray(itinerary.days) &&
              itinerary.days.map((day, index) => (
                <article className="chatbot-day" key={index}>
                  <h3>Day {day.day || index + 1}</h3>

                  {day.theme && (
                    <p className="chatbot-day-theme">{day.theme}</p>
                  )}

                  {renderPeriod("Morning", day.morning)}
                  {renderPeriod("Afternoon", day.afternoon)}
                  {renderPeriod("Evening", day.evening)}

                  {day.dailyCost !== undefined && (
                    <div className="chatbot-cost">
                      Daily estimated cost: ${day.dailyCost}
                    </div>
                  )}
                </article>
              ))}

            {itinerary.totalEstimatedCost !== undefined && (
              <div className="chatbot-total">
                <span>Total estimated trip cost</span>
                <strong>
                  {itinerary.currency || "USD"}{" "}
                  {itinerary.totalEstimatedCost}
                </strong>
              </div>
            )}

            {Array.isArray(itinerary.tips) &&
              itinerary.tips.length > 0 && (
                <div style={{ marginTop: 25 }}>
                  <h3>Travel tips</h3>
                  <ul className="chatbot-tips">
                    {itinerary.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

            {itinerary.disclaimer && (
              <p className="chatbot-disclaimer">
                {itinerary.disclaimer}
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default Chatbot;
