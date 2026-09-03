import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../data/navigation';
import './MobileNav.css';

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-brand">ENT Pratique</div>
      <div className="mobile-nav-links">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
