
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://trip-planner-vyu6.onrender.com";

const CountryDestinations = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [country, setCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      setError("");

      try {
        const [destinationsResponse, countriesResponse] = await Promise.all([
          axios.get(
            `${API_URL}/api/destinations?country=${encodeURIComponent(countryName)}`
          ),
          axios.get(`${API_URL}/api/countries`),
        ]);

        setDestinations(destinationsResponse.data.destinations || []);

        const selectedCountry = (
          countriesResponse.data.countries || []
        ).find(
          (item) =>
            item.name.toLowerCase() === countryName.toLowerCase()
        );

        setCountry(selectedCountry || null);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load destinations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [countryName]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) =>
      destination.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }, [destinations, searchTerm]);

  if (loading) {
    return (
      <section className="country-destinations-page">
        <div className="destinations-loading">
          <span className="destinations-loader"></span>
          <p>Discovering beautiful places...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="country-destinations-page">
        <div className="container">
          <p className="destinations-error">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <main className="country-destinations-page">
      <div className="country-destinations-container">
        <button
          type="button"
          className="country-page-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>

        <section className="country-hero">
          {country?.image && (
            <img
              src={country.image}
              alt={country.name}
              className="country-hero-image"
            />
          )}

          <div className="country-hero-overlay"></div>

          <div className="country-hero-content">
            <span className="country-hero-label">
              YOUR NEXT JOURNEY BEGINS HERE
            </span>

            <h1>{countryName}</h1>

            <p>
              {country?.description ||
                `Discover the beautiful destinations and unforgettable experiences of ${countryName}.`}
            </p>

            <a href="#country-cities" className="country-hero-button">
              Discover Cities <span>↓</span>
            </a>
          </div>

          <div className="country-hero-count">
            <strong>{destinations.length}</strong>
            <span>Cities to explore</span>
          </div>
        </section>

        <section className="country-cities-section" id="country-cities">
          <div className="country-cities-heading">
            <div>
              <span className="country-section-eyebrow">
                FIND YOUR NEXT STOP
              </span>

              <h2>Explore the Cities</h2>

              <p>
                From hidden gems to unforgettable landmarks, find the places
                that make {countryName} special.
              </p>
            </div>
          </div>

          <div className="country-cities-toolbar">
            <div className="country-search-box">
              <span className="country-search-icon">⌕</span>

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search for a city..."
                aria-label="Search destinations"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <span className="country-results-count">
              Showing {filteredDestinations.length} of {destinations.length}
            </span>
          </div>

          {destinations.length === 0 ? (
            <div className="country-empty-state">
              <span>✦</span>
              <h3>New places are coming soon</h3>
              <p>
                We are preparing more destinations in {countryName}.
              </p>
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="country-empty-state">
              <span>⌕</span>
              <h3>No cities found</h3>
              <p>Try searching with another city name.</p>
            </div>
          ) : (
            <div className="country-cities-grid">
              {filteredDestinations.map((destination, index) => (
                <article
                  className="country-city-card"
                  key={destination._id}
                >
                  <Link
                    to={`/destinations/${destination._id}`}
                    className="country-city-image-link"
                    aria-label={`Explore ${destination.name}`}
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="country-city-image"
                      loading={index > 2 ? "lazy" : "eager"}
                    />

                    <span className="country-city-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="country-city-image-arrow">↗</span>
                  </Link>

                  <div className="country-city-content">
                    <span className="country-city-country">
                      {countryName}
                    </span>

                    <h3>{destination.name}</h3>

                    <p>
                      {destination.description ||
                        `Discover the beauty and experiences of ${destination.name}.`}
                    </p>

                    <Link
                      to={`/destinations/${destination._id}`}
                      className="country-city-explore"
                    >
                      Explore destination <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="country-bottom-note">
          <span>THE WORLD IS WAITING</span>
          <h2>Every city has a story.</h2>
          <p>Find yours in {countryName}.</p>
        </section>
      </div>
    </main>
  );
};

export default CountryDestinations;
