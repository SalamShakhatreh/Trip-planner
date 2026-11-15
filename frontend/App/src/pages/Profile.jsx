
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api/profile";

const Profile = () => {
  const { token } = useAuth();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    location: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile({
          name: response.data.user.name || "",
          bio: response.data.user.bio || "",
          location: response.data.user.location || "",
          profileImage: response.data.user.profileImage || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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
        `${API_URL}/me/image`,
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
        `${API_URL}/me`,
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

  return (
    <section className="container profile-page">
      <div className="mb-4">
        <Link to="/" className="back-home">
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
    </section>
  );
};

export default Profile;
