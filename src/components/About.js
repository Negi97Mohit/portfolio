// src/components/About.js
import React from 'react';

const AboutContent = () => {
  const profile = {
    name: "Mohit Enji Negi",
    title: "AI Creator • Full Stack Dev • QA Engineer",
    bio: "Having fun building GenAI tools, full-stack products, and Chrome extensions with a focus on automation, usability, and impactful innovation. Would love to get paid doing soo, lol",
    passion_header: "Tech | Food | Memes | Kdrama",
    passion_text: "AKIRA (the Japanese movie) sparked my love for tech. Haven’t looked back since.",
    philosophy_header: "My Philosophy",
    philosophy: "Show up — that’s the first step.",
    contact_header: "Get in Touch",
    email: "mohit.snegi123@gmail.com",
    linkedin_profile_name: "mohit-singh-negi/",
    github_username: "Negi97Mohit"
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-3xl shadow-xl bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 text-gray-800 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-2 tracking-tight">
        {profile.name}
      </h2>
      <p className="text-center text-sm text-gray-600 italic mb-4">{profile.title}</p>

      <p className="text-sm text-gray-700 mb-6 leading-relaxed bg-white/60 rounded-xl p-4">
        {profile.bio}
      </p>

      {/* Passion Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-pink-600 mb-2 uppercase tracking-wide">
          {profile.passion_header}
        </h3>
        <p className="text-sm text-gray-800 bg-white/50 rounded-xl p-3 leading-relaxed">
          {profile.passion_text}
        </p>
      </div>

      {/* Philosophy */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">
          {profile.philosophy_header}
        </h3>
        <p className="text-sm text-gray-800 bg-white/50 rounded-xl p-3 leading-relaxed">
          {profile.philosophy}
        </p>
      </div>

      {/* Contact Section */}
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wide">
          {profile.contact_header}
        </h3>
        <div className="space-y-2 text-sm text-gray-800">
          <p>
            ✉️ Email: <a href={`mailto:${profile.email}`} className="text-indigo-700 hover:underline">{profile.email}</a>
          </p>
          {profile.linkedin_profile_name && (
            <p>
              🔗 LinkedIn: <a href={`https://linkedin.com/in/${profile.linkedin_profile_name}`} target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">
                linkedin.com/in/{profile.linkedin_profile_name}
              </a>
            </p>
          )}
          {profile.github_username && (
            <p>
              💻 GitHub: <a href={`https://github.com/${profile.github_username}`} target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">
                github.com/{profile.github_username}
              </a>
            </p>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">🚀 Thanks for dropping by!</p>
    </div>
  );
};

export default AboutContent;
