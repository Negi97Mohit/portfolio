export const projects = [
  {
    id: 1,
    title: "fujm.org",
    category: "AI WebApp", // Categories: 'AI Project', 'WebApp', 'Tool'
    description: "An AI JobBoard; upload your resume; get match for the jobs; smart apply.",
    technologies: ["React", "TensorFlow.js", "Tailwind CSS", "Node.js"],
    liveUrl: "https://fujm.org/", // Link to live demo if available
  },
  {
    id: 2,
    title: "AI Screen by fujm",
    category: "Extension & Tool",
    description: "A chrome extension; AI chat with ur tab; bringing chatgpt to the tab, instead of going to it.",
    technologies: ["React", "Express", "MongoDB", "Node.js","FireStore", "Jenkins", "OpenRender", "Tailwind CSS"],
    liveUrl: "https://chromewebstore.google.com/detail/ai-screen-by-fujm/jjbmecfljnhfmbcpkjlpnhdfheiapkid",
  },
   {
    id: 3,
    title: "Wall of Shade",
    category: "WebApp",
    description: "A Social accountability platform.",
    technologies: ["Python", "FireStore", "Jenkins", "OpenRender", "NLTK", "Docker"],
    // liveUrl: "#", // API endpoint documentation maybe?
    repoUrl: `https://wallofshade.netlify.app/`, // Use profileData
  },
   {
    id: 4,
    title: "Prompt Browsing",
    category: "POC",
    description: "Chrome extension automation tool to browse internet, book tickets for 2 this sunday, fill this form.",
    technologies: ["JS", "Python", "FireStore", "Jenkins", "OpenRender"],
    // liveUrl: "#", // API endpoint documentation maybe?
    repoUrl: `https://www.linkedin.com/posts/mohit-singh-negi_a-wip-fujm-most-of-activity-7317938245969870848-reWL?utm_source=share&utm_medium=member_desktop&rcm=ACoAADTEOpkB1ly_IAyX-vy0eYFvdSjVStoHd74`, // Use profileData
  },
   {
    id: 3,
    title: "Record & Replay",
    category: "POC",
    description: "Userfriendly Universal Webautomation Tool.",
    technologies: ["Python", "JS"],
    // liveUrl: "#", // API endpoint documentation maybe?
    repoUrl: `https://www.linkedin.com/posts/mohit-singh-negi_just-repeat-what-i-did-recordreplay-activity-7320257486878384128-KYhZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADTEOpkB1ly_IAyX-vy0eYFvdSjVStoHd74`, // Use profileData
  },

  // Add more projects
];

// Helper function for category styles (can be used in ProjectsContent)
export const getProjectCategoryStyle = (category) => {
    switch (category) {
      case 'AI WebApp':
        return 'bg-blue-100 text-blue-800';
      case 'WebApp':
        return 'bg-green-100 text-green-800';
      case 'Extension & Tool':
        return 'bg-yellow-100 text-yellow-800';
      case 'POC':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };