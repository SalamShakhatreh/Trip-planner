
const PlanTrip = () => {
  return (
    <section className="plan-trip-section">
      <div className="plan-trip-container">
        <div className="plan-trip-header">
          <span className="eyebrow">YOUR NEXT ADVENTURE</span>
          <h1>Plan Your Perfect Trip</h1>
          <p>
            Tell us a little about your trip, and let's start planning
            an adventure that fits your style and budget.
          </p>
        </div>

        <form className="plan-trip-form">
          <div className="trip-form-section">
            <h2>Where do you want to go?</h2>
            <p>Choose your destination or explore your options.</p>

            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              placeholder="Enter a destination..."
            />
          </div>

          <div className="trip-form-section">
            <h2>Trip Details</h2>
            <p>Tell us about your travel plans.</p>

            <div className="trip-form-grid">
              <div>
                <label htmlFor="duration">Trip Duration</label>
                <input
                  type="number"
                  id="duration"
                  min="1"
                  placeholder="Number of days"
                />
              </div>

              <div>
                <label htmlFor="travelers">Travelers</label>
                <input
                  type="number"
                  id="travelers"
                  min="1"
                  placeholder="Number of people"
                />
              </div>
            </div>
          </div>

          <div className="trip-form-section">
            <h2>What's your budget?</h2>
            <p>Set a budget that works for your trip.</p>

            <label htmlFor="budget">Total Budget</label>
            <input
              type="number"
              id="budget"
              min="0"
              placeholder="Enter your budget"
            />

            <label htmlFor="budgetType">Budget Type</label>
            <select id="budgetType">
              <option value="">Select budget type</option>
              <option value="per-person">Per Person</option>
              <option value="group">For the Whole Group</option>
            </select>
          </div>

          <button type="submit">Continue →</button>
        </form>
      </div>
    </section>
  )
}

export default PlanTrip
