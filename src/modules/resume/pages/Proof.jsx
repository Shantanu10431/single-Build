import React from 'react';
import AppNavbar from '../components/layout/AppNavbar';

export default function ProofPage() {
    return (
        <>
            <AppNavbar />
            <div className="pt-[160px] min-h-screen bg-main flex flex-col items-center text-center p-8">
                <div className="max-w-xl space-y-6">
                    <h1 className="text-3xl font-bold font-serif text-main">Proof of Work</h1>
                    <p className="text-muted">
                        This page will collect submission artifacts once the project logic is fully implemented.
                    </p>

                    <div className="p-12 border border-dashed border-main bg-card rounded-sm text-sm text-muted">
                        Artifact Upload Placeholder
                    </div>
                </div>
            </div>
        </>
    );
}
