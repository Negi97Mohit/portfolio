import React from 'react';
import { experience } from '../data/experienceData';

const ExperienceContent = () => {
  return (
    <>
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 mb-6 drop-shadow-sm">
        Work Experience
      </h2>

      {/* Experience List */}
      <div className="space-y-5">
        {experience.map((job) => (
          <div
            key={job.id}
            className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Role & Duration */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1.5">
              <h3 className="text-base font-semibold text-gray-800">{job.role}</h3>
              <p className="text-sm text-gray-500 sm:mt-0 mt-1">{job.duration}</p>
            </div>

            {/* Company */}
            <p className="text-sm font-medium text-blue-600 mb-1">{job.company}</p>

            {/* Bullet Description */}
            {job.description?.length > 0 && (
              <ul className="list-disc list-inside space-y-1 mt-1">
                {job.description.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ExperienceContent;
