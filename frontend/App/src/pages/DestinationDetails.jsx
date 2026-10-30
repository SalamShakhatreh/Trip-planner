import { useParams } from 'react-router-dom'

const destinations = [
  {
    name: 'Santorini, Greece',
    description: 'White houses, blue seas, and unforgettable sunsets.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1200&q=85',
    places: ['Oia Village', 'Fira', 'Red Beach'],
    activities: ['Watch the sunset', 'Boat tours', 'Explore local streets'],
  },
  {
    name: 'Bali, Indonesia',
    description: 'Tropical beaches, green landscapes, and peaceful escapes.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
    places: ['Ubud', 'Uluwatu Temple', 'Nusa Penida'],
    activities: ['Visit rice terraces', 'Enjoy the beaches', 'Explore temples'],
  },
  {
    name: 'Swiss Alps, Switzerland',
    description: 'Mountain views, fresh air, and scenic adventures.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85',
    places: ['Zermatt', 'Jungfraujoch', 'Lake Geneva'],
    activities: ['Mountain hiking', 'Cable car rides', 'Explore alpine villages'],
  },
]

const DestinationDetails = () => {
  const { name } = useParams()

  const destination = destinations.find(
    (item) => item.name === decodeURIComponent(name)
  )

  if (!destination) {
    return <h2>Destination not found</h2>
  }

  return (
    <section className="destination-details-section">

      <div className="destination-details-heading">
        <h1>Destination Details</h1>
      </div>

      <div className="container">
        <img
          src={destination.image}
          alt={destination.name}
          className="destination-image"
        />

        <h1>{destination.name}</h1>
        <p>{destination.description}</p>

        <h2>Popular Places</h2>
        <ul>
          {destination.places.map((place) => (
            <li key={place}>{place}</li>
          ))}
        </ul>

        <h2>Things to Do</h2>
        <ul>
          {destination.activities.map((activity) => (
            <li key={activity}>{activity}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default DestinationDetails