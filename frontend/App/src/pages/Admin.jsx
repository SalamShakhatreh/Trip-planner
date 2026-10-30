
import { useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Manage Users", icon: "♙" },
    { name: "Manage Trips", icon: "✈" },
    { name: "Manage Destinations", icon: "⌖" },
    { name: "Analytics", icon: "▥" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <>
            <h2>Dashboard Overview</h2>
            <p>Welcome to your Trip Planner admin panel.</p>

            <div className="admin-stats">
              <div className="admin-stat-card">
                <span>Total Users</span>
                <strong>—</strong>
              </div>
              <div className="admin-stat-card">
                <span>Total Trips</span>
                <strong>—</strong>
              </div>
              <div className="admin-stat-card">
                <span>Destinations</span>
                <strong>—</strong>
              </div>
            </div>

            <div className="admin-placeholder">
              <h3>Welcome to Trip Planner</h3>
              <p>
                Your platform statistics and recent activity will appear here
                once the dashboard is connected to the backend.
              </p>
            </div>
          </>
        );

      case "Manage Users":
        return (
          <>
            <h2>Manage Users</h2>
            <p>View and manage registered users.</p>
            <div className="admin-placeholder">
              User data will appear here.
            </div>
          </>
        );

      case "Manage Trips":
        return (
          <>
            <h2>Manage Trips</h2>
            <p>Monitor trips created by users.</p>
            <div className="admin-placeholder">
              Trip data will appear here.
            </div>
          </>
        );

      case "Manage Destinations":
        return (
          <>
            <h2>Manage Destinations</h2>
            <p>Add, edit, and manage destinations.</p>
            <div className="admin-placeholder">
              Destination management will appear here.
            </div>
          </>
        );

      case "Analytics":
        return (
          <>
            <h2>Analytics</h2>
            <p>Explore statistics and platform performance.</p>
            <div className="admin-placeholder">
              Charts and analytics will appear here.
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span>✈</span>
          Trip Planner
          <small>ADMIN PANEL</small>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => (
            <button
              key={item.name}
              type="button"
              className={
                activeSection === item.name ? "active" : ""
              }
              onClick={() => setActiveSection(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="admin-logout"
          onClick={() => window.location.href = "/"}
        >
          ← Back to Website
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <span>TRIP PLANNER</span>
            <h1>{activeSection}</h1>
          </div>
          <div className="admin-profile">
            <span>Admin</span>
            <div>A</div>
          </div>
        </header>

        <section className="admin-content">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default Admin;
