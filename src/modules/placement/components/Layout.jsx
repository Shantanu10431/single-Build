import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Code, FileCheck, BookOpen, User, LogOut, CheckSquare, Package, Medal, ExternalLink } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed inset-y-0">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <Link to="/placement/dashboard" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                    <Code className="w-6 h-6" />
                    <span>Placement Prep</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <NavItem to="/placement/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
                <NavItem to="/placement/analysis/new" icon={<FileCheck />} label="JD Analysis" />
                <NavItem to="/placement/analysis/history" icon={<BookOpen />} label="History" />
                <NavItem to="/placement/practice" icon={<Code />} label="Practice" />
                <NavItem to="/placement/assessments" icon={<FileCheck />} label="Assessments" />
                <NavItem to="/placement/resources" icon={<BookOpen />} label="Resources" />

                <NavItem to="/placement/profile" icon={<User />} label="Profile" />

                <div className="pt-4 mt-2">
                    <p className="px-4 text-xs font-semibold text-indigo-400 uppercase mb-2">Projects</p>
                    <NavItem to="/placement/rb/01-problem" icon={<FileCheck />} label="AI Resume Builder" />
                </div>

                <div className="pt-4 border-t border-indigo-800">
                    <p className="px-4 text-xs font-semibold text-indigo-400 uppercase mb-2">Internal</p>
                    <NavItem to="/placement/prp/07-test" icon={<CheckSquare />} label="Test Checklist" />
                    <NavItem to="/placement/prp/08-ship" icon={<Package />} label="Ship" />
                    <NavItem to="/placement/prp/proof" icon={<Medal />} label="Proof" />
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4">
                    <Link to="/jobs" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors">
                        <ExternalLink className="w-5 h-5" />
                        Job Tracker ↗
                    </Link>
                </div>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md w-full transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

const NavItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`
        }
    >
        {React.cloneElement(icon, { className: "w-5 h-5" })}
        {label}
    </NavLink>
);

const Header = () => (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:pl-72 fixed inset-x-0 top-0 z-10">
        <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                US
            </div>
        </div>
    </header>
);

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <Header />
            <main className="pt-16 md:pl-64 min-h-screen">
                <div className="p-6 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
