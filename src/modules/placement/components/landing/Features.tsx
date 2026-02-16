import { Code, Video, BarChart3 } from "lucide-react";

const features = [
    {
        title: "Practice Problems",
        description: "Solve curated coding challenges to sharpen your skills.",
        icon: Code,
    },
    {
        title: "Mock Interviews",
        description: "Simulate real interviews with AI-driven feedback.",
        icon: Video,
    },
    {
        title: "Track Progress",
        description: "Monitor your growth with detailed performance analytics.",
        icon: BarChart3,
    },
];

export const Features = () => {
    return (
        <section className="bg-secondary py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
