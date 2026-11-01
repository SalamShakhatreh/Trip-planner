
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ExploreCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/countries"
        );

        setCountries(response.data.countries);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load countries"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <p className="text-center py-5">Loading countries...</p>;
  }

  if (error) {
    return <p className="text-center text-danger py-5">{error}</p>;
  }

  return (
    <section className="container py-5 explore-countries-page">
      <button
        type="button"
        className="back-home"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ←
      </button>

      <div className="section-heading text-center mb-5">
        <span className="eyebrow">EXPLORE THE WORLD</span>
        <h1>Discover Countries</h1>
        <p>
          Choose a country and discover the destinations waiting for you.
        </p>
      </div>

      <div className="row g-4">
        {countries.map((country) => (
          <div className="col-md-6 col-lg-4" key={country._id}>
            <div className="destination-card h-100">
              <img
                src={country.image}
                alt={country.name}
                className="destination-image"
              />

              <div className="destination-content">
                <h3>{country.name}</h3>
                <p>{country.description}</p>

                <div className="destination-footer">
                  <Link to={`/countries/${country._id}/destinations`}>
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCountries;
