

import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import ProofFooter from './ProofFooter';
import ContextHeader from './ContextHeader';

const STEP_DATA: Record<number, { title: string; description: string }> = {
    1: { title: "Step 1: Define the Problem", description: "Clearly articulate the user's pain points and the solution's value proposition." },
    2: { title: "Step 2: Market Analysis", description: "Understand the competitive landscape and identify your unique advantage." },
    3: { title: "Step 3: App Architecture", description: "Define the technical foundation and data flow of your application." },
    4: { title: "Step 4: High-Level Design", description: "Break down the system into modules, APIs, and database schemas." },
    5: { title: "Step 5: Low-Level Design", description: "Dive into the specifics: Component props, identifying state, and API contracts." },
    6: { title: "Step 6: Build & Implement", description: "Start coding the application based on the LLD. Focus on the core user loop." },
    7: { title: "Step 7: Test & Refine", description: "Ensure the application is robust, bug-free, and delightful to use." },
    8: { title: "Step 8: Ship & Deploy", description: "Launch your application to the world. Ensure everything is production-ready." },
};

export default function RBLayoutShell({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation();

    const getStepNumber = (path: string) => {
        const match = path.match(/\/rb\/(\d+)-/);
        return match ? parseInt(match[1], 10) : 0;
    };

    const currentStep = getStepNumber(pathname);
    const isProofPage = pathname === '/rb/proof';
    const stepData = STEP_DATA[currentStep];

    return (
        <>
            <TopBar stepInfo={currentStep > 0 ? `Step ${currentStep} of 8` : isProofPage ? "Final Proof" : ""} />

            <main className={`min-h-screen bg-main ${isProofPage ? 'block' : 'flex'}`} style={{ paddingTop: '80px' }}>
                {/* Main Workspace */}
                <div className={isProofPage ? 'w-full' : 'flex flex-col'} style={{ width: isProofPage ? '100%' : '70%', paddingBottom: '80px' }}>
                    {/* Context Header (Sticky, only for steps) */}
                    {!isProofPage && stepData && <ContextHeader title={stepData.title} description={stepData.description} />}

                    {/* Page Content */}
                    <div className="flex-1">
                        {children}
                    </div>
                </div>

                {/* Build Panel Placeholder -> handled by fixed position component.
            We leave empty space here to preserve layout flow if needed, but flex handles it. 
        */}
            </main>

            {!isProofPage && currentStep > 0 && <ProofFooter currentStep={currentStep} />}
        </>
    );
}
