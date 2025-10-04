import { useMemo } from 'react';
import './HeroSlider.css';

const phrases = ['creating', 'strategizing', 'developing', 'designing'];

const HeroSlider = () => {
  const animatedPhrases = useMemo(() => [...phrases, phrases[0]], []);

  return (
    <section className="hero-slider">
      <p className="hero-slider__tagline">Full-funnel marketing studio</p>
      <h1 className="hero-slider__heading">
        <span className="hero-slider__heading-base">We help brands in</span>
        <span className="hero-slider__carousel" aria-live="polite">
          <span className="hero-slider__words">
            {animatedPhrases.map((word, index) => (
              <span key={`${word}-${index}`} className="hero-slider__word">
                {word}
              </span>
            ))}
          </span>
        </span>
      </h1>
      <p className="hero-slider__description">
        We craft bold campaigns, digital products, and seamless journeys that spark demand and
        turn audiences into advocates.
      </p>
      <div className="hero-slider__actions">
        <a className="hero-slider__primary" href="#start">Start a project</a>
        <a className="hero-slider__secondary" href="#cases">
          View case studies
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
};

export default HeroSlider;
