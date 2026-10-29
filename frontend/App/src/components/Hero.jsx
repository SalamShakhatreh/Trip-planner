
const Hero = () => {
  return (
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
  )
}

export default Hero
