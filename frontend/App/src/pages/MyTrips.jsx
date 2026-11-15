
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyTrips = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:5000/api/trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load your trips.");
        }

        setTrips(data.trips || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTrips();
    } else {
      setLoading(false);
      setError("Please log in to view your trips.");
    }
  }, [token]);

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDestinationName = (trip) => {
    return (
      trip.country?.name ||
      trip.destination?.name ||
      "Unknown destination"
    );
  };

  return (
    <main className="my-trips-page">
      <style>{`
        .my-trips-page {
          min-height: 100vh;
          padding: 55px 7%;
          background: #f7f6fb;
          color: #29263d;
        }

        .my-trips-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .my-trips-heading {
          text-align: center;
          margin-bottom: 40px;
        }

        .my-trips-heading span {
          color: #8176c8;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .my-trips-heading h1 {
          font-size: clamp(30px, 5vw, 42px);
          margin: 12px 0;
        }

        .my-trips-heading p {
          color: #858195;
          line-height: 1.7;
        }

        .my-trips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          gap: 22px;
        }

        .my-trip-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 8px 30px rgba(40, 35, 75, 0.05);
          border: 1px solid #eeeaf4;
        }

        .my-trip-card h2 {
          font-size: 21px;
          margin: 0 0 8px;
        }

        .my-trip-destination {
          color: #8176c8;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .my-trip-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .my-trip-detail span {
          display: block;
          color: #858195;
          font-size: 12px;
          margin-bottom: 6px;
        }

        .my-trip-detail strong {
          font-size: 14px;
        }

        .my-trip-status {
          display: inline-block;
          padding: 7px 13px;
          border-radius: 20px;
          background: #eeeafd;
          color: #6258a8;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .my-trips-empty {
          text-align: center;
          background: white;
          padding: 55px 25px;
          border-radius: 16px;
        }

        .my-trips-empty h2 {
          margin-bottom: 10px;
        }

        .my-trips-empty p {
          color: #858195;
          margin-bottom: 22px;
        }

        .my-trips-button {
          border: none;
          border-radius: 10px;
          padding: 13px 22px;
          background: #7166b5;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .my-trips-button:hover {
          background: #5e53a1;
        }

        .my-trips-message {
          text-align: center;
          padding: 35px;
          color: #77748a;
        }

        .my-trips-error {
          background: #fff0f0;
          color: #b33d3d;
          padding: 15px;
          border-radius: 10px;
          text-align: center;
        }
      `}</style>

      <div className="my-trips-container">
        <header className="my-trips-heading">
          <span>YOUR TRAVEL COLLECTION</span>
          <h1>My Trips</h1>
          <p>
            All your saved adventures in one place. Your next journey starts
            here!
          </p>
        </header>

        {loading && (
          <div className="my-trips-message">
            Loading your trips...
          </div>
        )}

        {!loading && error && (
          <div className="my-trips-error">{error}</div>
        )}

        {!loading && !error && trips.length === 0 && (
          <div className="my-trips-empty">
            <h2>No trips yet!</h2>
            <p>
              You haven't saved any trips. Start planning your next adventure.
            </p>

            <button
              className="my-trips-button"
              onClick={() => navigate("/plan-trip")}
            >
              Plan a Trip
            </button>
          </div>
        )}

        {!loading && !error && trips.length > 0 && (
          <div className="my-trips-grid">
            {trips.map((trip) => (
              <article className="my-trip-card" key={trip._id}>
                <h2>{trip.title}</h2>

                <p className="my-trip-destination">
                  {getDestinationName(trip)}
                </p>

                <div className="my-trip-details">
                  <div className="my-trip-detail">
                    <span>START DATE</span>
                    <strong>{formatDate(trip.startDate)}</strong>
                  </div>

                  <div className="my-trip-detail">
                    <span>DURATION</span>
                    <strong>{trip.duration} days</strong>
                  </div>

                  <div className="my-trip-detail">
                    <span>BUDGET</span>
                    <strong>
                      {trip.budget} {trip.currency}
                    </strong>
                  </div>

                  <div className="my-trip-detail">
                    <span>TRAVELERS</span>
                    <strong>{trip.numberOfPeople}</strong>
                  </div>
                </div>

                <span className="my-trip-status">
                  {trip.status}
                </span>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyTrips;
