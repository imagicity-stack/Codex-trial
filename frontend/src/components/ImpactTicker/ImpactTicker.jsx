import './ImpactTicker.css';

const stats = [
  '12+ years orchestrating growth stories',
  '45M earned engagements ignited',
  '92% client retention over the last 4 years',
  'Global pods across 6 timezones',
];

const ImpactTicker = () => (
  <section className="impact-ticker" aria-label="Agency impact highlights">
    <div className="impact-ticker__mask">
      <div className="impact-ticker__track">
        {[...stats, ...stats].map((item, index) => (
          <span key={`${item}-${index}`} className="impact-ticker__item">
            {item}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactTicker;
