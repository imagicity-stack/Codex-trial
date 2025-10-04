import LiquidBackground from './components/LiquidBackground/LiquidBackground.jsx';
import HeroSlider from './components/HeroSlider/HeroSlider.jsx';
import GooeyNav from './components/GooeyNav/GooeyNav.jsx';
import GradualBlur from './components/GradualBlur/GradualBlur.jsx';
import FlowingMenu from './components/FlowingMenu/FlowingMenu.jsx';
import Footer from './components/Footer/Footer.jsx';
import imagicityLogo from './assets/imagicity-logo.jpg';
import './App.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Contact Us', href: '#contact' }
];

const serviceMenuItems = [
  {
    link: '#services',
    text: 'Branding & Identity',
    background: 'linear-gradient(135deg, rgba(255, 95, 109, 0.92), rgba(255, 205, 111, 0.85))'
  },
  {
    link: '#services',
    text: 'G.T.M Strategy.',
    background: 'linear-gradient(135deg, rgba(255, 225, 109, 0.92), rgba(255, 95, 109, 0.85))'
  },
  {
    link: '#services',
    text: 'Designing',
    background: 'linear-gradient(135deg, rgba(255, 205, 111, 0.92), rgba(255, 126, 95, 0.82))'
  },
  {
    link: '#services',
    text: 'Web Development',
    background: 'linear-gradient(135deg, rgba(255, 171, 92, 0.92), rgba(255, 95, 109, 0.82))'
  },
  {
    link: '#services',
    text: 'Ecommerce Solution',
    background: 'linear-gradient(135deg, rgba(255, 143, 84, 0.92), rgba(255, 205, 111, 0.82))'
  },
  {
    link: '#services',
    text: 'Content Creation',
    background: 'linear-gradient(135deg, rgba(255, 205, 111, 0.95), rgba(255, 95, 109, 0.78))'
  }
];

function App() {
  return (
    <div className="app">
      <LiquidBackground />
      <GradualBlur preset="pageTop" style={{ mixBlendMode: 'screen' }} opacity={0.9} strength={2.5} />
      <GradualBlur preset="pageBottom" style={{ mixBlendMode: 'multiply' }} opacity={0.85} strength={3.2} />
      <div className="app__inner">
        <header className="app__header">
          <div className="app__brand">
            <div className="app__logo-wrapper">
              <img src={imagicityLogo} alt="Imagicity logo" className="app__logo" />
            </div>
            <div className="app__brand-copy">
              <p className="app__tag">IMAGICITY AGENCY</p>
              <p className="app__headline">Ideas to ignition in one bold marketing collective.</p>
            </div>
          </div>
          <GooeyNav items={navItems} />
        </header>

        <main className="app__main">
          <section id="home" className="app__section app__section--hero">
            <HeroSlider />
          </section>

          <section id="about" className="app__section app__section--about">
            <div className="app__section-heading">
              <span className="app__eyebrow">About Us</span>
              <h2>We choreograph brand momentum end-to-end.</h2>
            </div>
            <div className="app__section-body">
              <p>
                Imagicity is a multidisciplinary marketing studio merging strategy, storytelling, and immersive
                production. We plug in as your growth team—aligning category insights, launch roadmaps, and full-funnel
                campaigns that keep audiences leaning in. From identity refreshes to commerce ecosystems, every touchpoint
                is crafted to feel cinematic, human, and impossibly on-brand.
              </p>
              <div className="app__stats">
                <div>
                  <span className="app__stat-value">120+</span>
                  <span className="app__stat-label">brands energized globally</span>
                </div>
                <div>
                  <span className="app__stat-value">18</span>
                  <span className="app__stat-label">launches in the last quarter</span>
                </div>
                <div>
                  <span className="app__stat-value">5.0</span>
                  <span className="app__stat-label">client satisfaction score</span>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="app__section app__section--services">
            <div className="app__section-heading">
              <span className="app__eyebrow">Services</span>
              <h2>Everything your launch, scale, and storytelling phases demand.</h2>
            </div>
            <div className="app__services-grid">
              <FlowingMenu items={serviceMenuItems} />
              <div className="app__services-copy">
                <p>
                  Hover through the menu to preview the disciplines we use to keep your brand in permanent launch mode.
                  Each lane is powered by cross-functional pods that can embed with your team or run autonomously—whatever
                  keeps velocity high and approvals low-friction.
                </p>
                <ul>
                  <li>Research-backed go-to-market blueprints mapped for each milestone.</li>
                  <li>Design and development sprints that translate concept into experiential product.</li>
                  <li>Always-on content engines delivering narrative, socials, and campaign extensions.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="projects" className="app__section app__section--placeholder">
            <div className="app__section-heading">
              <span className="app__eyebrow">Projects</span>
              <h2>Selected case studies drop here next.</h2>
            </div>
            <p>Let us know what stories you want highlighted and we will stage them in this spotlight block.</p>
          </section>

          <section id="blogs" className="app__section app__section--placeholder">
            <div className="app__section-heading">
              <span className="app__eyebrow">Blogs</span>
              <h2>Journal beats are warming up.</h2>
            </div>
            <p>We can wire this section into your CMS or populate it with signature thought-starters.</p>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
