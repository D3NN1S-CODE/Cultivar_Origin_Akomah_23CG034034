/*
╔════════════════════════════════════════════════════════════════════════════╗
║                     🏺 DIONYSUS VASE COMPONENT 🏺                          ║
║                                                                            ║
║  Author: HP (Chukwu Manya Ifeanyi)                                         ║
║  Project: CSC334 - Wine Cultivar Origin Prediction Frontend               ║
║  Institution: Covenant University                                          ║
║  Date: January 2026                                                        ║
║                                                                            ║
║  UNIQUE IDENTIFIER: CVT-VASE-COMP-001 [HP]                                ║
║  Purpose: Ancient Greek vase SVG component with dynamic animation          ║
║                                                                            ║
║  Description:                                                              ║
║  Renders an ornate Greek vase inspired by ancient Dionysian pottery,      ║
║  celebrating the god of wine, theater, and vegetation. Features golden    ║
║  gradients, Greek patterns, and continuous 3D rotation animation.         ║
║                                                                            ║
║  Features:                                                                 ║
║  • Gradient-based 3D appearance (neck, body, base)                        ║
║  • Greek decorative patterns (dots, vines)                                ║
║  • Animated grape cluster with breathing effect                           ║
║  • Ceramic-style highlights for depth                                     ║
║  • Handles flanking the body                                              ║
║  • Smooth 3D Y-axis rotation (8s cycle)                                   ║
║                                                                            ║
║  Mythological Reference:                                                   ║
║  Dionysus: Greek god of wine, fertility, and organic life. The vase       ║
║  symbolizes the ancient tradition of viticulture and wine craftsmanship.  ║
║                                                                            ║
║  Component Structure:                                                      ║
║  • Neck: Top opening of vase                                              ║
║  • Shoulder: Curved transition from neck to body                          ║
║  • Body: Main vessel surface with decorations                             ║
║  • Base: Bottom support with pedestal                                     ║
║  • Handles: Side grips for ancient carrying                               ║
║  • Decorations: Greek patterns and grape clusters                         ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
*/

import { motion } from "motion/react";

/**
 * DionysusVase Component
 * 
 * Renders an ornate ancient Greek vase with Dionysian motifs.
 * Features SVG gradients for 3D appearance and continuous rotation.
 * 
 * No props required - stateless, purely presentational component.
 */
export function DionysusVase() {
  return (
    // Wrapper container with fade-in entrance animation
    <motion.div
      className="relative w-32 h-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* 
        Main SVG Element with 3D Rotation Animation
        rotateY: Creates illusion of vase rotating on vertical axis
        Duration: 8 seconds for smooth, continuous rotation
        repeat: Infinity for perpetual 3D effect
      */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ 
          rotateY: [0, 5, -5, 0],  // Rock side-to-side for 3D feel
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ GRADIENT DEFINITIONS - Create ceramic appearance             │ */}
        {/* │ Used throughout vase for depth and light reflection         │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        <defs>
          {/* 
            Vase Gradient: Creates metallic gold appearance
            Direction: Vertical (y1=0% to y2=100%)
            Colors: Gold (top) → Bronze (middle) → Gold (bottom)
            Creates highlights on curved surfaces
          */}
          <linearGradient id="vaseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--color-gold))" />
            <stop offset="50%" stopColor="hsl(25, 60%, 45%)" />
            <stop offset="100%" stopColor="hsl(var(--color-gold))" />
          </linearGradient>
          
          {/* 
            Highlight Gradient: Simulates light reflection on ceramic
            Direction: Horizontal (left to right)
            Creates shiny appearance on left side of vase
          */}
          <linearGradient id="vaseHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ VASE NECK - Top opening                                     │ */}
        {/* │ Narrow cylindrical section at top of vase                   │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        {/* Ellipse (rim) */}
        <ellipse cx="60" cy="25" rx="12" ry="4" fill="url(#vaseGradient)" />
        
        {/* Rectangle (neck walls) */}
        <rect x="48" y="25" width="24" height="15" fill="url(#vaseGradient)" />
        
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ VASE BODY - Main vessel surface                             │ */}
        {/* │ Curved shape: narrow neck → wide body → narrow base         │ */}
        {/* │ Classic amphora silhouette                                  │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        <path
          d="M 48 40 Q 35 45 30 60 L 30 110 Q 30 130 35 140 L 85 140 Q 90 130 90 110 L 90 60 Q 85 45 72 40 Z"
          fill="url(#vaseGradient)"
          stroke="hsl(30, 50%, 30%)"    // Dark bronze outline for definition
          strokeWidth="1"
        />
        
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ CERAMIC HIGHLIGHT - Light reflection effect                 │ */}
        {/* │ Vertical ellipse creating illusion of curved surface        │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        <ellipse 
          cx="50" 
          cy="70" 
          rx="8" 
          ry="25" 
          fill="url(#vaseHighlight)" 
          opacity="0.5" 
        />
        
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ GREEK DECORATIVE PATTERNS - Dot motif                       │ */}
        {/* │ Three dots arranged on neck section (ancient Greek style)   │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        <circle cx="60" cy="55" r="2" fill="hsl(var(--color-deep-purple))" />
        <circle cx="55" cy="60" r="2" fill="hsl(var(--color-deep-purple))" />
        <circle cx="65" cy="60" r="2" fill="hsl(var(--color-deep-purple))" />
        
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ VINE DECORATION - Curved line motif                         │ */}
        {/* │ Quadratic curve simulating decorative vine band             │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        <path
          d="M 40 80 Q 50 75 60 80 T 80 80"  // Smooth S-curve
          stroke="hsl(var(--color-deep-purple))"
          strokeWidth="2"
          fill="none"
        />
        
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ GRAPE CLUSTER DECORATION - Animated breathing effect        │ */}
        {/* │ 6 circles arranged in grape bunch formation                 │ */}
        {/* │ Pulsates to suggest life and vitality                       │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        <motion.g
          animate={{ scale: [1, 1.05, 1] }}  // Gentle pulsing
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left column grapes (x=48, 54) */}
          <circle cx="48" cy="95" r="3" fill="hsl(var(--color-grape-purple))" />
          <circle cx="54" cy="95" r="3" fill="hsl(var(--color-grape-purple))" />
          <circle cx="51" cy="90" r="3" fill="hsl(var(--color-grape-purple))" />
          
          {/* Right column grapes (x=66, 72) */}
          <circle cx="66" cy="95" r="3" fill="hsl(var(--color-grape-purple))" />
          <circle cx="72" cy="95" r="3" fill="hsl(var(--color-grape-purple))" />
          <circle cx="69" cy="90" r="3" fill="hsl(var(--color-grape-purple))" />
        </motion.g>
        
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ VASE BASE - Support pedestal                                │ */}
        {/* │ Three parts: main base, stem, foot                          │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        {/* Main base ellipse */}
        <ellipse cx="60" cy="140" rx="25" ry="5" fill="url(#vaseGradient)" />
        
        {/* Stem connecting body to foot */}
        <path d="M 35 140 L 40 150 L 80 150 L 85 140" fill="url(#vaseGradient)" />
        
        {/* Foot pedestal */}
        <ellipse cx="60" cy="150" rx="20" ry="4" fill="url(#vaseGradient)" />
        
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ HANDLES - Ancient Greek amphora-style handles               │ */}
        {/* │ Two curved handles flanking the body for carrying           │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        {/* Left handle: quadratic curve from shoulder to body */}
        <path
          d="M 30 60 Q 20 70 20 85 Q 20 95 30 100"
          stroke="url(#vaseGradient)"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Right handle: mirrored quadratic curve */}
        <path
          d="M 90 60 Q 100 70 100 85 Q 100 95 90 100"
          stroke="url(#vaseGradient)"
          strokeWidth="4"
          fill="none"
        />
      </motion.svg>
    </motion.div>
  );
}
