
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-page">
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

              <form>
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
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 auth-button"
                >
                  Create Account
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
