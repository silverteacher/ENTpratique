import CategoryBadge from './CategoryBadge';
import './ToolCard.css';

export default function ToolCard({ tool, discovered, onOpen }) {
  return (
    <button className="tool-card" onClick={() => onOpen(tool)}>
      <div className="tool-card-top">
        <CategoryBadge category={tool.category} />
        {discovered && <span className="tool-card-discovered">Exploré</span>}
      </div>
      <div className="tool-card-name">{tool.name}</div>
      <p className="tool-card-summary">{tool.summary}</p>
      <div className="tool-card-footer">
        <span className="tool-card-difficulty">
          {'●'.repeat(tool.difficulty)}
          {'○'.repeat(3 - tool.difficulty)}
        </span>
        <span className="tool-card-link">Voir la fiche →</span>
      </div>
    </button>
  );
}
