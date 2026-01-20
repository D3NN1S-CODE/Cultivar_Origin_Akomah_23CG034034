/*
╔════════════════════════════════════════════════════════════════════════════╗
║                  🍷 WINE CULTIVAR CLASSIFICATION 🍷                        ║
║                     MAIN APPLICATION COMPONENT                             ║
║                                                                            ║
║  Author: HP (Chukwu Manya Ifeanyi)                                         ║
║  Project: CSC334 - Wine Cultivar Origin Prediction Frontend               ║
║  Institution: Covenant University                                          ║
║  Date: January 2026                                                        ║
║                                                                            ║
║  UNIQUE IDENTIFIER: CVT-REACT-APP-001 [HP]                                ║
║  Component Type: Root Application Component                                ║
║                                                                            ║
║  Description:
║  Root React component that composes the entire Wine Cultivar Prediction
║  application interface. Features a richly animated, mythologically-themed UI
║  celebrating the heritage of wine and viticulture.
║  
║  Design Philosophy:
║  "Where Ancient Vines Meet Modern Science" - The UI blends classical
║  Dionysian imagery with modern machine learning technology.
║  
║  Key Features:
║  - Animated background with purple grapes vineyard imagery
║  - Procedurally generated vine animations on page sides
║  - Floating grape cluster decorations with parallax motion
║  - Gradient text effects with continuous animation
║  - Smooth entrance animations for all elements
║  - Responsive layout for various screen sizes
║  - Ambient light effects for atmospheric depth
║  
║  Technology Stack:
║  - Framer Motion: Advanced animation library for React
║  - Tailwind CSS: Utility-first CSS framework
║  - TypeScript: Type-safe component development
║  - Lucide Icons: Clean, consistent icon library
║  
║  ★ ★ ★ STRICTLY CONFIDENTIAL - COVENANT UNIVERSITY CSC334 ★ ★ ★
║  This code is the proprietary work of HP (Chukwu Manya Ifeanyi)
║  Unauthorized copying or distribution is prohibited
║  
╚════════════════════════════════════════════════════════════════════════════╝
*/

import { motion } from "motion/react";
import { VineAnimation } from "./components/VineAnimation";
import { DionysusVase } from "./components/DionyusVase";
import { CultivarTestForm } from "./components/CultivarTestForm";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

/**
 * Root Application Component
 * 
 * Returns:
 * JSX element containing the complete application UI with all layers
 */
export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 
        ========================================================================
        BACKGROUND LAYER (Z-INDEX: 0)
        ========================================================================
        
        Creates the atmospheric backdrop for the entire application:
        - Large, semi-transparent vineyard image
        - Dark gradient overlay in wine colors (green, purple)
        - Sets the mood and context for wine cultivation
      */}
      <div className="fixed inset-0 z-0">
        {/* Background image from Unsplash: Purple grapes vineyard */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1632748662904-126a249f100d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBncmFwZXMlMjB2aW5leWFyZHxlbnwxfHx8fDE3NjQzMzExODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Purple grapes"
          className="w-full h-full object-cover opacity-20"
        />
        {/* 
          Dark gradient overlay
          - from: Deep forest green (wine vineyard color)
          - via: Dark purple (wine color)
          - to: Deep forest green
          - Creates a rich, elegant atmosphere
        */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 via-purple-950/80 to-green-900/80" />
      </div>

      {/* 
        ========================================================================
        DECORATIVE VINES LAYER (Z-INDEX: 5-10)
        ========================================================================
        
        Animated vine borders flanking the page content.
        These are SVG-based procedurally generated vine animations
        that enhance the vineyard aesthetic.
      */}
      <VineAnimation side="left" />
      <VineAnimation side="right" />

      {/* 
        Floating Grape Cluster #1 (Top-Left Area)
        
        Decorative element that bobs gently with rotation.
        Position: Fixed, top-left quadrant
        Animation: Vertical float (6s) + gentle rotation (6s)
        Visibility: Low opacity (30%) for background integration
      */}
      <motion.div
        className="fixed top-20 left-1/4 w-24 h-24 opacity-30 pointer-events-none z-5"
        animate={{
          y: [0, -20, 0],        // Bob up and down
          rotate: [0, 5, -5, 0],  // Gentle rotation side-to-side
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1618100789816-86508e3f2275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwZXZpbmUlMjBsZWF2ZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY0MzMxMTg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Grapevine leaves"
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>

      {/* 
        Floating Grape Cluster #2 (Top-Right Area)
        
        Mirror of Cluster #1 with offset timing.
        Creates choreographed, non-repetitive visual pattern.
        Delay: 2s (ensures different animation phase)
        Animation: Larger vertical movement (20px)
      */}
      <motion.div
        className="fixed top-40 right-1/4 w-20 h-20 opacity-30 pointer-events-none z-5"
        animate={{
          y: [0, 20, 0],          // Larger bob movement
          rotate: [0, -5, 5, 0],  // Opposite rotation direction
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,               // Offset timing for visual interest
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1618100789816-86508e3f2275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwZXZpbmUlMjBsZWF2ZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY0MzMxMTg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Grapevine leaves"
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>

      {/* 
        ========================================================================
        CONTENT LAYER (Z-INDEX: 20)
        ========================================================================
        
        Main application content area with:
        - Header section (title, vases, tagline)
        - Main input form
        - Footer attribution
      */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        
        {/* 
          HEADER SECTION
          Animated entrance from top with fade-in effect
          Duration: 1s, no delay
        */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* 
            Header Layout: Vase | Title + Tagline | Vase
            Creates balanced, symmetrical composition
          */}
          <div className="flex items-center justify-center gap-6 mb-6">
            {/* Left Dionysus Vase - Rotating Animation */}
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],  // Gentle rotation side-to-side
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <DionysusVase />
            </motion.div>
            
            {/* Title and Tagline Section */}
            <div>
              {/* 
                Animated Title with Gradient Text
                Effect: Gradient animated left-to-right (200% background size)
                Duration: 5s continuous
                Colors: Purple → Green → Purple (wine theme)
              */}
              <motion.h1
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-green-300 to-purple-300 text-glow mb-2"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                The Cultivar Vault
              </motion.h1>
              
              {/* Subtitle - Fades in after 0.5s delay */}
              <motion.p
                className="text-green-300/80 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Where Ancient Vines Meet Modern Science
              </motion.p>
            </div>

            {/* Right Dionysus Vase - Rotating Animation (Offset) */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],  // Opposite rotation for visual balance
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,               // Offset delay from left vase
              }}
            >
              <DionysusVase />
            </motion.div>
          </div>

          {/* 
            GRAPE CLUSTERS DECORATION
            
            Creates a row of 5 animated grape bunches below the header.
            Each cluster consists of:
            - Top grape (single)
            - Middle grapes (two)
            - Bottom grape (single)
            
            Staggered animation: Each cluster bobs at different times
            Creates a wave effect across the row
          */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="flex flex-col gap-1"
                animate={{
                  y: [0, -8, 0],  // Bob up and down
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,  // Stagger: 200ms between each cluster
                }}
              >
                {/* Top grape */}
                <div className="w-3 h-3 rounded-full bg-purple-500/80" />
                
                {/* Middle grapes (two) */}
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple-600/80" />
                  <div className="w-3 h-3 rounded-full bg-purple-600/80" />
                </div>
                
                {/* Bottom grape */}
                <div className="flex gap-1 justify-center">
                  <div className="w-3 h-3 rounded-full bg-purple-700/80" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 
          MAIN INPUT FORM
          Includes all necessary fields for wine analysis
        */}
        <CultivarTestForm />

        {/* 
          FOOTER ATTRIBUTION
          Fades in last (1.5s delay) for elegant sequential reveal
          References Dionysus, Greek god of wine and vegetation
        */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-green-300/60 italic">
            Blessed by Dionysus, Guardian of the Vine
          </p>
        </motion.div>
      </div>

      {/* 
        ========================================================================
        AMBIENT LIGHT EFFECTS (Z-INDEX: implicit low)
        ========================================================================
        
        Subtle, large blurred circles in background for depth and atmosphere.
        These pseudo-lights create a premium, polished look.
      */}
      
      {/* Purple light effect - Top-left quadrant */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],      // Breathing effect
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Green light effect - Bottom-right quadrant */}
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-green-500/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],      // Slightly larger breathing
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,                // Offset for non-synchronous effect
        }}
      />
    </div>
  );
}
