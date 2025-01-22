import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Site Map</h3>
        <ul>
          <li>
            <i className="icon">🏠</i>
            <a href="./">Home</a>
          </li>
          <li>
            <i className="icon">📁</i>
            <a href="/portfolio">Portfolio</a>
          </li>
          <li>
            <i className="icon">🔒</i>
            <a href="/privacy">Privacy</a>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>About Me</h3>
        <p>Hi, I'm Mary Smith. I'm a web designer and developer.</p>
        <p>I created this sample web page to showcase some of my digital creation skills.</p>
      </div>

      <div className="footer-section">
        <h3>Contact</h3>
        <ul>
          <li>
            <i className="icon">📧</i>
            <a href="mailto:contact@example.com">Email</a>
          </li>
          <li>
            <i className="icon">💻</i>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <i className="icon">👔</i>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
