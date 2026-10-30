import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DestinationDetails from "./pages/DestinationDetails";
import "./App.css";

const Home = () => {
  return (
    <>
      <Nav />
      <Hero />
      <Destinations />
      <Features />
      <CallToAction />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destinations/:name" element={<DestinationDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;