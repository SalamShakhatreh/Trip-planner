
const destinations = [
  {
    name: 'Santorini, Greece',
    description: 'White houses, blue seas, and unforgettable sunsets.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=85',
    budget: 'From $450',
  },
  {
    name: 'Bali, Indonesia',
    description: 'Tropical beaches, green landscapes, and peaceful escapes.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',
    budget: 'From $350',
  },
  {
    name: 'Swiss Alps, Switzerland',
    description: 'Mountain views, fresh air, and scenic adventures.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85',
    budget: 'From $600',
  },
]

const Destinations = () => {
  return (
    <section className="destinations-section" id="destinations">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">FIND YOUR NEXT ESCAPE</span>
          <h2>Destinations worth discovering</h2>
          <p>
            Explore inspiring places and find the perfect destination for
            your next adventure.
          </p>
        </div>

        <div className="row g-4">
          {destinations.map((destination) => (
            <div className="col-md-6 col-lg-4" key={destination.name}>
              <div className="destination-card">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="destination-image"
                />

                <div className="destination-content">
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>

                  <div className="destination-footer">
                    <span>{destination.budget}</span>
                    <a href="#features">Explore →</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Destinations
