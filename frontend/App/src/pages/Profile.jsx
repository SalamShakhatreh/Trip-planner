
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PROFILE_API = "http://localhost:5000/api/profile";
const TRIPS_API = "http://localhost:5000/api/trips";

const Profile = () => {
  const { token } = useAuth();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    location: "",
    profileImage: "",
  });

  const [trips, setTrips] = useState([]);

  const [stats, setStats] = useState({
    trips: 0,
    photos: null,
    savedPlaces: null,
    reviews: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const profileResponse = await axios.get(`${PROFILE_API}/me`, {
          headers,
        });

        const user = profileResponse.data.user;

        setProfile({
          name: user.name || "",
          bio: user.bio || "",
          location: user.location || "",
          profileImage: user.profileImage || "",
        });

        const tripsResponse = await axios.get(TRIPS_API, {
          headers,
          params: { limit: 100 },
        });

        const userTrips = tripsResponse.data.trips || [];

        setTrips(userTrips);

        setStats((prev) => ({
          ...prev,
          trips: tripsResponse.data.totalTrips ?? userTrips.length,
        }));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    setMessage("");
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await axios.post(
        `${PROFILE_API}/me/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile((prev) => ({
        ...prev,
        profileImage: response.data.user.profileImage || "",
      }));

      setMessage("Profile image updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    try {
      const response = await axios.put(
        `${PROFILE_API}/me`,
        {
          name: profile.name,
          bio: profile.bio,
          location: profile.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile((prev) => ({
        ...prev,
        ...response.data.user,
      }));

      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center py-5">Loading profile...</p>;
  }

  const profileStats = [
    { label: "Trips", value: stats.trips },
    { label: "Photos", value: stats.photos ?? "—" },
    { label: "Saved Places", value: stats.savedPlaces ?? "—" },
    { label: "Reviews", value: stats.reviews ?? "—" },
  ];

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="container profile-page">
      <div className="profile-back-wrapper">
        <Link to="/" className="back-home" aria-label="Back to home">
          ←
        </Link>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="profile-header">
        <div className="profile-header-top">
          <div className="profile-image-wrapper">
            <img
              src={
                profile.profileImage ||
                "https://placehold.co/150x150?text=Profile"
              }
              alt="Profile"
              className="profile-image"
            />

            <button
              type="button"
              className="profile-image-edit"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              aria-label="Change profile photo"
              title="Change profile photo"
            >
              {uploading ? (
                <span className="profile-upload-spinner"></span>
              ) : (
                "📷"
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImageUpload(e.target.files?.[0])}
            />
          </div>

          <div className="profile-header-info">
            <h2>{profile.name || "Your Name"}</h2>

            {profile.location && (
              <p className="profile-location">
                <span>📍</span> {profile.location}
              </p>
            )}

            <p className="profile-bio">
              {profile.bio || "Tell us a little about yourself..."}
            </p>
          </div>

          <button
            type="button"
            className="profile-edit-button"
            onClick={() => {
              setEditing((prev) => !prev);
              setMessage("");
              setError("");
            }}
          >
            {editing ? "Cancel" : "✏️ Edit Profile"}
          </button>
        </div>

        <div className="profile-stats">
          {profileStats.map((stat) => (
            <div className="profile-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        {editing && (
          <form className="profile-edit-form" onSubmit={handleSave}>
            <div className="mb-3">
              <label htmlFor="profile-name" className="form-label">
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                name="name"
                className="form-control"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="profile-bio" className="form-label">
                Bio
              </label>
              <textarea
                id="profile-bio"
                name="bio"
                className="form-control"
                rows="3"
                maxLength="160"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell us a little about yourself..."
              />
              <small className="text-muted">
                {profile.bio.length}/160 characters
              </small>
            </div>

            <div className="mb-3">
              <label htmlFor="profile-location" className="form-label">
                Location
              </label>
              <input
                id="profile-location"
                type="text"
                name="location"
                className="form-control"
                value={profile.location}
                onChange={handleChange}
                placeholder="Your city or country"
              />
            </div>

            <button
              type="submit"
              className="profile-save-button"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>

      <div className="profile-trips-section">
        <div className="profile-section-heading">
          <div>
            <h3>My Planned Trips</h3>
            <p>Your travel plans and upcoming adventures</p>
          </div>
        </div>

        {trips.length === 0 ? (
          <div className="profile-empty-state">
            <span>✈️</span>
            <h4>No trips yet</h4>
            <p>Start planning your next adventure!</p>
            <Link to="/" className="profile-plan-button">
              Plan a Trip
            </Link>
          </div>
        ) : (
          <div className="profile-trips-grid">
            {trips.map((trip) => {
              const place = trip.destination || trip.country;
              const image = place?.image;

              return (
                <div className="profile-trip-card" key={trip._id}>
                  <div className="profile-trip-image">
                    <img
                      src={
                        image ||
                        "https://placehold.co/600x400?text=Travel"
                      }
                      alt={place?.name || trip.title}
                    />

                    <span className={`profile-trip-status ${trip.status}`}>
                      {trip.status}
                    </span>
                  </div>

                  <div className="profile-trip-info">
                    <h4>{trip.title}</h4>

                    <p className="profile-trip-destination">
                      📍 {place?.name || "Destination not available"}
                    </p>

                    <div className="profile-trip-details">
                      <span>📅 {formatDate(trip.startDate)}</span>
                      <span>⏱️ {trip.duration} days</span>
                    </div>

                    <div className="profile-trip-budget">
                      {trip.budget} {trip.currency}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
