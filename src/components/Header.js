import React from 'react';
import { profileData } from '../data/profileData';
import Section from './Section'; // Assuming Section wrapper for consistency

const Header = () => {
  return (
    <Section id="home" className="bg-gradient-to-r from-blue-100 to-pink-100 text-center pt-24 pb-20 md:pt-32 md:pb-28">
        <h1 className="text-4xl md:text-6xl font-bold text-dark-text mb-4">
          {profileData.name}
        </h1>
        <p className="text-xl md:text-2xl text-medium-text mb-8">
          {profileData.title}
        </p>
        <div className="space-x-4">
          <a
            href={`mailto:${profileData.contact}`}
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow"
          >
            Contact Me
          </a>
          {/* Optional: Add a Resume Download button */}
          {/* <a href="/path/to/your/resume.pdf" download className="inline-block bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition duration-300 shadow">
            Download Resume
          </a> */}
        </div>
    </Section>
  );
};

export default Header;