import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const API_URL = "https://trip-planner-vyu6.onrender.com/api";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const { token } = useAuth();
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [totalDestinations, setTotalDestinations] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    image: "",
  });

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Manage Users", icon: "♙" },
    { name: "Manage Trips", icon: "✈" },
    { name: "Manage Destinations", icon: "⌖" },
    { name: "Analytics", icon: "▥" },
  ];

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/destinations?limit=100`);

      setDestinations(response.data.destinations);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${API_URL}/countries`);
      setCountries(response.data.countries);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load countries");
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/auth/admin/all`,
        authHeaders,
      );

      setUsers(response.data.users);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };
  const fetchTrips = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/trips/admin/all`,
        authHeaders,
      );

      setTrips(response.data.trips);
    } catch (error) {
      console.error("Failed to load trips:", error);
    }
  };
  const fetchDashboardStats = async () => {
    try {
      const [usersResponse, tripsResponse, destinationsResponse] =
        await Promise.all([
          axios.get(`${API_URL}/auth/admin/all`, authHeaders),
          axios.get(`${API_URL}/trips/admin/all`, authHeaders),
          axios.get(`${API_URL}/destinations?limit=100`),
        ]);

      setTotalUsers(usersResponse.data.totalUsers);
      setTotalTrips(tripsResponse.data.trips.length);
      setTotalDestinations(destinationsResponse.data.destinations.length);
    } catch (error) {
      console.error("Failed to load dashboard statistics:", error);
    }
  };

  useEffect(() => {
    if (activeSection === "Dashboard") {
      fetchDashboardStats();
    }

    if (activeSection === "Manage Users") {
      fetchUsers();
    }

    if (activeSection === "Manage Trips") {
      fetchTrips();
    }

    if (activeSection === "Manage Destinations") {
      fetchDestinations();
      fetchCountries();
    }
    if (activeSection === "Analytics") {
  fetchDashboardStats();
  fetchTrips();
}
  }, [activeSection]);

  const tripStatusData = [
  {
    name: "Planned",
    value: trips.filter((trip) => trip.status === "planned").length,
  },
  {
    name: "Ongoing",
    value: trips.filter((trip) => trip.status === "ongoing").length,
  },
  {
    name: "Completed",
    value: trips.filter((trip) => trip.status === "completed").length,
  },
];

const platformStatsData = [
  { name: "Users", total: totalUsers },
  { name: "Trips", total: totalTrips },
  { name: "Destinations", total: totalDestinations },
];

const chartColors = ["#8884d8", "#82ca9d", "#ffc658"];

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      country: "",
      description: "",
      image: "",
    });

    setEditingId(null);
  };

  const handleEdit = (destination) => {
    setFormData({
      name: destination.name,
      country: destination.country?._id || "",
      description: destination.description,
      image: destination.image,
    });

    setEditingId(destination._id);
    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/destinations/${editingId}`,
          formData,
          authHeaders,
        );

        setSuccess("Destination updated successfully.");
      } else {
        await axios.post(`${API_URL}/destinations`, formData, authHeaders);

        setSuccess("Destination added successfully.");
      }

      resetForm();
      await fetchDestinations();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

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
                <strong>{totalUsers}</strong>
              </div>

              <div className="admin-stat-card">
                <span>Total Trips</span>
                <strong>{totalTrips}</strong>
              </div>

              <div className="admin-stat-card">
                <span>Destinations</span>
                <strong>{totalDestinations}</strong>
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

            <div className="admin-table-wrapper">
              <table className="admin-destinations-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case "Manage Trips":
        return (
          <>
            <h2>Manage Trips</h2>
            <p>Monitor trips created by users.</p>

            <div className="admin-table-wrapper">
              <table className="admin-destinations-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Trip Title</th>
                    <th>Destination</th>
                    <th>Start Date</th>
                    <th>Duration</th>
                    <th>Budget</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {trips.map((trip) => (
                    <tr key={trip._id}>
                      <td>{trip.user?.name || "Unknown"}</td>
                      <td>{trip.title}</td>
                      <td>{trip.destination?.name || "Unknown"}</td>
                      <td>{new Date(trip.startDate).toLocaleDateString()}</td>
                      <td>{trip.duration} days</td>
                      <td>
                        {trip.budget} {trip.currency}
                      </td>
                      <td>{trip.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case "Manage Destinations":
        return (
          <>
            <h2>Manage Destinations</h2>
            <p>Add new destinations or update existing ones.</p>

            <div className="admin-destination-form">
              <h3>{editingId ? "Edit Destination" : "Add New Destination"}</h3>

              <form onSubmit={handleSubmit}>
                <div className="admin-form-grid">
                  <div>
                    <label htmlFor="destination-name">Destination Name</label>

                    <input
                      id="destination-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter destination name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="destination-country">Country</label>

                    <select
                      id="destination-country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a country</option>

                      {countries.map((country) => (
                        <option key={country._id} value={country._id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-full">
                    <label htmlFor="destination-description">Description</label>

                    <textarea
                      id="destination-description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter destination description"
                      rows="4"
                      required
                    />
                  </div>

                  <div className="admin-form-full">
                    <label htmlFor="destination-image">Image URL</label>

                    <input
                      id="destination-image"
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-actions">
                  <button type="submit" className="admin-submit-button">
                    {editingId ? "Save Changes" : "Add Destination"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      className="admin-cancel-button"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {error && <p className="admin-message error">{error}</p>}
            {success && <p className="admin-message success">{success}</p>}

            <div className="admin-destinations-list">
              <h3>Existing Destinations</h3>

              {loading ? (
                <p>Loading destinations...</p>
              ) : destinations.length === 0 ? (
                <p>No destinations found.</p>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-destinations-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {destinations.map((destination) => (
                        <tr key={destination._id}>
                          <td>
                            <img
                              src={destination.image}
                              alt={destination.name}
                            />
                          </td>

                          <td>{destination.name}</td>

                          <td>{destination.country?.name || "Unknown"}</td>

                          <td>
                            <button
                              type="button"
                              className="admin-edit-button"
                              onClick={() => handleEdit(destination)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        );

      case "Analytics":
  return (
    <>
      <h2>Analytics</h2>
      <p>Explore statistics and platform performance.</p>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>Total Users</span>
          <strong>{totalUsers}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Total Trips</span>
          <strong>{totalTrips}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Destinations</span>
          <strong>{totalDestinations}</strong>
        </div>
      </div>

      <div className="admin-analytics-grid">
        <div className="admin-chart-card">
          <h3>Platform Statistics</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformStatsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-chart-card">
          <h3>Trips by Status</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tripStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {tripStatusData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColors[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
              className={activeSection === item.name ? "active" : ""}
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
          onClick={() => navigate("/")}
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

        <section className="admin-content">{renderContent()}</section>
      </main>
    </div>
  );
};

export default Admin;
