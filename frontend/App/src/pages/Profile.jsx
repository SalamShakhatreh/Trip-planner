
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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

      const response = await axios.post(`${API_URL}/me/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        },
      );

      setProfile((prev) => ({
        ...prev,
        ...response.data.user,
      }));

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
    <section className="container py-5 profile-page">
      <div className="mb-4">
        <Link to="/" className="back-home">
          ←
        </Link>
      </div>

      <div
        className="card shadow-sm border-0 mx-auto profile-card"
        style={{ maxWidth: "650px" }}
      >
        <div className="card-body p-4 p-md-5">
          <h2 className="fw-bold mb-2">My Profile</h2>

          <p className="text-muted mb-4">
            Manage your personal information.
          </p>

          <div className="text-center mb-4">
            <div className="profile-image-wrapper">
              <img
                src={
                  profile.profileImage ||
                  "https://placehold.co/120x120?text=Profile"
                }
                alt="Profile"
                className="rounded-circle profile-image"
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
                  <span>📷</span>
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  handleImageUpload(e.target.files?.[0]);
                }}
              />
            </div>
          </div>

          {message && <div className="alert alert-success">{message}</div>}

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSave}>
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

            <div className="mb-4">
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
              className="btn btn-primary w-100"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
