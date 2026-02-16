import { Link, useLocation } from 'react-router-dom';

export default function AppNavbar() {
    const location = useLocation();
    const pathname = location.pathname;

    const isActive = (path) => pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 h-[80px] bg-main border-b border-main z-50 px-8 flex items-center justify-between print:hidden">
            <div className="flex items-center gap-8">
                <Link to="/resume" className="text-xl font-bold tracking-tight text-main" style={{ fontFamily: 'var(--font-serif)' }}>
                    AI Resume Builder
                </Link>
                <div className="h-6 w-px bg-border mx-2"></div>
                <div className="flex items-center gap-6">
                    <Link
                        to="/resume/builder"
                        className={`text-sm font-medium transition-colors ${isActive('/resume/builder') ? 'text-accent' : 'text-muted hover:text-main'}`}
                    >
                        Builder
                    </Link>
                    <Link
                        to="/resume/preview"
                        className={`text-sm font-medium transition-colors ${isActive('/resume/preview') ? 'text-accent' : 'text-muted hover:text-main'}`}
                    >
                        Preview
                    </Link>
                    <Link
                        to="/resume/proof"
                        className={`text-sm font-medium transition-colors ${isActive('/resume/proof') ? 'text-accent' : 'text-muted hover:text-main'}`}
                    >
                        Proof
                    </Link>
                </div>
            </div>

            <div>
                <Link
                    to="/resume/builder"
                    className="px-4 py-2 bg-main border border-main rounded-sm text-sm font-medium text-main hover:bg-card transition-colors"
                >
                    New Resume
                </Link>
            </div>
        </nav>
    );
}
