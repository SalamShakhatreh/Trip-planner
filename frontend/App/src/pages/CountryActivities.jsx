
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const categoryStyles = {
  Adventure: { icon: "⛰️", color: "adventure" },
  Culture: { icon: "🏛️", color: "culture" },
  Nature: { icon: "🌿", color: "nature" },
  Food: { icon: "🍽️", color: "food" },
  History: { icon: "🏺", color: "history" },
  Entertainment: { icon: "🎭", color: "entertainment" },
  Relaxation: { icon: "🌸", color: "relaxation" },
};

const CountryActivities = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `https://trip-planner-vyu6.onrender.com/api/activities?country=${encodeURIComponent(countryName)}`
        );

        setActivities(response.data.activities || []);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load activities"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [countryName]);

  if (loading) {
    return (
      <div className="activities-status">
        <p>Discovering experiences...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="activities-status error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="country-activities-page">
      <div className="activities-container">
        <button
          type="button"
          className="back-home"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>

        <header className="activities-heading">
          <span className="eyebrow">DISCOVER EXPERIENCES</span>
          <h1>Explore {countryName}</h1>
          <p>
            Find unforgettable experiences and discover what makes
            this country special.
          </p>
          <div className="activities-count">
            <span>{activities.length}</span>
            <span>Experiences to discover</span>
          </div>
        </header>

        {activities.length === 0 ? (
          <div className="no-activities">
            <h2>No activities available</h2>
            <p>We're preparing experiences for this country.</p>
          </div>
        ) : (
          <div className="activities-grid">
            {activities.map((activity, index) => {
              const style = categoryStyles[activity.category] || {
                icon: "✨",
                color: "default",
              };

              return (
                <article
                  className={`activity-card ${style.color}`}
                  key={activity._id}
                >
                  <div className="activity-card-header">
                    <div className="activity-category">
                      <span>{style.icon}</span>
                      {activity.category}
                    </div>

                    <span className="activity-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="activity-card-content">
                    <h2>{activity.name}</h2>

                    <p className="activity-description">
                      {activity.description}
                    </p>

                    <div className="activity-details">
                      <div className="activity-detail-section">
                        <h3>
                          <span>✦</span> What to Expect
                        </h3>

                        <ul>
                          {activity.whatToExpect.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="activity-detail-section highlights">
                        <h3>
                          <span>✧</span> Experience Highlights
                        </h3>

                        <div className="highlight-list">
                          {activity.highlights.map((highlight, itemIndex) => (
                            <span key={itemIndex}>{highlight}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {activity.bestTimeToVisit && (
                      <div className="best-time">
                        <span>☀️</span>
                        <div>
                          <small>BEST TIME TO VISIT</small>
                          <p>{activity.bestTimeToVisit}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CountryActivities;
