import { CHALLENGES } from '../data/challenges';
import { getToolById } from '../data/tools';
import PageHeader from './PageHeader';
import './Challenges.css';

const DIFFICULTY_COLOR = {
  Facile: 'var(--color-success)',
  Intermédiaire: 'var(--color-warning)',
  Difficile: 'var(--color-danger)',
};

export default function Challenges({ progress, onComplete }) {
  return (
    <div>
      <PageHeader
        title="Défis pédagogiques"
        subtitle="Des mises en situation concrètes pour tester un outil ou une combinaison en classe."
      />

      <div className="challenges-list">
        {CHALLENGES.map((challenge) => {
          const done = progress.completedChallenges.has(challenge.id);
          return (
            <div className={`card challenge-card${done ? ' done' : ''}`} key={challenge.id}>
              <label className="challenge-checkbox">
                <input type="checkbox" checked={done} onChange={() => onComplete(challenge.id)} />
                <span className="challenge-checkmark" />
              </label>

              <div className="challenge-body">
                <div className="challenge-top">
                  <h2 className="challenge-title">{challenge.title}</h2>
                  <span
                    className="challenge-difficulty"
                    style={{ color: DIFFICULTY_COLOR[challenge.difficulty] }}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="challenge-objective">{challenge.objective}</p>

                <div className="challenge-tools">
                  {challenge.tools.map((toolId) => (
                    <span className="challenge-tool-tag" key={toolId}>
                      {getToolById(toolId)?.name}
                    </span>
                  ))}
                </div>

                <ul className="challenge-tips">
                  {challenge.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
