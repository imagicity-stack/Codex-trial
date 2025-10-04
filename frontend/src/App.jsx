import LiquidBackground from './components/LiquidBackground/LiquidBackground.jsx';
import SidebarMenu from './components/SidebarMenu/SidebarMenu.jsx';
import HeroSlider from './components/HeroSlider/HeroSlider.jsx';
import imagicityLogo from './assets/imagicity-logo.jpg';
import './App.css';

function App() {
  return (
    <div className="app">
      <LiquidBackground />
      <SidebarMenu />
      <main className="app__content">
        <header className="app__branding">
          <img src={imagicityLogo} alt="Imagicity logo" className="app__logo" />
          <p className="app__strapline">Marketing experiences imagined to move people.</p>
        </header>
        <HeroSlider />
      </main>
    </div>
  );
}

export default App;
