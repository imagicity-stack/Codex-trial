import './MotionShowcase.css';

const offerings = [
  {
    title: 'Campaign launch pods',
    description:
      'Activate multi-market rollouts through agile pods that choreograph media, automation, and storytelling without losing brand soul.',
  },
  {
    title: 'Experience engineering',
    description:
      'Prototype and ship immersive landing systems, microsites, and product demos layered with conversion science and modular content.',
  },
  {
    title: 'Lifecycle intelligence',
    description:
      'Fuse data models, CRM, and creative refresh programs to amplify retention, reactivation, and loyalty moments across the funnel.',
  },
];

const MotionShowcase = () => (
  <section className="motion-showcase" id="services">
    <header className="motion-showcase__header">
      <p className="motion-showcase__eyebrow">What we do</p>
      <h2 className="motion-showcase__title">
        Black canvas. Vivid moves. We orchestrate omnichannel narratives that feel cinematic and convert like commerce.
      </h2>
    </header>
    <div className="motion-showcase__grid">
      {offerings.map((offering, index) => (
        <article key={offering.title} className="motion-card">
          <span className="motion-card__index">0{index + 1}</span>
          <h3 className="motion-card__title">{offering.title}</h3>
          <p className="motion-card__description">{offering.description}</p>
          <span className="motion-card__spark" aria-hidden="true" />
          <span className="motion-card__cta">Explore capability</span>
        </article>
      ))}
    </div>
  </section>
);

export default MotionShowcase;
