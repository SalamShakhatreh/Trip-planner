
import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Destinations from './components/Destinations'
import Features from './components/Features'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

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

      <Footer />
    </div>
  )
}

export default App
