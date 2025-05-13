import React from 'react';
import { motion } from 'framer-motion';

// Define animation variants
const sectionVariants = {
  hidden: { // State when section is not visible / animating out
    opacity: 0,
    y: 50, // Start 50px below final position
    // scale: 0.95, // Optional: subtle scale effect
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  visible: { // State when section is visible / animating in
    opacity: 1,
    y: 0,
    // scale: 1,
    transition: { duration: 0.7, ease: "easeInOut", delay: 0.2 } // Add slight delay
  },
  exit: { // State when section is animating out (needs AnimatePresence in parent)
     opacity: 0,
     y: -50, // Exit upwards
     // scale: 0.95,
     transition: { duration: 0.5, ease: "easeInOut" }
  }
};

// This component wraps the actual content (AboutContent, ExperienceContent, etc.)
const AnimatedSection = ({ children, id, className = '' }) => {
  return (
    // Use motion.section or motion.div
    // Key prop is important for AnimatePresence to track elements
    <motion.section
      key={id} // Use a unique key for each section instance
      id={id}
      className={`min-h-screen flex items-center justify-center ${className}`} // Ensure sections take space
      variants={sectionVariants}
      initial="hidden" // Start hidden
      animate="visible" // Animate to visible when mounted/state allows
      exit="exit"       // Animate to exit when removed by AnimatePresence
    >
      {/* Render the actual content passed to it */}
      {children}
    </motion.section>
  );
};

export default AnimatedSection;