import React from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

const animationDefaults = { duration: 0.6, ease: 'expo' };

const FlowingMenu = ({ items = [] }) => (
  <div className="flowing-menu__wrap">
    <nav className="flowing-menu__nav">
      {items.map((item, index) => (
        <MenuItem key={`${item.text}-${index}`} {...item} />
      ))}
    </nav>
  </div>
);

const MenuItem = ({ link, text, image, background }) => {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const top = distance(mouseX, mouseY, width / 2, 0);
    const bottom = distance(mouseX, mouseY, width / 2, height);
    return top < bottom ? 'top' : 'bottom';
  };

  const distance = (x1, y1, x2, y2) => {
    const xDiff = x1 - x2;
    const yDiff = y1 - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const animateIn = event => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const animateOut = event => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const repeatedContent = Array.from({ length: 4 }).map((_, index) => (
    <React.Fragment key={index}>
      <span>{text}</span>
      <div
        className="flowing-menu__media"
        style={image ? { backgroundImage: `url(${image})` } : background ? { background } : undefined}
      />
    </React.Fragment>
  ));

  return (
    <div className="flowing-menu__item" ref={itemRef}>
      <a
        className="flowing-menu__link"
        href={link}
        onMouseEnter={animateIn}
        onMouseLeave={animateOut}
      >
        {text}
      </a>
      <div className="flowing-menu__marquee" ref={marqueeRef}>
        <div className="flowing-menu__marquee-inner-wrap" ref={marqueeInnerRef}>
          <div className="flowing-menu__marquee-inner" aria-hidden="true">
            {repeatedContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
