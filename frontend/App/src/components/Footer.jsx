
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <a className="footer-logo" href="#home">
          <span className="logo-icon">✈</span> Trip Planner
        </a>

        <p>© {new Date().getFullYear()} Trip Planner. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
