import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import PortfolioScene from './components/PortfolioScene';
import './index.css'; // Main Tailwind CSS

// Section content components
import AboutContent from './components/About';
import ExperienceContent from './components/Experience';
import EducationContent from './components/Education';
import ProjectsContent from './components/Projects';
import GitHubReposContent from './components/GitHubRepos';

// Local asset (GIF)
import localGif from './assets/goku-dragon-ball.gif'; 

// Panel background images
import aboutPanelBg from './assets/panel_placeholder.jpg';      
import experiencePanelBg from './assets/experience_panel_placeholder.jpg'; 
import educationPanelBg from './assets/education_panel_placeholder.jpg';   
import projectsPanelBg from './assets/app_panel_placeholder.jpg';      
import githubPanelBg from './assets/git_panel_placeholder.jpg';        

// Import the RotatingText component
import RotatingText from './components/RotatingText'; // Adjust path if you place it elsewhere

// Sections array - includes panelTexture for individual panel backgrounds
const sections = [
  { id: 'about', Component: AboutContent, panelTexture: aboutPanelBg },
  { id: 'experience', Component: ExperienceContent, panelTexture: experiencePanelBg },
  { id: 'education', Component: EducationContent, panelTexture: educationPanelBg },
  { id: 'projects', Component: ProjectsContent, panelTexture: projectsPanelBg },
  { id: 'github', Component: GitHubReposContent, panelTexture: githubPanelBg },
];

function App() {
  const portfolioSceneRef = useRef();

  const handleCanvasPointerMissed = (event) => {
    if (
      portfolioSceneRef.current &&
      typeof portfolioSceneRef.current.handleCanvasPointerMissed === 'function'
    ) {
      portfolioSceneRef.current.handleCanvasPointerMissed(event);
    }
  };

  // Texts for the rotating name
  const nameTexts = ["Portfolio", "webApps", "Ai Creations", "Extensions", "Tools"]; // You can add more texts here
  // Or if you want the full name to animate in parts:
  // const nameTexts = ["Mohit enji Negi"]; // and set splitBy to "characters" or "words"

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 50 }}
        onPointerMissed={handleCanvasPointerMissed}
        className="w-full h-full"
      >
        <PortfolioScene ref={portfolioSceneRef} sections={sections} />
      </Canvas>

      {/* Name + Title (Top Left) */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 pointer-events-none">
        {/* Using RotatingText for the name */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 
                       tracking-tight leading-tight 
                       drop-shadow-lg"
                       style={{ color: "#e8833f" }}>
          Mohit enji Negi
        </h1>
        <RotatingText
          texts={nameTexts} 
          // ADDED background, padding, and rounded corners to mainClassName
          mainClassName="inline-block w-fit text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight drop-shadow-lg px-3 py-1.5 rounded-lg"
          style={{ backgroundColor: "#e8833f" }} // Example: Tailwind gray-800
          elementLevelClassName="text-white from-gray-400 via-gray-200 to-gray-400" // Adjusted gradient for better contrast on dark bg
          staggerFrom={"first"} 
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }} 
          staggerDuration={0.05} 
          splitLevelClassName="overflow-hidden py-0.5" 
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          rotationInterval={3000} 
          splitBy="characters" 
          loop={true}
          auto={true}
        />
        </div>

      {/* Instructions (Bottom-Center Overlay) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-xs sm:text-sm text-gray-500">
        Scroll / Arrows to Rotate · Click / Enter to Expand or Collapse
      </div>

      {/* GIF (Bottom Left) */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 pointer-events-none">
        <img
          src={localGif}
          alt="" 
          aria-hidden="true"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://placehold.co/120x120/cccccc/ffffff?text=GIF+Error';
          }}
        />
      </div>
      {/* Made with Love (Bottom Right) */}
<div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 text-xs sm:text-sm text-gray-600 flex items-center gap-1">
  Made with
  <div className="text-red-500 heart-container">
    <svg 
      stroke="currentColor" 
      fill="none" 
      strokeWidth="2" 
      viewBox="0 0 24 24" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      height="1em" 
      width="1em" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  </div>
  by
  <a 
    target="_blank" 
    rel="noopener noreferrer"
    className="ml-1 text-base sm:text-lg font-semibold text-blue-800 hover:underline"
    href="https://github.com/Negi97Mohit"
  >
    this guy
  </a>
</div>

    </div>
  );
}

export default App;
