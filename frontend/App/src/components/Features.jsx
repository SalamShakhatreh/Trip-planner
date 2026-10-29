
const features = [
  {
    icon: '🌍',
    title: 'Discover Destinations',
    description: 'Explore destinations and find places that match your interests.',
  },
  {
    icon: '💰',
    title: 'Plan Your Budget',
    description: 'Organize your estimated travel, accommodation, food, and activity costs.',
  },
  {
    icon: '🗓️',
    title: 'Build Your Itinerary',
    description: 'Arrange activities across your vacation days and plan your time.',
  },
]

const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">TRAVEL WITH A PLAN</span>
          <h2>Everything you need for your trip</h2>
          <p>
            Plan your journey step by step, from choosing a destination
            to organizing your daily activities.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-md-6 col-lg-4" key={feature.title}>
              <div className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
