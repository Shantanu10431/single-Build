import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="kn-app-layout">
            <Navbar />
            <main className="kn-app-main">
                {children}
            </main>
        </div>
    );
}
