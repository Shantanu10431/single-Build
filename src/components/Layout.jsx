import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FileText, Briefcase, Bell } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.startsWith(path)
            ? "bg-blue-100 text-blue-700 font-medium"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Career Platform
                    </h1>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    <Link
                        to="/resume"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive('/resume')}`}
                    >
                        <FileText size={20} />
                        <span>AI Resume Builder</span>
                    </Link>

                    <Link
                        to="/placement"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive('/placement')}`}
                    >
                        <Briefcase size={20} />
                        <span>Placement Readiness</span>
                    </Link>

                    <Link
                        to="/jobs"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive('/jobs')}`}
                    >
                        <Bell size={20} />
                        <span>Job Tracker</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="bg-blue-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-blue-900 mb-1">Need Help?</h3>
                        <p className="text-xs text-blue-700">Contact support for assistance with your placement journey.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 md:hidden p-4 flex items-center justify-between">
                    <h1 className="text-lg font-bold">Career Platform</h1>
                    {/* Mobile menu button could go here */}
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
