export const ProofFooter = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 px-6 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 mr-4">Proof of Work</h3>
                <div className="flex items-center space-x-8 text-sm font-medium text-gray-700">
                    <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 transition-colors">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent accent-accent" />
                        <span>UI Built</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 transition-colors">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent accent-accent" />
                        <span>Logic Working</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 transition-colors">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent accent-accent" />
                        <span>Test Passed</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 transition-colors">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent accent-accent" />
                        <span>Deployed</span>
                    </label>
                </div>
                <div>
                    {/* Optional: Add a button or status here */}
                </div>
            </div>
        </footer>
    );
};
