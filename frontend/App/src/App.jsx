
import './App.css'

const destinations = [
  {
    name: 'Santorini, Greece',
    description: 'White houses, blue seas, and unforgettable sunsets.',
    image:
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=85',
    budget: 'From $450',
  },
  {
    name: 'Bali, Indonesia',
    description: 'Tropical beaches, green landscapes, and peaceful escapes.',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',
    budget: 'From $350',
  },
  {
    name: 'Swiss Alps, Switzerland',
    description: 'Mountain views, fresh air, and scenic adventures.',
    image:
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85',
    budget: 'From $600',
  },
]

const features = [
  {
    icon: '🌍',
    title: 'Discover Destinations',
    description:
      'Explore destinations and find places that match your interests.',
  },
  {
    icon: '💰',
    title: 'Plan Your Budget',
    description:
      'Organize your estimated travel, accommodation, food, and activity costs.',
  },
  {
    icon: '🗓️',
    title: 'Build Your Itinerary',
    description:
      'Arrange activities across your vacation days and plan your time.',
  },
]

const App = () => {
  return (
    <div className="app">
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

      <main>
        <section className="hero-section" id="home">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6 hero-content">
                <span className="eyebrow">
                  YOUR JOURNEY, YOUR WAY
                </span>

                <h1>
                  The world is yours
                  <span> to explore.</span>
                </h1>

                <p className="hero-description">
                  Discover amazing destinations, plan your activities,
                  and create a trip that fits your budget and your
                  travel style.
                </p>

                <div className="hero-actions">
                  <a href="#destinations" className="btn btn-primary-custom">
                    Explore Destinations <span>→</span>
                  </a>

                  <a href="#features" className="text-link">
                    Discover how it works
                  </a>
                </div>

                <div className="hero-note">
                  <span className="note-icon">✓</span>
                  Your next adventure starts with a plan.
                </div>
              </div>

              <div className="col-lg-6">
                <div className="hero-image-wrapper">
                  <img
                    className="hero-image"
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90"
                    alt="Beautiful mountain landscape"
                  />

                  <div className="floating-card">
                    <span className="floating-icon">🧭</span>
                    <div>
                      <strong>Your next adventure</strong>
                      <p>Make every day count.</p>
                    </div>
                  </div>

                  <div className="image-label">
                    <span>✦</span> Discover somewhere new
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="destinations-section" id="destinations">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">FIND YOUR INSPIRATION</span>
                <h2>Places worth exploring</h2>
                <p>
                  A little inspiration for your next unforgettable trip.
                </p>
              </div>

              <a href="#home" className="text-link">
                Back to top ↑
              </a>
            </div>

            <div className="row g-4">
              {destinations.map((destination) => (
                <div className="col-md-6 col-lg-4" key={destination.name}>
                  <article className="destination-card">
                    <div className="destination-image-wrapper">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="destination-image"
                        loading="lazy"
                      />
                      <span className="destination-badge">
                        Explore
                      </span>
                    </div>

                    <div className="destination-info">
                      <h3>{destination.name}</h3>
                      <p>{destination.description}</p>
                      <div className="destination-footer">
                        <span>{destination.budget}</span>
                        <span className="destination-arrow">↗</span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="container">
            <div className="section-heading centered-heading">
              <div>
                <span className="eyebrow">TRAVEL SMARTER</span>
                <h2>Everything in one place</h2>
                <p>
                  From the first idea to a day-by-day travel plan.
                </p>
              </div>
            </div>

            <div className="row g-4">
              {features.map((feature) => (
                <div className="col-md-6 col-lg-4" key={feature.title}>
                  <article className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <span className="eyebrow">READY FOR SOMETHING NEW?</span>
              <h2>Your next story starts here.</h2>
              <p>
                Start exploring ideas for a trip that suits you.
              </p>
              <a href="#destinations" className="btn btn-light-custom">
                Find Your Destination →
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <a className="logo" href="#home">
            <span className="logo-icon">✈</span> Trip Planner
          </a>

          <p>
            &copy; {new Date().getFullYear()} Trip Planner. All rights
            reserved.
          </p>

          <a href="#home" className="footer-link">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
