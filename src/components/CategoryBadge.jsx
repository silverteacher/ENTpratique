import { CATEGORIES } from '../data/tools';

export default function CategoryBadge({ category }) {
  const meta = CATEGORIES[category];
  if (!meta) return null;
  return (
    <span className="badge" style={{ background: `${meta.color}1A`, color: meta.color }}>
      <span className="badge-dot" />
      {meta.label}
    </span>
  );
}
