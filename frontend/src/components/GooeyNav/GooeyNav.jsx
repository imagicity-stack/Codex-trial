import { useRef, useEffect, useState } from 'react';
import './GooeyNav.css';

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 14,
  particleDistances = [90, 16],
  particleR = 120,
  timeVariance = 260,
  colors = [1, 2, 3, 4],
  initialActiveIndex = 0
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(6)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(6), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 22) * 10 : (rotate - r / 22) * 10
    };
  };

  const makeParticles = element => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const particle = createParticle(i, t, d, r);
      element.classList.remove('active');

      setTimeout(() => {
        const particleEl = document.createElement('span');
        const pointEl = document.createElement('span');
        particleEl.classList.add('particle');
        particleEl.style.setProperty('--start-x', `${particle.start[0]}px`);
        particleEl.style.setProperty('--start-y', `${particle.start[1]}px`);
        particleEl.style.setProperty('--end-x', `${particle.end[0]}px`);
        particleEl.style.setProperty('--end-y', `${particle.end[1]}px`);
        particleEl.style.setProperty('--time', `${particle.time}ms`);
        particleEl.style.setProperty('--scale', `${particle.scale}`);
        particleEl.style.setProperty('--color', `var(--color-${particle.color}, white)`);
        particleEl.style.setProperty('--rotate', `${particle.rotate}deg`);

        pointEl.classList.add('point');
        particleEl.appendChild(pointEl);
        element.appendChild(particleEl);

        requestAnimationFrame(() => {
          element.classList.add('active');
        });

        setTimeout(() => {
          if (element.contains(particleEl)) {
            element.removeChild(particleEl);
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = element => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const rect = element.getBoundingClientRect();

    const styles = {
      left: `${rect.x - containerRect.x}px`,
      top: `${rect.y - containerRect.y}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`
    };

    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleInteraction = (liEl, index) => {
    if (!liEl || activeIndex === index) return;

    setActiveIndex(index);
    updateEffectPosition(liEl);

    const filterElement = filterRef.current;
    if (filterElement) {
      filterElement.querySelectorAll('.particle').forEach(p => filterElement.removeChild(p));
      makeParticles(filterElement);
    }

    const textElement = textRef.current;
    if (textElement) {
      textElement.classList.remove('active');
      void textElement.offsetWidth;
      textElement.classList.add('active');
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const itemsElements = navRef.current.querySelectorAll('li');
    const activeEl = itemsElements[activeIndex];
    if (activeEl) {
      updateEffectPosition(activeEl);
      textRef.current?.classList.add('active');
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActive = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActive) {
        updateEffectPosition(currentActive);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const itemsElements = navRef.current?.querySelectorAll('li');
      const liEl = itemsElements?.[index];
      if (liEl) {
        handleInteraction(liEl, index);
      }
    }
  };

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={item.label}
              className={activeIndex === index ? 'active' : ''}
              onClick={event => handleInteraction(event.currentTarget, index)}
            >
              <a href={item.href} onKeyDown={event => handleKeyDown(event, index)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default GooeyNav;
