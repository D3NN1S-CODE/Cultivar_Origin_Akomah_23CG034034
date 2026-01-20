/*
╔════════════════════════════════════════════════════════════════════════════╗
║                  🍷 WINE CULTIVAR CLASSIFICATION 🍷                        ║
║                    FRONTEND APPLICATION ENTRY POINT                        ║
║                                                                            ║
║  Author: HP (Chukwu Manya Ifeanyi)                                         ║
║  Project: CSC334 - Wine Cultivar Origin Prediction Frontend               ║
║  Institution: Covenant University                                          ║
║  Date: January 2026                                                        ║
║                                                                            ║
║  UNIQUE IDENTIFIER: CVT-REACT-MAIN-001 [HP]                               ║
║  Technology Stack: React 19 + TypeScript + Vite + Tailwind CSS            ║
║                                                                            ║
║  Description:
║  This is the main entry point for the React application. It mounts the root
║  React component to the DOM and initializes the entire frontend application.
║  
║  Key Responsibilities:
║  1. Import and initialize React DOM utilities
║  2. Locate the root DOM element (#root)
║  3. Mount the App component to the DOM
║  4. Load global styles
║  
║  Build Process:
║  - Compiled by Vite for optimal performance
║  - Hot Module Replacement (HMR) enabled in development
║  - Tree-shaking for minimal production bundle size
║  
║  Dependencies:
║  - react-dom: React DOM rendering library
║  - ./App.tsx: Root application component
║  - ./index.css: Global application styles
║  
║  ★ ★ ★ STRICTLY CONFIDENTIAL - COVENANT UNIVERSITY CSC334 ★ ★ ★
║  This code is the proprietary work of HP (Chukwu Manya Ifeanyi)
║  Unauthorized copying or distribution is prohibited
║  
╚════════════════════════════════════════════════════════════════════════════╝
*/

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * Initialize React Application
 * 
 * Process:
 * 1. Get the root DOM element with id="root" from index.html
 * 2. Create a React root for concurrent rendering features
 * 3. Render the App component into the root
 * 
 * The non-null assertion (!) is safe because:
 * - The root element MUST exist in index.html for the app to work
 * - Build process ensures index.html contains this element
 * - TypeScript strict mode caught at compile time if missing
 */
createRoot(document.getElementById("root")!).render(<App />);
  