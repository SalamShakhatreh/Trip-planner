import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DestinationDetails from "./pages/DestinationDetails";
import PlanTrip from "./pages/PlanTrip";
import Admin from "./pages/Admin";
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
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destinations/:name" element={<DestinationDetails />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;