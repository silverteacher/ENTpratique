import { useMemo, useState } from 'react';
import { TOOLS, CATEGORIES } from '../data/tools';
import PageHeader from './PageHeader';
import ToolCard from './ToolCard';
import './ToolLibrary.css';

export default function ToolLibrary({ progress, onOpenTool }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesQuery =
        query.trim() === '' || tool.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div>
      <PageHeader title="Bibliothèque d'outils" subtitle="Parcourez l'ensemble des outils disponibles dans l'ENT." />

      <div className="library-controls">
        <input
          className="library-search"
          type="text"
          placeholder="Rechercher un outil..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="library-filters">
          <button
            className={`library-filter${activeCategory === 'all' ? ' active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            Tous
          </button>
          {Object.entries(CATEGORIES).map(([key, meta]) => (
            <button
              key={key}
              className={`library-filter${activeCategory === key ? ' active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {meta.label}
            </button>
          ))}
        </div>
      </div>

      <div className="library-grid">
        {filtered.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            discovered={progress.discoveredTools.has(tool.id)}
            onOpen={onOpenTool}
          />
        ))}
        {filtered.length === 0 && <p className="library-empty">Aucun outil ne correspond à cette recherche.</p>}
      </div>
    </div>
  );
}
