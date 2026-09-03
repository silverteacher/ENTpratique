import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../data/navigation';
import './Sidebar.css';

export default function Sidebar({ toolsExploredCount, totalTools }) {
  const ratio = totalTools > 0 ? toolsExploredCount / totalTools : 0;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">EP</div>
        <div>
          <div className="sidebar-brand-name">ENT Pratique</div>
          <div className="sidebar-brand-sub">Guide des outils numériques</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-progress">
        <div className="sidebar-progress-label">
          <span>Outils explorés</span>
          <span>{toolsExploredCount}/{totalTools}</span>
        </div>
        <div className="sidebar-progress-track">
          <div className="sidebar-progress-fill" style={{ width: `${ratio * 100}%` }} />
        </div>
      </div>
    </aside>
  );
}
