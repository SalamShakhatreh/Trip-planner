
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CountryDestinations = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/destinations?country=${encodeURIComponent(countryName)}`
        );

        setDestinations(response.data.destinations);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load destinations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [countryName]);

  if (loading) {
    return <p className="text-center">Loading destinations...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <section className="container py-5">
      <button
        type="button"
        className="back-home"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ←
      </button>

      <div className="section-heading text-center mb-5">
        <span className="eyebrow">
          EXPLORE {countryName.toUpperCase()}
        </span>

        <h1>Destinations in {countryName}</h1>

        <p>
          Discover places and experiences in {countryName}.
        </p>
      </div>

      {destinations.length === 0 ? (
        <p className="text-center">
          No destinations available in this country yet.
        </p>
      ) : (
        <div className="row g-4">
          {destinations.map((destination) => (
            <div className="col-md-6 col-lg-4" key={destination._id}>
              <div className="destination-card h-100">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="destination-image"
                />

                <div className="destination-content">
                  <h3>{destination.name}</h3>

                  <p>{destination.description}</p>

                  <div className="destination-footer">
                    <Link to={`/destinations/${destination._id}`}>
                      Explore →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CountryDestinations;
