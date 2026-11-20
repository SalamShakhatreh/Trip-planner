
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DestinationDetails.css";

const API_URL =
  import.meta.env.VITE_API_URL || "https://trip-planner-vyu6.onrender.com";

const DestinationDetails = () => {
  const { name: id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [placesError, setPlacesError] = useState("");

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      setLoading(true);
      setError("");
      setPlacesError("");
      setDestination(null);
      setPlaces([]);

      try {
        const response = await axios.get(
          `${API_URL}/api/destinations/${id}`
        );

        setDestination(response.data);

        try {
          const placesResponse = await axios.get(
            `${API_URL}/api/places?destination=${id}`
          );

          setPlaces(placesResponse.data.places || []);
        } catch (error) {
          setPlacesError(
            error.response?.data?.message ||
              "Failed to load popular places."
          );
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load destination."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id]);

  if (loading) {
    return (
      <section className="destination-details-page">
        <div className="destination-details-loading">
          <span className="destination-details-loader"></span>
          <p>Discovering this beautiful destination...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="destination-details-page">
        <div className="destination-details-message">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </section>
    );
  }

  if (!destination) {
    return (
      <section className="destination-details-page">
        <div className="destination-details-message">
          <h2>Destination not found</h2>
          <button onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </section>
    );
  }

  return (
    <main className="destination-details-page">
      <div className="destination-details-container">

        <button
          type="button"
          className="destination-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        <section className="destination-hero">
          <img
            src={destination.image}
            alt={destination.name}
            className="destination-hero-image"
          />

          <div className="destination-hero-overlay"></div>

          <div className="destination-hero-content">
            <span className="destination-hero-label">
              DISCOVER YOUR NEXT ADVENTURE
            </span>

            <h1>{destination.name}</h1>

            {destination.country?.name && (
              <p className="destination-hero-country">
                <span>✦</span>
                {destination.country.name}
              </p>
            )}

            <a
              href="#destination-about"
              className="destination-hero-button"
            >
              Discover More <span>↓</span>
            </a>
          </div>

          <div className="destination-hero-count">
            <strong>
              {String(places.length).padStart(2, "0")}
            </strong>
            <span>Places to discover</span>
          </div>
        </section>

        <section
          className="destination-about-section"
          id="destination-about"
        >
          <div className="destination-about-heading">
            <span className="destination-section-eyebrow">
              A PLACE TO REMEMBER
            </span>

            <h2>Discover {destination.name}</h2>
          </div>

          <div className="destination-about-content">
            <div className="destination-about-mark">“</div>

            <p>
              {destination.description ||
                `Discover the beauty, culture, and unforgettable experiences of ${destination.name}.`}
            </p>
          </div>
        </section>

        <section className="destination-places-section">
          <div className="destination-places-heading">
            <div>
              <span className="destination-section-eyebrow">
                EXPLORE THE HIGHLIGHTS
              </span>

              <h2>Popular Places</h2>

              <p>
                Discover the special places that make{" "}
                {destination.name} worth visiting.
              </p>
            </div>

            <div className="destination-places-count">
              <span>{places.length}</span>
              <span>
                {places.length === 1 ? "Place" : "Places"}
              </span>
            </div>
          </div>

          {placesError ? (
            <div className="destination-places-empty">
              <p>{placesError}</p>
            </div>
          ) : places.length === 0 ? (
            <div className="destination-places-empty">
              <span>✦</span>
              <h3>More places are coming soon</h3>
              <p>
                We are preparing beautiful places for you to discover
                in {destination.name}.
              </p>
            </div>
          ) : (
            <div className="destination-places-grid">
              {places.map((place, index) => (
                <article
                  className="destination-place-card"
                  key={place._id}
                >
                  <Link
                    to={`/places/${place._id}`}
                    className="destination-place-image-link"
                    aria-label={`Discover ${place.name}`}
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      className="destination-place-image"
                      loading={index > 2 ? "lazy" : "eager"}
                    />

                    <span className="destination-place-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="destination-place-arrow">
                      ↗
                    </span>
                  </Link>

                  <div className="destination-place-content">
                    <span className="destination-place-category">
                      {destination.name}
                    </span>

                    <h3>{place.name}</h3>

                    <p>
                      {place.description ||
                        `Discover ${place.name} and enjoy a memorable experience.`}
                    </p>

                    <Link
                      to={`/places/${place._id}`}
                      className="destination-place-explore"
                    >
                      Explore Place <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="destination-bottom-note">
          <span>YOUR JOURNEY, YOUR STORY</span>
          <h2>Beautiful places. Unforgettable memories.</h2>
          <p>
            Your next adventure in {destination.name} is waiting.
          </p>
        </section>

      </div>
    </main>
  );
};

export default DestinationDetails;
