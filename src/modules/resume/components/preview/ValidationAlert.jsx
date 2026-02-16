
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

// interface ValidationAlertProps {
//     missingFields: string[];
// }

export default function ValidationAlert({ suggestions = [] }) {
    const [visible, setVisible] = useState(true);

    if (!visible || suggestions.length === 0) return null;

    return (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-sm flex items-start justify-between print:hidden max-w-[816px] w-full mx-auto">
            <div className="flex gap-3">
                <AlertTriangle className="text-yellow-600 shrink-0" size={20} />
                <div>
                    <h3 className="text-sm font-bold text-yellow-800">Your resume may look incomplete</h3>
                    <ul className="mt-1 list-disc list-inside text-xs text-yellow-700">
                        {missingFields.map((field, index) => (
                            <li key={index}>{field}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <button onClick={() => setVisible(false)} className="text-yellow-500 hover:text-yellow-700">
                <X size={16} />
            </button>
        </div>
    );
}
