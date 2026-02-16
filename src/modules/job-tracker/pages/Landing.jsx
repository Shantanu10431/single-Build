import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center job-tracker-layout">
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-foreground mb-6 max-w-4xl">
                Stop Missing The Right Jobs.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                Precision-matched job discovery delivered daily at 9AM.
                <br className="hidden md:block" />
                No noise, just relevance.
            </p>

            <Link to="/jobs/settings">
                <Button className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all">
                    Start Tracking
                </Button>
            </Link>
        </div>
    );
}
