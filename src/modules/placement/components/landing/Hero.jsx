import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="bg-white py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                    Ace Your Placement
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                </p>
                <Link
                    to="/placement/dashboard"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors duration-200"
                >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
        </section>
    );
};
