
// import { ResumeData } from '@/modules/resume/types/resume';

// interface FormSectionProps {
//     data: ResumeData;
//     updateData: (newData: ResumeData) => void;
// }

export default function PersonalInfoForm({ data, updateData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateData({
            ...data,
            personalInfo: {
                ...data.personalInfo,
                [name]: value,
            },
        });
    };

    return (
        <div className="card p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Personal Info</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-semibold text-muted mb-1 block">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={data.personalInfo.fullName}
                        onChange={handleChange}
                        className="input"
                        placeholder="e.g. Alex Morgan"
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold text-muted mb-1 block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data.personalInfo.email}
                        onChange={handleChange}
                        className="input"
                        placeholder="alex@example.com"
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold text-muted mb-1 block">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={data.personalInfo.phone}
                        onChange={handleChange}
                        className="input"
                        placeholder="+1 555 000 0000"
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold text-muted mb-1 block">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={data.personalInfo.location}
                        onChange={handleChange}
                        className="input"
                        placeholder="City, Country"
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold text-muted mb-1 block">LinkedIn</label>
                    <input
                        type="text"
                        name="linkedin"
                        value={data.personalInfo.linkedin || ''}
                        onChange={handleChange}
                        className="input"
                        placeholder="linkedin.com/in/..."
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold text-muted mb-1 block">GitHub</label>
                    <input
                        type="text"
                        name="github"
                        value={data.personalInfo.github || ''}
                        onChange={handleChange}
                        className="input"
                        placeholder="github.com/..."
                    />
                </div>
            </div>
        </div>
    );
}
