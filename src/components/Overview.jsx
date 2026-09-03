import { useNavigate } from 'react-router-dom';
import { TOOLS, CATEGORIES } from '../data/tools';
import { CHALLENGES } from '../data/challenges';
import { COMBOS } from '../data/combos';
import PageHeader from './PageHeader';
import './Overview.css';

export default function Overview({ progress }) {
  const navigate = useNavigate();
  const { discoveredTools, completedChallenges, exploredCombos } = progress;

  const stats = [
    { label: 'Outils explorés', value: discoveredTools.size, total: TOOLS.length },
    { label: 'Défis relevés', value: completedChallenges.size, total: CHALLENGES.length },
    { label: 'Combinaisons vues', value: exploredCombos.size, total: COMBOS.length },
  ];

  const categoryCounts = Object.entries(CATEGORIES).map(([key, meta]) => ({
    key,
    ...meta,
    count: TOOLS.filter((t) => t.category === key).length,
  }));

  return (
    <div>
      <PageHeader
        title="Vue d'ensemble"
        subtitle="Un point de départ pour choisir le bon outil numérique selon votre projet pédagogique."
        action={
          <button className="btn btn-primary" onClick={() => navigate('/trouver')}>
            Trouver un outil
          </button>
        }
      />

      <div className="overview-stats">
        {stats.map((stat) => (
          <div className="card overview-stat" key={stat.label}>
            <div className="overview-stat-value">
              {stat.value}
              <span className="overview-stat-total">/{stat.total}</span>
            </div>
            <div className="overview-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="overview-grid">
        <div className="card overview-panel">
          <h2 className="overview-panel-title">Répartition par catégorie</h2>
          <div className="overview-categories">
            {categoryCounts.map((cat) => (
              <div className="overview-category-row" key={cat.key}>
                <span className="overview-category-label" style={{ color: cat.color }}>
                  <span className="badge-dot" style={{ background: cat.color }} />
                  {cat.label}
                </span>
                <span className="overview-category-count">{cat.count} outils</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card overview-panel">
          <h2 className="overview-panel-title">Comment démarrer</h2>
          <ol className="overview-steps">
            <li>
              <strong>Trouvez un outil</strong> — répondez à 4 questions sur votre projet pour recevoir des
              recommandations ciblées.
            </li>
            <li>
              <strong>Explorez la bibliothèque</strong> — parcourez les 12 outils disponibles, filtrés par
              catégorie.
            </li>
            <li>
              <strong>Combinez plusieurs outils</strong> — inspirez-vous des combinaisons éprouvées pour des
              projets plus ambitieux.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
