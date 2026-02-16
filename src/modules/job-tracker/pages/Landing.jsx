import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="kn-route-page">
            <h1 className="kn-route-page__title">Stop Missing The Right Jobs.</h1>
            <p className="kn-route-page__subtext" style={{ marginBottom: 'var(--kn-space-4)' }}>
                Precision-matched job discovery delivered daily at 9AM.
            </p>
            <Link to="/settings" className="kn-btn kn-btn--primary">
                Start Tracking
            </Link>
        </div>
    );
}
