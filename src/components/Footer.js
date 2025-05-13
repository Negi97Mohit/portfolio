import React from 'react';
import { profileData } from '../data/profileData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <p className="text-lg font-semibold mb-2">Get in Touch</p>
          <a href={`mailto:${profileData.contact}`} className="hover:text-white transition-colors">
            {profileData.contact}
          </a>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          {profileData.github && (
            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          )}
          {profileData.linkedin && (
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          )}
          {/* Add other social links here */}
        </div>
        <p className="text-sm">&copy; {currentYear} {profileData.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;