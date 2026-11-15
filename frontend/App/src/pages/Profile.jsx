import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PROFILE_API = "http://localhost:5000/api/profile";
const TRIPS_API = "http://localhost:5000/api/trips";
const PHOTOS_API = "http://localhost:5000/api/travel-photos";

const Profile = () => {
  const { token } = useAuth();
  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    location: "",
    profileImage: "",
  });

  const [trips, setTrips] = useState([]);
  const [photos, setPhotos] = useState([]);

  const [stats, setStats] = useState({
    trips: 0,
    photos: 0,
    savedPlaces: null,
    reviews: null,
  });

  const [photoForm, setPhotoForm] = useState({
    title: "",
    description: "",
    country: "",
    city: "",
    image: null,
  });

  const [editingPhotoId, setEditingPhotoId] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState({
    title: "",
    description: "",
    country: "",
    city: "",
  });

  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [activeSection, setActiveSection] = useState("trips");
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

        const photosResponse = await axios.get(PHOTOS_API, {
          headers,
        });

        const userPhotos = photosResponse.data.travelPhotos || [];

        setPhotos(userPhotos);

        setStats((prev) => ({
          ...prev,
          trips: tripsResponse.data.totalTrips ?? userTrips.length,
          photos: userPhotos.length,
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

  const handlePhotoFormChange = (e) => {
    const { name, value } = e.target;

    setPhotoForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();

    if (!photoForm.image) {
      setError("Please select a photo");
      return;
    }

    setMessage("");
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("image", photoForm.image);
      formData.append("title", photoForm.title);
      formData.append("description", photoForm.description);
      formData.append("country", photoForm.country);
      formData.append("city", photoForm.city);

      const response = await axios.post(PHOTOS_API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newPhoto = response.data.travelPhoto;

      setPhotos((prev) => [newPhoto, ...prev]);

      setStats((prev) => ({
        ...prev,
        photos: prev.photos + 1,
      }));

      setPhotoForm({
        title: "",
        description: "",
        country: "",
        city: "",
        image: null,
      });

      if (photoInputRef.current) {
        photoInputRef.current.value = "";
      }

      setShowPhotoForm(false);
      setMessage("Travel photo uploaded successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload travel photo");
    } finally {
      setUploading(false);
    }
  };

  const startEditingPhoto = (photo) => {
    setEditingPhotoId(photo._id);

    setEditingPhoto({
      title: photo.title || "",
      description: photo.description || "",
      country: photo.country || "",
      city: photo.city || "",
    });

    setMessage("");
    setError("");
  };

  const handleEditingPhotoChange = (e) => {
    const { name, value } = e.target;

    setEditingPhoto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePhoto = async (e, photoId) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      const response = await axios.put(
        `${PHOTOS_API}/${photoId}`,
        editingPhoto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPhotos((prev) =>
        prev.map((photo) =>
          photo._id === photoId ? response.data.travelPhoto : photo
        )
      );

      setEditingPhotoId(null);
      setMessage("Travel photo updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update travel photo");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      await axios.delete(`${PHOTOS_API}/${photoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPhotos((prev) => prev.filter((photo) => photo._id !== photoId));

      setStats((prev) => ({
        ...prev,
        photos: Math.max(0, prev.photos - 1),
      }));

      setMessage("Travel photo deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete travel photo");
    }
  };

  if (loading) {
    return <p className="text-center py-5">Loading profile...</p>;
  }

  const profileStats = [
    { label: "Trips", value: stats.trips },
    { label: "Photos", value: stats.photos },
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
          {profileStats.map((stat) =>
            stat.label === "Trips" || stat.label === "Photos" ? (
              <button
                type="button"
                className={`profile-stat profile-stat-button ${
                  activeSection === stat.label.toLowerCase() ? "active" : ""
                }`}
                key={stat.label}
                onClick={() => setActiveSection(stat.label.toLowerCase())}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </button>
            ) : (
              <div className="profile-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            )
          )}
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

      {activeSection === "trips" && (
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
      )}

      {activeSection === "photos" && (
        <div className="profile-photos-section">
          <div className="profile-section-heading">
            <div>
              <h3>My Travel Photos</h3>
              <p>Share your favorite travel moments</p>
            </div>

            <button
              type="button"
              className="profile-add-photo-button"
              onClick={() => {
                setShowPhotoForm((prev) => !prev);
                setMessage("");
                setError("");
              }}
            >
              {showPhotoForm ? "Cancel" : "+ Add Photo"}
            </button>
          </div>

          {showPhotoForm && (
            <form className="profile-photo-form" onSubmit={handlePhotoUpload}>
              <h4>Upload a Travel Photo</h4>

              <div className="mb-3">
                <label htmlFor="travel-photo-image" className="form-label">
                  Choose Photo
                </label>
                <input
                  ref={photoInputRef}
                  id="travel-photo-image"
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) =>
                    setPhotoForm((prev) => ({
                      ...prev,
                      image: e.target.files?.[0] || null,
                    }))
                  }
                  required
                />
                <small className="text-muted">
                  Maximum file size: 5MB
                </small>
              </div>

              <div className="mb-3">
                <label htmlFor="travel-photo-title" className="form-label">
                  Title
                </label>
                <input
                  id="travel-photo-title"
                  type="text"
                  name="title"
                  className="form-control"
                  value={photoForm.title}
                  onChange={handlePhotoFormChange}
                  maxLength="100"
                  placeholder="Give your photo a title"
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="travel-photo-description"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  id="travel-photo-description"
                  name="description"
                  className="form-control"
                  rows="3"
                  value={photoForm.description}
                  onChange={handlePhotoFormChange}
                  maxLength="500"
                  placeholder="Tell us about this moment..."
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="travel-photo-country" className="form-label">
                    Country
                  </label>
                  <input
                    id="travel-photo-country"
                    type="text"
                    name="country"
                    className="form-control"
                    value={photoForm.country}
                    onChange={handlePhotoFormChange}
                    placeholder="Country"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="travel-photo-city" className="form-label">
                    City
                  </label>
                  <input
                    id="travel-photo-city"
                    type="text"
                    name="city"
                    className="form-control"
                    value={photoForm.city}
                    onChange={handlePhotoFormChange}
                    placeholder="City"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="profile-save-button"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Photo"}
              </button>
            </form>
          )}

          {photos.length === 0 ? (
            <div className="profile-empty-state">
              <span>📸</span>
              <h4>No travel photos yet</h4>
              <p>Upload your first travel memory!</p>
            </div>
          ) : (
            <div className="profile-photos-grid">
              {photos.map((photo) => (
                <div className="profile-photo-card" key={photo._id}>
                  <div className="profile-photo-image">
                    <img src={photo.image} alt={photo.title} />
                  </div>

                  {editingPhotoId === photo._id ? (
                    <form
                      className="profile-photo-edit-form"
                      onSubmit={(e) => handleUpdatePhoto(e, photo._id)}
                    >
                      <div className="mb-2">
                        <label className="form-label">Title</label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          value={editingPhoto.title}
                          onChange={handleEditingPhotoChange}
                          maxLength="100"
                          required
                        />
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Description</label>
                        <textarea
                          name="description"
                          className="form-control"
                          rows="2"
                          value={editingPhoto.description}
                          onChange={handleEditingPhotoChange}
                          maxLength="500"
                        />
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          name="country"
                          className="form-control"
                          value={editingPhoto.country}
                          onChange={handleEditingPhotoChange}
                        />
                      </div>

                      <div className="mb-2">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control"
                          value={editingPhoto.city}
                          onChange={handleEditingPhotoChange}
                        />
                      </div>

                      <div className="profile-photo-actions">
                        <button
                          type="submit"
                          className="profile-save-button"
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Save"}
                        </button>

                        <button
                          type="button"
                          className="profile-cancel-button"
                          onClick={() => setEditingPhotoId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="profile-photo-info">
                      <h4>{photo.title}</h4>

                      {(photo.city || photo.country) && (
                        <p className="profile-photo-location">
                          📍 {[photo.city, photo.country]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      )}

                      {photo.description && (
                        <p className="profile-photo-description">
                          {photo.description}
                        </p>
                      )}

                      <div className="profile-photo-actions">
                        <button
                          type="button"
                          className="profile-photo-edit-button"
                          onClick={() => startEditingPhoto(photo)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="profile-photo-delete-button"
                          onClick={() => handleDeletePhoto(photo._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Profile;