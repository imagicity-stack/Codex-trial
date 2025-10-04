import LiquidBackground from './components/LiquidBackground/LiquidBackground.jsx';
import SidebarMenu from './components/SidebarMenu/SidebarMenu.jsx';
import HeroSlider from './components/HeroSlider/HeroSlider.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <LiquidBackground />
      <SidebarMenu />
      <main className="app__hero">
        <HeroSlider />
      </main>
    </div>
  );
}

export default App;
