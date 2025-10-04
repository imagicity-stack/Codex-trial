import './ProjectSpotlight.css';

const projects = [
  {
    title: 'Aurora fintech festival',
    sector: 'Fintech',
    description: 'Immersive launch microsite + Web3 ticketing with AR billboards in three cities.',
  },
  {
    title: 'Pulse energy rebrand',
    sector: 'Sustainability',
    description: 'Brand system, content engine, and demand programs across APAC and EMEA.',
  },
  {
    title: 'Nova XR retail labs',
    sector: 'Retail innovation',
    description: 'Spatial commerce experience with interactive kiosks and personalized storytelling.',
  },
];

const ProjectSpotlight = () => (
  <section className="project-spotlight" id="projects">
    <header className="project-spotlight__header">
      <p className="project-spotlight__eyebrow">Recent launches</p>
      <h2 className="project-spotlight__title">Projects engineered to move culture, commerce, and communities.</h2>
    </header>
    <div className="project-spotlight__list">
      {projects.map((project) => (
        <article key={project.title} className="project-card">
          <div className="project-card__badge">{project.sector}</div>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__description">{project.description}</p>
          <span className="project-card__glow" aria-hidden="true" />
        </article>
      ))}
    </div>
  </section>
);

export default ProjectSpotlight;
