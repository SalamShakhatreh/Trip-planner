
import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'

const destinations = [
  {
    name: 'Santorini, Greece',
    description: 'White houses, blue seas, and unforgettable sunsets.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=85',
    budget: 'From $450',
  },
  {
    name: 'Bali, Indonesia',
    description: 'Tropical beaches, green landscapes, and peaceful escapes.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',
    budget: 'From $350',
  },
  {
    name: 'Swiss Alps, Switzerland',
    description: 'Mountain views, fresh air, and scenic adventures.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85',
    budget: 'From $600',
  },
]

const features = [
  {
    icon: '🌍',
    title: 'Discover Destinations',
    description: 'Explore destinations and find places that match your interests.',
  },
  {
    icon: '💰',
    title: 'Plan Your Budget',
    description: 'Organize your estimated travel, accommodation, food, and activity costs.',
  },
  {
    icon: '🗓️',
    title: 'Build Your Itinerary',
    description: 'Arrange activities across your vacation days and plan your time.',
  },
]

const App = () => {
  return (
    <div className="app">
      <Nav />

      <main>
        <Hero />

        <section className="destinations-section" id="destinations">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">FIND YOUR NEXT ESCAPE</span>
              <h2>Destinations worth discovering</h2>
              <p>
                Explore inspiring places and find the perfect destination for
                your next adventure.
              </p>
            </div>

            <div className="row g-4">
              {destinations.map((destination) => (
                <div className="col-md-6 col-lg-4" key={destination.name}>
                  <div className="destination-card">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="destination-image"
                    />

                    <div className="destination-content">
                      <h3>{destination.name}</h3>
                      <p>{destination.description}</p>

                      <div className="destination-footer">
                        <span>{destination.budget}</span>
                        <a href="#features">Explore →</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">TRAVEL WITH A PLAN</span>
              <h2>Everything you need for your trip</h2>
              <p>
                Plan your journey step by step, from choosing a destination
                to organizing your daily activities.
              </p>
            </div>

            <div className="row g-4">
              {features.map((feature) => (
                <div className="col-md-6 col-lg-4" key={feature.title}>
                  <div className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <span className="eyebrow">YOUR NEXT CHAPTER</span>
              <h2>Ready to plan your next adventure?</h2>
              <p>
                Start exploring destinations and create a trip that fits
                your budget and travel style.
              </p>
              <a href="#destinations" className="btn btn-primary-custom">
                Start Exploring <span>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <a className="footer-logo" href="#home">
            <span className="logo-icon">✈</span> Trip Planner
          </a>

          <p>© {new Date().getFullYear()} Trip Planner. All rights reserved.</p>

          <a href="#home" className="back-to-top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
