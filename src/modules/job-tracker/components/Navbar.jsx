import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="kn-app-nav">
      <Link to="/jobs" className="kn-app-nav__brand">Job Notification Tracker</Link>

      <button className="kn-app-nav__burger" aria-label="Toggle navigation">
        <span className="kn-app-nav__burger-icon"></span>
      </button>

      <div className="kn-app-nav__links">
        <Link to="/jobs/dashboard" className={isActive('/jobs/dashboard')}>Dashboard</Link>
        <Link to="/jobs/saved" className={isActive('/jobs/saved')}>Saved</Link>
        <Link to="/jobs/digest" className={isActive('/jobs/digest')}>Digest</Link>
        <Link to="/jobs/proof" className={isActive('/jobs/proof')}>Proof</Link>

        <div className="flex items-center gap-4">
          <Link to="/placement" className="text-gray-600 hover:text-indigo-600 font-medium text-sm flex items-center gap-1">
            <span>Placement Platform</span>
            <span className="text-xs">↗</span>
          </Link>
          <Link to="/jobs/settings" className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
