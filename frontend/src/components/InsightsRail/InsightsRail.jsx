import './InsightsRail.css';

const insights = [
  {
    title: 'The new physics of marketing liquidity',
    category: 'Strategy',
    time: '7 min read',
  },
  {
    title: 'Designing XR retail journeys with tactile storytelling',
    category: 'Experience design',
    time: '5 min read',
  },
  {
    title: 'Operating always-on creator ecosystems',
    category: 'Community',
    time: '6 min read',
  },
];

const InsightsRail = () => (
  <section className="insights-rail" id="blogs">
    <header className="insights-rail__header">
      <p className="insights-rail__eyebrow">On the journal</p>
      <h2 className="insights-rail__title">Insights fueling the next wave of imaginative marketing.</h2>
    </header>
    <div className="insights-rail__cards">
      {insights.map((insight) => (
        <article key={insight.title} className="insight-card">
          <div className="insight-card__meta">
            <span>{insight.category}</span>
            <span>{insight.time}</span>
          </div>
          <h3 className="insight-card__title">{insight.title}</h3>
          <button type="button" className="insight-card__button">
            Read story
            <span className="insight-card__icon" aria-hidden="true">→</span>
          </button>
        </article>
      ))}
    </div>
  </section>
);

export default InsightsRail;
