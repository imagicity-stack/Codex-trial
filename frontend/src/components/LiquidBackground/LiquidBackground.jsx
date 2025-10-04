import { useEffect } from 'react';
import './LiquidBackground.css';

const LiquidBackground = () => {
  useEffect(() => {
    const root = document.documentElement;

    const setPosition = (x, y) => {
      root.style.setProperty('--cursor-x', `${x}px`);
      root.style.setProperty('--cursor-y', `${y}px`);
    };

    setPosition(window.innerWidth / 2, window.innerHeight / 2);

    const handlePointerMove = (event) => {
      window.requestAnimationFrame(() => setPosition(event.clientX, event.clientY));
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="liquid-background" aria-hidden="true">
      <div className="liquid-background__blob liquid-background__blob--one" />
      <div className="liquid-background__blob liquid-background__blob--two" />
      <div className="liquid-background__blob liquid-background__blob--three" />
      <div className="liquid-background__cursor" />
      <div className="liquid-background__grain" />
    </div>
  );
};

export default LiquidBackground;
