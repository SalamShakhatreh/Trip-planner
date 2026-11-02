
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const DestinationDetails = () => {
  const { name: id } = useParams();

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
          `http://localhost:5000/api/destinations/${id}`
        );

        setDestination(response.data);

        try {
          const placesResponse = await axios.get(
            `http://localhost:5000/api/places?destination=${id}`
          );

          setPlaces(placesResponse.data.places);
        } catch (error) {
          setPlacesError(
            error.response?.data?.message ||
              "Failed to load popular places"
          );
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load destination"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center">Loading destination...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-danger">{error}</p>
    );
  }

  if (!destination) {
    return (
      <h2 className="text-center">Destination not found</h2>
    );
  }

  return (
    <section className="destination-details-section">
      <Link to="/" className="back-home">
        ←
      </Link>

      <div className="destination-details-heading">
        <span className="eyebrow">DISCOVER YOUR NEXT ADVENTURE</span>
        <h1>{destination.name}</h1>
        {destination.country && (
          <p>{destination.country.name}</p>
        )}
      </div>

      <div className="container">
        <img
          src={destination.image}
          alt={destination.name}
          className="destination-image"
        />

        <div className="destination-about">
          <h2>About this destination</h2>
          <p>{destination.description}</p>
        </div>

        <div className="destination-places">
          <h2>Popular Places</h2>

          {placesError ? (
            <p className="text-danger">{placesError}</p>
          ) : places.length === 0 ? (
            <p>
              No popular places available for this destination yet.
            </p>
          ) : (
            <div className="row g-4">
              {places.map((place) => (
                <div className="col-md-6 col-lg-4" key={place._id}>
                  <div className="destination-card h-100">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="destination-image"
                    />

                    <div className="destination-content">
                      <h3>{place.name}</h3>
                      <p>{place.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DestinationDetails;
