import { useEffect } from 'react';
import CategoryBadge from './CategoryBadge';
import './ToolDetailPanel.css';

export default function ToolDetailPanel({ tool, discovered, onClose, onMarkExplored }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  if (!tool) return null;

  return (
    <div className="panel-overlay" onClick={onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <CategoryBadge category={tool.category} />
          <button className="btn btn-ghost panel-close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        <h2 className="panel-title">{tool.name}</h2>
        <p className="panel-description">{tool.description}</p>

        <div className="panel-section">
          <h3>Conseils d'utilisation</h3>
          <ul>
            {tool.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="panel-section">
          <h3>Cas d'usage</h3>
          <div className="panel-tags">
            {tool.useCases.map((useCase) => (
              <span key={useCase} className="panel-tag">
                {useCase}
              </span>
            ))}
          </div>
        </div>

        <div className="panel-footer">
          <button
            className={`btn ${discovered ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => onMarkExplored(tool.id)}
          >
            {discovered ? '✓ Marqué comme exploré' : 'Marquer comme exploré'}
          </button>
        </div>
      </div>
    </div>
  );
}
