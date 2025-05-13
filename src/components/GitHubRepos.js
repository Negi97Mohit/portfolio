import React, { useState } from 'react';

const languageColors = {
  JavaScript: 'bg-yellow-300 text-yellow-900',
  TypeScript: 'bg-blue-300 text-blue-900',
  Python: 'bg-green-300 text-green-900',
  SQL: 'bg-purple-300 text-purple-900',
  Swift: 'bg-pink-300 text-pink-900',
  Terraform: 'bg-orange-300 text-orange-900',
  default: 'bg-gray-200 text-gray-700',
};

const GitHubReposContent = () => {
  const [repos] = useState([
    { id: 1, name: "WallofShade", description: "Social Accountability Platform", language: "JS, Python", html_url: "https://github.com/Negi97Mohit/WallofShade/tree/master" },
    { id: 2, name: "FUJM.org", description: "AI JobBoard", language: "TypeScript, JS, Python, SQL", html_url: "https://github.com/Negi97Mohit/cream" },
    { id: 3, name: "CandiReply", description: "AI Candidate Reply on their job application", language: "TypeScript, JS, Python", html_url: "https://github.com/Negi97Mohit/candi-reply" },
    { id: 4, name: "AI Screen by fujm", description: "ChatGPT for your chrome tab", language: "JavaScript", html_url: "https://github.com/Negi97Mohit/fujm-extensions" },
    { id: 5, name: "FoodMe MealApp", description: "Meal app for Northeastern University", language: "Swift, JavaScript", html_url: "https://github.com/Negi97Mohit/MealApp" },
    { id: 6, name: "NY Times Dashboard", description: "Streamlit Dashboard Ranking Model", language: "Python, SQL, Terraform", html_url: "https://github.com/Negi97Mohit/NY-Times-Project" },
    { id: 7, name: "H&M Rec", description: "H&M recommendation streamlit dashboard", language: "Python, SQL", html_url: "https://github.com/Negi97Mohit/H-M-Recommendation-System" },
    { id: 8, name: "TSLA Trading Algos", description: "LSTM, GARCH, ARCH, XGBoost trading models", language: "Python", html_url: "https://github.com/Negi97Mohit/LSTM-XGBoost-Random_Forest-TSLA" },
    { id: 9, name: "COVID-19 Img Classification", description: "ResNet, CNN Image Classification models", language: "Python", html_url: "https://github.com/Negi97Mohit/Covid-19-Image-Classification" },
  ]);

  return (
    <div className="github-repos-container">
      <h2 className="text-xl font-bold text-center mb-4 text-indigo-700">GitHub Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map(repo => (
          <div
            key={repo.id}
            className="repo-card bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-2"
            >
              <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                {repo.name}
              </h3>
            </a>
            <p className="text-gray-800 mb-3">{repo.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {(repo.language || '')
                .split(',')
                .map(lang => lang.trim())
                .map((lang, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      languageColors[lang] || languageColors.default
                    }`}
                  >
                    {lang}
                  </span>
                ))}
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              GitHub →
            </a>
          </div>
        ))}
      </div>

      <style jsx>{`
        .github-repos-container {
          max-height: calc(100% - 40px);
          overflow-y: auto;
          padding: 0 8px;
        }
        .repo-card {
          transition: all 0.2s ease;
        }
        .repo-card:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default GitHubReposContent;
