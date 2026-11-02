import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useLayoutEffect } from "react";
import { useAuth } from "./context/AuthContext";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PlanTrip from "./pages/PlanTrip";
import Admin from "./pages/Admin";
import ExploreCountries from "./pages/ExploreCountries";
import CountryActivities from "./pages/CountryActivities";
import Chatbot from "./pages/Chatbot";

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

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { user, token } = useAuth();

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={user && token ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={user && token ? <Navigate to="/" replace /> : <Register />}
        />

        <Route
          path="/explore-countries"
          element={
            <ProtectedRoute>
              <ExploreCountries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/countries/:countryName/activities"
          element={
            <ProtectedRoute>
              <CountryActivities />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plan-trip"
          element={
            <ProtectedRoute>
              <PlanTrip />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
