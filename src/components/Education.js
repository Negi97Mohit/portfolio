import React from 'react';

const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" className="text-blue-600">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-5"/>
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" className="text-gray-500">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

export const education = [
  {
    id: 1,
    degree: "Master of Science in Information Systems",
    institution: "Northeastern University",
    duration: "2021 - 2023",
    details: "Focused on software engineering, system design, and data-driven decision making.",
  },
  {
    id: 2,
    degree: "Bachelor of Technology in Mechanical Engineering",
    institution: "Vellore Institute of Technology",
    duration: "2014 - 2018",
    details: "Covered core mechanical engineering principles with elective coursework in programming and automation.",
  },
];

const EducationContent = () => {
  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-teal-400 mb-6">
        Education
      </h2>

      {/* Education Cards */}
      <div className="space-y-6">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="bg-white/80 border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <GraduationCapIcon />
                {edu.degree}
              </h3>
              <span className="text-sm text-gray-500 mt-1 sm:mt-0">{edu.duration}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <BuildingIcon />
              <p className="text-sm font-medium text-gray-700">{edu.institution}</p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">{edu.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationContent;
