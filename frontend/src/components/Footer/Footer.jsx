import './Footer.css';

const Footer = () => (
  <footer className="footer" id="contact">
    <div className="footer__grid">
      <div className="footer__column footer__column--brand">
        <p className="footer__eyebrow">Let’s collaborate</p>
        <h3 className="footer__headline">Ready to imagine what’s next for your brand?</h3>
        <a className="footer__cta" href="mailto:hello@imagicity.agency">hello@imagicity.agency</a>
      </div>
      <div className="footer__column">
        <p className="footer__label">Studios</p>
        <ul className="footer__list">
          <li>Dubai</li>
          <li>London</li>
          <li>Singapore</li>
        </ul>
      </div>
      <div className="footer__column">
        <p className="footer__label">Connect</p>
        <ul className="footer__list footer__list--links">
          <li>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.behance.net" target="_blank" rel="noreferrer">
              Behance
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="footer__base">
      <span>© {new Date().getFullYear()} Imagicity. Crafted for audacious brands.</span>
      <nav className="footer__nav">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#projects">Projects</a>
        <a href="#blogs">Blogs</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
