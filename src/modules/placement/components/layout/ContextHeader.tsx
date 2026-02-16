export const ContextHeader = ({ title, description }: { title: string; description: string }) => {
    return (
        <header className="py-10 px-6 max-w-7xl mx-auto w-full">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4 leading-tight">
                {title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl font-normal leading-relaxed">
                {description}
            </p>
        </header>
    );
};
