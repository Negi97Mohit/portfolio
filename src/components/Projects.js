import React from 'react';
import { projects, getProjectCategoryStyle } from '../data/projectsData';

const techColorMap = {
  React: 'bg-blue-100 text-blue-800',
  'TensorFlow.js': 'bg-yellow-100 text-yellow-800',
  'Tailwind CSS': 'bg-teal-100 text-teal-800',
  'Node.js': 'bg-green-100 text-green-800',
  Python: 'bg-indigo-100 text-indigo-800',
  MongoDB: 'bg-green-200 text-green-900',
  Jenkins: 'bg-orange-100 text-orange-800',
  Docker: 'bg-blue-200 text-blue-900',
  Express: 'bg-gray-200 text-gray-900',
  FireStore: 'bg-amber-100 text-amber-900',
  OpenRender: 'bg-purple-100 text-purple-800',
  NLTK: 'bg-pink-100 text-pink-800',
  JS: 'bg-yellow-200 text-yellow-900',
};

const ProjectsContent = () => {
  return (
    <section className="px-6 py-10 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">
        🚀 Published WebApps & Extensions
      </h2>

      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${getProjectCategoryStyle(
                  project.category
                )}`}
              >
                {project.category}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-4 leading-relaxed">{project.description}</p>

            {project.technologies?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-widest">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        techColorMap[tech] || 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-5 mt-4">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  🔗 Live
                </a>
              )}
              {project.repoUrl && project.repoUrl !== '#' && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  💻 Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsContent;
