
const Nav = () => {
  return (
    <header className="site-header">
      <nav className="container navbar navbar-expand-lg">
        <a className="navbar-brand logo" href="#home">
          <span className="logo-icon">✈</span> Trip Planner
        </a>

        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#features">Features</a>
        </div>

        <div className="nav-actions">
          <button className="btn btn-login">Log In</button>
          <button className="btn btn-primary-custom">Sign Up</button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
