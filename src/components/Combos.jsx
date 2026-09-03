import { COMBOS } from '../data/combos';
import { getToolById } from '../data/tools';
import PageHeader from './PageHeader';
import './Combos.css';

export default function Combos({ progress, onExplore }) {
  return (
    <div>
      <PageHeader
        title="Combinaisons d'outils"
        subtitle="Des enchaînements éprouvés pour des séquences pédagogiques plus ambitieuses."
      />

      <div className="combos-list">
        {COMBOS.map((combo) => {
          const explored = progress.exploredCombos.has(combo.id);
          return (
            <div className="card combo-card" key={combo.id}>
              <div className="combo-card-header">
                <div>
                  <h2 className="combo-card-title">{combo.name}</h2>
                  <p className="combo-card-description">{combo.description}</p>
                </div>
                <div className="combo-card-meta">
                  <span className="combo-meta-item">{combo.difficulty}</span>
                  <span className="combo-meta-item">{combo.duration}</span>
                </div>
              </div>

              <div className="combo-steps">
                {combo.steps.map((step, idx) => {
                  const tool = getToolById(step.tool);
                  return (
                    <div className="combo-step" key={step.tool}>
                      <div className="combo-step-index">{idx + 1}</div>
                      <div>
                        <div className="combo-step-tool">{tool?.name}</div>
                        <div className="combo-step-action">{step.action}</div>
                      </div>
                      {idx < combo.steps.length - 1 && <div className="combo-step-connector">→</div>}
                    </div>
                  );
                })}
              </div>

              <div className="combo-card-footer">
                <button
                  className={`btn ${explored ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => onExplore(combo.id)}
                >
                  {explored ? '✓ Combinaison vue' : 'Marquer comme vue'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
