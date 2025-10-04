import LiquidBackground from './components/LiquidBackground/LiquidBackground.jsx';
import SidebarMenu from './components/SidebarMenu/SidebarMenu.jsx';
import HeroSlider from './components/HeroSlider/HeroSlider.jsx';
import MotionShowcase from './components/MotionShowcase/MotionShowcase.jsx';
import ImpactTicker from './components/ImpactTicker/ImpactTicker.jsx';
import ProjectSpotlight from './components/ProjectSpotlight/ProjectSpotlight.jsx';
import InsightsRail from './components/InsightsRail/InsightsRail.jsx';
import Footer from './components/Footer/Footer.jsx';
import imagicityLogo from './assets/imagicity-logo.jpg';
import './App.css';

function App() {
  return (
    <div className="app">
      <LiquidBackground />
      <SidebarMenu />
      <main className="app__content">
        <header className="app__branding" id="about-us">
          <div className="app__logo-wrapper">
            <img src={imagicityLogo} alt="Imagicity logo" className="app__logo" />
          </div>
          <div className="app__branding-text">
            <p className="app__strapline">Marketing experiences imagined to move people.</p>
            <p className="app__subtext">From concept to conversion, we launch immersive brand universes that convert attention into momentum.</p>
          </div>
        </header>
        <HeroSlider />
        <ImpactTicker />
        <MotionShowcase />
        <ProjectSpotlight />
        <InsightsRail />
        <Footer />
      </main>
    </div>
  );
}

export default App;
