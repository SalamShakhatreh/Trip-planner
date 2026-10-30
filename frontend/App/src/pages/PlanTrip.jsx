
import { useState } from "react";

const PlanTrip = () => {
  const [destination, setDestination] = useState("");
  const [explore, setExplore] = useState(false);
  const [duration, setDuration] = useState(5);
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState(1000);
  const [budgetInput, setBudgetInput] = useState("1000");
  const [budgetType, setBudgetType] = useState("person");

  const handleExplore = () => {
    setExplore(true);
    setDestination("");
  };

  const handleBudgetBlur = () => {
    const amount = Number(budgetInput);

    if (
      budgetInput === "" ||
      !Number.isInteger(amount) ||
      amount < 100 ||
      amount > 10000
    ) {
      setBudgetInput(String(budget));
    }
  };

  return (
    <main className="trip-planner-page">
      <section className="trip-planner-banner">
        <div className="trip-banner-overlay">
          <div className="trip-banner-content">
            <span className="trip-kicker">DESIGN YOUR ESCAPE</span>
            <h1>Every great journey starts with a plan.</h1>
            <p>
              Your time, your budget, your adventure.
              Let's put it all together.
            </p>
          </div>
          <div className="trip-banner-mark">✦</div>
        </div>
      </section>

      <section className="trip-workspace">
        <div className="trip-workspace-heading">
          <div>
            <span className="trip-section-label">YOUR TRIP WORKSPACE</span>
            <h2>Build your journey</h2>
            <p>Shape your trip around what matters most to you.</p>
          </div>
          <div className="trip-live-tag">
            <span></span> CUSTOM PLANNING
          </div>
        </div>

        <div className="trip-workspace-grid">
          <div className="trip-input-area">
            <div className="trip-panel">
              <div className="trip-panel-heading">
                <span className="trip-panel-icon">⌖</span>
                <div>
                  <h3>Where to?</h3>
                  <p>Choose a destination or explore your options.</p>
                </div>
              </div>

              <div className="trip-destination-input">
                <span>⌕</span>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setExplore(false);
                  }}
                  placeholder="Search or type a destination..."
                  disabled={explore}
                />
                {destination && (
                  <button
                    type="button"
                    onClick={() => setDestination("")}
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                type="button"
                className={`trip-explore-button ${explore ? "active" : ""}`}
                onClick={handleExplore}
              >
                <span>✦</span>
                {explore
                  ? "Exploring destinations"
                  : "I haven't decided yet — help me explore"}
              </button>
            </div>

            <div className="trip-panel">
              <div className="trip-panel-heading">
                <span className="trip-panel-icon">◷</span>
                <div>
                  <h3>How long is your escape?</h3>
                  <p>Set the number of days for your trip.</p>
                </div>
              </div>

              <div className="trip-counter">
                <div>
                  <strong>{duration}</strong>
                  <span>{duration === 1 ? "DAY" : "DAYS"}</span>
                </div>
                <div className="trip-counter-buttons">
                  <button
                    type="button"
                    onClick={() =>
                      setDuration((v) => Math.max(1, v - 1))
                    }
                    aria-label="Decrease duration"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuration((v) => v + 1)}
                    aria-label="Increase duration"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="trip-panel">
              <div className="trip-panel-heading">
                <span className="trip-panel-icon">♙</span>
                <div>
                  <h3>Who's coming along?</h3>
                  <p>How many people are joining the adventure?</p>
                </div>
              </div>

              <div className="trip-counter">
                <div>
                  <strong>{travelers}</strong>
                  <span>
                    {travelers === 1 ? "TRAVELER" : "TRAVELERS"}
                  </span>
                </div>
                <div className="trip-counter-buttons">
                  <button
                    type="button"
                    onClick={() =>
                      setTravelers((v) => Math.max(1, v - 1))
                    }
                    aria-label="Decrease travelers"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={() => setTravelers((v) => v + 1)}
                    aria-label="Increase travelers"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="trip-panel trip-budget-panel">
              <div className="trip-panel-heading">
                <span className="trip-panel-icon">$</span>
                <div>
                  <h3>Set your budget</h3>
                  <p>Choose how much you'd like to spend.</p>
                </div>
              </div>

              <div className="trip-budget-number">
                <span>$</span>
                {budget.toLocaleString()}
              </div>

              <input
                className="trip-budget-slider"
                type="range"
                min="100"
                max="10000"
                step="1"
                value={budget}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setBudget(value);
                  setBudgetInput(String(value));
                }}
                aria-label="Trip budget"
              />

              <div className="trip-budget-limits">
                <span>$100</span>
                <span>$10,000</span>
              </div>

              <div className="trip-budget-types">
                <button
                  type="button"
                  className={
                    budgetType === "person" ? "selected" : ""
                  }
                  onClick={() => setBudgetType("person")}
                >
                  Per person
                </button>
                <button
                  type="button"
                  className={
                    budgetType === "group" ? "selected" : ""
                  }
                  onClick={() => setBudgetType("group")}
                >
                  Whole group
                </button>
              </div>
            </div>

            <button
              type="button"
              className="trip-create-button"
              onClick={() => {
                alert("Your trip details are ready!");
              }}
            >
              Create my trip <span>→</span>
            </button>
          </div>

          <div className="trip-summary-column">
            <aside className="trip-summary">
              <div className="trip-summary-top">
                <span className="trip-summary-label">
                  YOUR TRIP AT A GLANCE
                </span>
                <div className="trip-summary-decoration">✧</div>
                <h3>
                  The adventure<br />
                  starts with you.
                </h3>
                <p>
                  Your choices will shape your personalized trip plan.
                </p>
              </div>

              <div className="trip-summary-details">
                <div className="trip-summary-item">
                  <span>⌖</span>
                  <div>
                    <small>DESTINATION</small>
                    <strong>
                      {explore
                        ? "Explore for me"
                        : destination || "Not selected yet"}
                    </strong>
                  </div>
                </div>

                <div className="trip-summary-item">
                  <span>◷</span>
                  <div>
                    <small>DURATION</small>
                    <strong>
                      {duration} {duration === 1 ? "day" : "days"}
                    </strong>
                  </div>
                </div>

                <div className="trip-summary-item">
                  <span>♙</span>
                  <div>
                    <small>TRAVELERS</small>
                    <strong>
                      {travelers} {travelers === 1 ? "person" : "people"}
                    </strong>
                  </div>
                </div>

                <div className="trip-summary-item">
                  <span>$</span>
                  <div>
                    <small>BUDGET</small>
                    <strong className="trip-summary-budget-value">
                      $
                      <input
                        type="number"
                        className="trip-summary-budget-input"
                        min="100"
                        max="10000"
                        step="1"
                        value={budgetInput}
                        onChange={(e) => {
                          const value = e.target.value;
                          setBudgetInput(value);

                          const amount = Number(value);

                          if (
                            value !== "" &&
                            Number.isInteger(amount) &&
                            amount >= 100 &&
                            amount <= 10000
                          ) {
                            setBudget(amount);
                          }
                        }}
                        onBlur={handleBudgetBlur}
                        aria-label="Edit trip budget"
                      />
                      / {budgetType === "person" ? "person" : "group"}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="trip-summary-note">
                <span>✦</span>
                <p>
                  Your budget will help shape accommodation,
                  transport, food, and activities.
                </p>
              </div>
            </aside>

            <div
              className="trip-route-decoration"
              aria-hidden="true"
            >
              <svg viewBox="0 0 300 160">
                <path
                  d="M25 125 C65 20, 180 15, 255 85"
                  fill="none"
                  stroke="#aaa8ed"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                />
                <circle
                  cx="25"
                  cy="125"
                  r="5"
                  fill="#aaa8ed"
                />
                <circle
                  cx="255"
                  cy="85"
                  r="5"
                  fill="#aaa8ed"
                />
              </svg>
              <span>✈</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlanTrip;
