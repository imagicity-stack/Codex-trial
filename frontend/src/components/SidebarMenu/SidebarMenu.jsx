import { useState } from 'react';
import './SidebarMenu.css';

const menuItems = ['Home', 'About Us', 'Services', 'Projects', 'Blogs', 'Contact Us'];

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        className={`sidebar-menu__toggle ${isOpen ? 'sidebar-menu__toggle--active' : ''}`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
      >
        <span className="sidebar-menu__toggle-bar" />
        <span className="sidebar-menu__toggle-bar" />
        <span className="sidebar-menu__toggle-bar" />
        <span className="sidebar-menu__toggle-label">Menu</span>
      </button>

      <div className={`sidebar-menu__overlay ${isOpen ? 'sidebar-menu__overlay--visible' : ''}`} onClick={closeMenu} />

      <aside className={`sidebar-menu ${isOpen ? 'sidebar-menu--open' : ''}`} aria-hidden={!isOpen}>
        <nav className="sidebar-menu__nav" id="primary-navigation">
          <p className="sidebar-menu__eyebrow">Navigate</p>
          <ul className="sidebar-menu__list">
            {menuItems.map((item) => (
              <li key={item} className="sidebar-menu__item">
                <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={closeMenu}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="sidebar-menu__cta">
            <span>Ready to grow?</span>
            <a className="sidebar-menu__cta-button" href="#contact" onClick={closeMenu}>
              Book a discovery call
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default SidebarMenu;
