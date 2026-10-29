
import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Destinations from './components/Destinations'
import Features from './components/Features'
import CallToAction from './components/CallToAction'

const App = () => {
  return (
    <div className="app">
      <Nav />

      <main>
        <Hero />
        <Destinations />
        <Features />
        <CallToAction />
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
