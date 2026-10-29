
import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Destinations from './components/Destinations'

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

        <Destinations />

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
