import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <span className="eyebrow">YOUR NEXT ADVENTURE</span>

        <h2>Ready to plan your next adventure?</h2>

        <p>
          Turn your travel ideas into a journey that fits your
          time, budget, and style.
        </p>

        <Link to="/plan-trip" className="cta-button">
          Plan Your Trip <span>→</span>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;