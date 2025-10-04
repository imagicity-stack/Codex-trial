import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as math from 'mathjs';
import './GradualBlur.css';

const DEFAULT_CONFIG = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 6,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {}
};

const PRESETS = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  pageTop: { position: 'top', target: 'page', height: '18vh', strength: 3, divCount: 8, curve: 'bezier' },
  pageBottom: { position: 'bottom', target: 'page', height: '22vh', strength: 3.5, divCount: 9, curve: 'bezier' }
};

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const mergeConfigs = (...configs) => configs.reduce((acc, config) => ({ ...acc, ...config }), {});

const getGradientDirection = position =>
  ({
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  })[position] || 'to bottom';

const debounce = (fn, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
};

const useResponsiveDimension = (responsive, config, key) => {
  const [value, setValue] = useState(config[key]);

  useEffect(() => {
    if (!responsive) return;
    const calculate = () => {
      const width = window.innerWidth;
      let result = config[key];
      const responsiveKey = `${key[0].toUpperCase()}${key.slice(1)}`;
      if (width <= 480 && config[`mobile${responsiveKey}`]) result = config[`mobile${responsiveKey}`];
      else if (width <= 768 && config[`tablet${responsiveKey}`]) result = config[`tablet${responsiveKey}`];
      else if (width <= 1024 && config[`desktop${responsiveKey}`]) result = config[`desktop${responsiveKey}`];
      setValue(result);
    };

    const debounced = debounce(calculate, 100);
    calculate();
    window.addEventListener('resize', debounced);
    return () => window.removeEventListener('resize', debounced);
  }, [responsive, config, key]);

  return responsive ? value : config[key];
};

const useIntersectionObserver = (ref, shouldObserve = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
};

const GradualBlur = props => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props);
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');
  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');

  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;
    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);
      let blurValue;
      if (config.exponential) {
        blurValue = math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }

      const p1 = math.round((increment * i - increment) * 10) / 10;
      const p2 = math.round(increment * i * 10) / 10;
      const p3 = math.round((increment * i + increment) * 10) / 10;
      const p4 = math.round((increment * i + increment * 2) * 10) / 10;
      let gradient = `transparent ${p1}%, rgba(255, 170, 100, 0.45) ${p2}%`;
      if (p3 <= 100) gradient += `, rgba(255, 170, 100, 0.45) ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;
      const direction = getGradientDirection(config.position);

      const divStyle = {
        position: 'absolute',
        inset: '0',
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity,
        transition:
          config.animated && config.animated !== 'scroll'
            ? `backdrop-filter ${config.duration} ${config.easing}`
            : undefined
      };

      divs.push(<div key={i} style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  const containerStyle = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(config.position);
    const isHorizontal = ['left', 'right'].includes(config.position);
    const isPageTarget = config.target === 'page';

    const baseStyle = {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || '100%';
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = '100%';
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  useEffect(() => {
    if (isVisible && config.animated === 'scroll' && config.onAnimationComplete) {
      const ms = parseFloat(config.duration) * 1000;
      const timeout = setTimeout(() => config.onAnimationComplete?.(), ms);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [isVisible, config]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className}`}
      style={containerStyle}
      onMouseEnter={config.hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={config.hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className="gradual-blur-inner">{blurDivs}</div>
    </div>
  );
};

const GradualBlurMemo = React.memo(GradualBlur);
GradualBlurMemo.displayName = 'GradualBlur';
GradualBlurMemo.PRESETS = PRESETS;
GradualBlurMemo.CURVE_FUNCTIONS = CURVE_FUNCTIONS;

const injectStyles = () => {
  if (typeof document === 'undefined') return;
  const styleId = 'gradual-blur-styles';
  if (document.getElementById(styleId)) return;
  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = `
.gradual-blur { pointer-events: none; transition: opacity 0.3s ease-out; }
.gradual-blur-parent { overflow: hidden; }
.gradual-blur-inner { pointer-events: none; }
`;
  document.head.appendChild(styleElement);
};

if (typeof document !== 'undefined') {
  injectStyles();
}

export default GradualBlurMemo;
