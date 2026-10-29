
import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Destinations from './components/Destinations'
import Features from './components/Features'

const App = () => {
  return (
    <div className="app">
      <Nav />

      <main>
        <Hero />

        <Destinations />

        <Features />

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
