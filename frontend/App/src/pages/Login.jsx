
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-background">
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

            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
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
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 btn-lg auth-button"
              >
                Log In
              </button>
            </form>

            <div className="d-flex align-items-center gap-3 my-4">
              <hr className="flex-grow-1" />
              <span className="text-muted small">OR</span>
              <hr className="flex-grow-1" />
            </div>

            <button
              type="button"
              className="btn btn-google btn-lg w-100"
            >
              <svg
                className="google-icon"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
                />
              </svg>
              Sign in with Google
            </button>

            <p className="text-center mt-4 mb-0">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Sign Up
              </Link>
            </p>

            <div className="text-center mt-3">
              <Link to="/" className="auth-link">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
