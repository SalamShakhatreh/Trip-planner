
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const redirectTo = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.user, data.token);
      navigate(redirectTo, { replace: true });
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
        throw new Error(data.message || "Google login failed");
      }

      login(data.user, data.token);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setError(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-background">
      <Link to="/" className="back-home" aria-label="Back to Home">
        <span aria-hidden="true">←</span>
      </Link>

      <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
        <div className="card auth-card border-0 shadow-lg rounded-4">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="auth-logo mb-3">✈</div>
              <h1 className="fw-bold mb-2">Welcome Back</h1>
              <p className="text-muted">
                Log in to plan your next adventure.
              </p>
            </div>

            <form onSubmit={handleEmailLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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
                className="btn btn-primary w-100 btn-lg auth-button"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="d-flex align-items-center gap-3 my-4">
              <hr className="flex-grow-1" />
              <span className="text-muted small">OR</span>
              <hr className="flex-grow-1" />
            </div>

            <div className="d-flex justify-content-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login failed")}
                text="signin_with"
                shape="rectangular"
                size="large"
                width="300"
              />
            </div>

            <p className="text-center mt-4 mb-0">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
