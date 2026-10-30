import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header className="site-header">
      <nav className="container navbar navbar-expand-lg">
        <Link className="navbar-brand logo" to="/">
          <span className="logo-icon">✈</span> Trip Planner
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/#destinations">Destinations</Link>
          <Link to="/#features">Features</Link>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-login">
            Log In
          </Link>

          <Link to="/register" className="btn btn-primary-custom">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;