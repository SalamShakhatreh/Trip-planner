
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://trip-planner-vyu6.onrender.com/api/auth";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/login");
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    setError("");
    setLoading(true);

    try {
      const result = await fetch(`${API_URL}/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: response.credential,
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message || "Google sign-up failed");
      }

      login(data.user, data.token);
      navigate("/");
    } catch (error) {
      setError(error.message || "Google sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Link to="/" className="back-home">
        &#8592;
      </Link>

      <div className="container py-5">
        <div className="row justify-content-center align-items-stretch g-0 register-card">
          <div className="col-lg-6 register-image">
            <div className="register-image-overlay">
              <Link to="/" className="register-brand">
                ✈ Trip Planner
              </Link>

              <div className="register-image-text">
                <h1>Every journey starts with a plan.</h1>
                <p>
                  Create your account and start planning adventures
                  that fit your budget and your dreams.
                </p>
              </div>

              <p className="register-image-footer">
                Your next adventure is waiting.
              </p>
            </div>
          </div>

          <div className="col-lg-6 register-form-section">
            <div className="register-form-content">
              <div className="mb-4">
                <h2 className="fw-bold mb-2">Create your account</h2>
                <p className="text-muted">
                  Join us and plan your next adventure.
                </p>
              </div>

              <div className="d-flex justify-content-center mb-4">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google sign-up failed")}
                  text="signup_with"
                  shape="rectangular"
                  size="large"
                  width="300"
                />
              </div>

              <div className="d-flex align-items-center gap-3 mb-4">
                <hr className="flex-grow-1" />
                <span className="text-muted small">OR</span>
                <hr className="flex-grow-1" />
              </div>

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="register-name" className="form-label fw-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="register-name"
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="register-email" className="form-label fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="register-email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="register-password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="register-password"
                    className="form-control form-control-lg"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirm-password" className="form-label fw-semibold">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="form-control form-control-lg"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 auth-button"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
