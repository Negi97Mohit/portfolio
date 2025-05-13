import React, { useState } from 'react';
import { profileData } from '../data/profileData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects' },
    { href: '#github', label: 'GitHub' },
    { href: '#contact', label: 'Contact' }, // Assuming Footer has contact info with id='contact'
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">
          {profileData.name}
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} className="text-gray-600 hover:text-primary transition-colors font-medium">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-center py-4 space-y-2">
            {navLinks.map(link => (
               <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-primary rounded w-full text-center"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;