

// import { ResumeData, TemplateType } from '@/modules/resume/types/resume';
import { MapPin, Mail, Phone, ExternalLink, Github, Linkedin, Briefcase, GraduationCap, Code, Globe } from 'lucide-react';

export default function ResumePreview({ data }) {
    const { personalInfo, summary, experience, education, projects, skills, template } = data;
    const accentColor = data.accentColor || '#0d9488'; // Default Teal

    // Template Configurations
    const getStyles = (tpl = 'classic') => {
        switch (tpl) {
            case 'modern':
                return {
                    container: 'font-sans',
                    header: 'hidden', // Modern uses a sidebar layout
                    name: 'text-4xl font-extrabold tracking-tight uppercase leading-none',
                    infoGroup: 'flex flex-col gap-2 text-xs text-white/90 mt-6',
                    sectionHeader: 'text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 border-b-2 pb-1',
                    bodyText: 'text-sm text-gray-700 leading-relaxed',
                };
            case 'minimal':
                return {
                    container: 'font-sans',
                    header: 'flex flex-col items-start pb-6 mb-6',
                    name: 'text-3xl font-light tracking-wide lowercase text-gray-900',
                    infoGroup: 'flex flex-wrap gap-4 text-xs text-gray-400 mt-3',
                    sectionHeader: 'text-xs font-bold uppercase tracking-[0.2em] mb-4 mt-8', // No borders
                    bodyText: 'text-sm text-gray-600 font-light leading-loose',
                };
            default: // Classic
                return {
                    container: 'font-serif',
                    header: 'flex flex-col items-center border-b-2 pb-6 mb-6 text-center',
                    name: 'text-4xl font-bold uppercase tracking-wider mb-2 font-serif',
                    infoGroup: 'flex flex-wrap justify-center gap-4 text-xs text-gray-600 mt-2',
                    sectionHeader: 'text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3 flex items-center gap-2 font-serif',
                    bodyText: 'text-sm text-gray-800 leading-relaxed text-justify font-sans',
                };
        }
    };

    const styles = getStyles(template);

    // Modern Layout Render
    if (template === 'modern') {
        return (
            <div className="bg-white text-black min-h-[1056px] w-[816px] shadow-md mx-auto print:shadow-none print:w-full print:h-full flex overflow-hidden font-sans">
                {/* Left Sidebar */}
                <aside className="w-[32%] text-white p-8 pt-12 flex flex-col gap-8 print:bg-gray-800 print:text-white" style={{ backgroundColor: accentColor }}>
                    {/* Name & Contact */}
                    <div>
                        <h1 className="text-3xl font-extrabold uppercase leading-tight mb-4">{personalInfo.fullName || 'Your Name'}</h1>
                        <div className="space-y-2 text-xs opacity-90">
                            {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={12} /> {personalInfo.location}</div>}
                            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} /> {personalInfo.email}</div>}
                            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12} /> {personalInfo.phone}</div>}
                            {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={12} /> {personalInfo.linkedin.replace(/^https?:\/\//, '')}</div>}
                            {personalInfo.github && <div className="flex items-center gap-2"><Github size={12} /> {personalInfo.github.replace(/^https?:\/\//, '')}</div>}
                        </div>
                    </div>

                    {/* Education (Sidebar) */}
                    {education.some(e => e.school) && (
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-3 opacity-80">Education</h3>
                            <div className="space-y-4">
                                {education.filter(e => e.school).map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-bold text-sm">{edu.school}</div>
                                        <div className="text-xs opacity-80">{edu.degree}</div>
                                        <div className="text-[10px] opacity-70 mt-0.5">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills (Sidebar) */}
                    {(skills.technical.length > 0 || skills.soft.length > 0) && (
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-3 opacity-80">Skills</h3>
                            {skills.technical.length > 0 && (
                                <div className="mb-3">
                                    <div className="text-[10px] uppercase opacity-70 mb-1">Technical</div>
                                    <div className="flex flex-wrap gap-1">
                                        {skills.technical.map(s => <span key={s} className="text-xs bg-white/20 px-2 py-0.5 rounded-sm">{s}</span>)}
                                    </div>
                                </div>
                            )}
                            {skills.soft.length > 0 && (
                                <div>
                                    <div className="text-[10px] uppercase opacity-70 mb-1">Soft Skills</div>
                                    <div className="flex flex-wrap gap-1">
                                        {skills.soft.map(s => <span key={s} className="text-xs bg-white/20 px-2 py-0.5 rounded-sm">{s}</span>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </aside>

                {/* Right Content */}
                <main className="flex-1 p-8 pt-12 space-y-8 bg-white">
                    {/* Summary */}
                    {summary && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: accentColor }}>
                                <Briefcase size={18} /> Profile
                            </h2>
                            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.some(e => e.company || e.role) && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                                <Briefcase size={18} /> Experience
                            </h2>
                            <div className="space-y-6">
                                {experience.filter(e => e.company || e.role).map(exp => (
                                    <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: accentColor + '40' }}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-base text-gray-900">{exp.role}</h3>
                                            <span className="text-xs font-semibold" style={{ color: accentColor }}>{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="text-sm font-medium text-gray-600 mb-2">{exp.company}</div>
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                                <Globe size={18} /> Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {projects.map(proj => (
                                    <div key={proj.id} className="bg-gray-50 p-4 rounded-sm border-l-4" style={{ borderColor: accentColor }}>
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold text-sm text-gray-900">{proj.name}</h3>
                                            <div className="flex gap-2 text-gray-500">
                                                {proj.liveUrl && <ExternalLink size={12} />}
                                                {proj.githubUrl && <Github size={12} />}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2 leading-relaxed">{proj.description}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {(proj.technologies || []).map(t => (
                                                <span key={t} className="text-[10px] px-1.5 py-0.5 bg-white border border-gray-200 rounded-sm text-gray-600">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        )
    }

    // Classic & Minimal Render
    return (
        <div className={`bg-white text-black min-h-[1056px] w-[816px] p-12 shadow-md mx-auto print:shadow-none print:w-full print:h-full ${styles.container}`}>
            {/* Header */}
            <header className={styles.header} style={{ borderColor: template === 'classic' ? accentColor : undefined }}>
                <div>
                    <h1 className={styles.name} style={{ color: template === 'minimal' ? accentColor : undefined }}>{personalInfo.fullName || 'Your Name'}</h1>
                    {template === 'minimal' && <p className="text-gray-500 text-sm mt-1">{personalInfo.location}</p>}
                </div>

                <div className={styles.infoGroup}>
                    {template !== 'minimal' && personalInfo.location && (
                        <div className="flex items-center gap-1">
                            {template === 'classic' && <MapPin size={12} style={{ color: accentColor }} />}
                            <span>{personalInfo.location}</span>
                        </div>
                    )}
                    {personalInfo.email && (
                        <div className="flex items-center gap-1">
                            {template !== 'modern' && <Mail size={12} style={{ color: accentColor }} />}
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            {template !== 'modern' && <Phone size={12} style={{ color: accentColor }} />}
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            {template !== 'modern' && <Linkedin size={12} style={{ color: accentColor }} />}
                            <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                        </div>
                    )}
                    {personalInfo.github && (
                        <div className="flex items-center gap-1">
                            {template !== 'modern' && <Github size={12} style={{ color: accentColor }} />}
                            <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="space-y-6">
                {/* Summary */}
                {summary && (
                    <section>
                        <h2 className={styles.sectionHeader} style={{ color: accentColor, borderColor: template === 'classic' ? accentColor : undefined }}>
                            {template === 'classic' && <Briefcase size={14} />}
                            Professional Summary
                        </h2>
                        <p className={styles.bodyText}>{summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experience.some(e => e.company || e.role) && (
                    <section>
                        <h2 className={styles.sectionHeader} style={{ color: accentColor, borderColor: template === 'classic' ? accentColor : undefined }}>
                            {template === 'classic' && <Briefcase size={14} />}
                            Experience
                        </h2>
                        <div className="space-y-4">
                            {experience.filter(e => e.company || e.role).map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base">{exp.role}</h3>
                                        <span className="text-xs text-gray-500 font-medium">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-semibold mb-1" style={{ color: accentColor }}>{exp.company}</div>
                                    <p className={`${styles.bodyText} whitespace-pre-wrap`}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h2 className={styles.sectionHeader} style={{ color: accentColor, borderColor: template === 'classic' ? accentColor : undefined }}>
                            {template === 'classic' && <Globe size={14} />}
                            Projects
                        </h2>
                        <div className="space-y-3">
                            {projects.map((proj) => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-base">{proj.name}</h3>
                                            <div className="flex gap-2">
                                                {proj.liveUrl && <ExternalLink size={12} className="text-gray-400 print:text-black" />}
                                                {proj.githubUrl && <Github size={12} className="text-gray-400 print:text-black" />}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1 justify-end max-w-[50%]">
                                            {(proj.technologies || []).map((tech, i) => (
                                                <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-sm print:bg-transparent print:border print:border-gray-300">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className={styles.bodyText}>{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {(skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0) && (
                    <section>
                        <h2 className={styles.sectionHeader} style={{ color: accentColor, borderColor: template === 'classic' ? accentColor : undefined }}>
                            {template === 'classic' && <Code size={14} />}
                            Skills
                        </h2>

                        <div className="space-y-3">
                            {skills.technical.length > 0 && (
                                <div className="flex gap-2">
                                    <span className="text-xs font-bold w-24 shrink-0 mt-0.5">Technical:</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skills.technical.map((s, i) => (
                                            <span key={i} className="text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded-sm print:bg-transparent print:border print:border-gray-200">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {skills.soft.length > 0 && (
                                <div className="flex gap-2">
                                    <span className="text-xs font-bold w-24 shrink-0 mt-0.5">Soft Skills:</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skills.soft.map((s, i) => (
                                            <span key={i} className="text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded-sm print:bg-transparent print:border print:border-gray-200">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {skills.tools.length > 0 && (
                                <div className="flex gap-2">
                                    <span className="text-xs font-bold w-24 shrink-0 mt-0.5">Tools:</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skills.tools.map((s, i) => (
                                            <span key={i} className="text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded-sm print:bg-transparent print:border print:border-gray-200">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.some(e => e.school) && (
                    <section>
                        <h2 className={styles.sectionHeader} style={{ color: accentColor, borderColor: template === 'classic' ? accentColor : undefined }}>
                            {template === 'classic' && <GraduationCap size={14} />}
                            Education
                        </h2>
                        <div className="space-y-3">
                            {education.filter(e => e.school).map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-sm">{edu.school}</h3>
                                        <span className="text-xs text-gray-500 font-medium">{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <div className="text-xs text-gray-700 italic">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
