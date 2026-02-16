import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Footer } from '../components/landing/Footer';

export default function Landing() {
    return (
        <main className="min-h-screen flex flex-col placement-layout">
            <Hero />
            <Features />
            <div className="flex-grow"></div>
            <Footer />
        </main>
    );
}
