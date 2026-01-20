/*
╔════════════════════════════════════════════════════════════════════════════╗
║                         🍇 VINE ANIMATION COMPONENT 🍇                     ║
║                                                                            ║
║  Author: HP (Chukwu Manya Ifeanyi)                                         ║
║  Project: CSC334 - Wine Cultivar Origin Prediction Frontend               ║
║  Institution: Covenant University                                          ║
║  Date: January 2026                                                        ║
║                                                                            ║
║  UNIQUE IDENTIFIER: CVT-VINE-ANIM-001 [HP]                                ║
║  Purpose: Animated vine border decoration component                       ║
║                                                                            ║
║  Description:                                                              ║
║  Generates procedurally animated SVG vine graphics for the left and       ║
║  right page borders. Creates a living, breathing vineyard aesthetic       ║
║  with animated branches, leaves, and grape clusters.                      ║
║                                                                            ║
║  Features:                                                                 ║
║  • Directional rendering (left/right side variants)                       ║
║  • Sequential animation: Stems → Branches → Leaves → Grapes               ║
║  • Procedural generation: 8 branches with leaves, 4 grape clusters        ║
║  • Smooth easing: Staggered timing for organic feel                       ║
║  • Full-height coverage: Spans entire viewport height                     ║
║  • Performance optimized: SVG with GPU-accelerated animations             ║
║                                                                            ║
║  Component Props:                                                          ║
║  - side: 'left' | 'right' - Which side of page to render                  ║
║                                                                            ║
║  Animation Timeline (seconds):                                             ║
║  0-3s:   Main vine stem draws itself                                       ║
║  1-3s:   Vine branches appear (staggered 0.3s each)                        ║
║  1.5-3s: Leaves grow and rotate on branches                               ║
║  2-5s:   Grape clusters scale with breathing effect                       ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
*/

import { motion } from "motion/react";

/**
 * VineAnimation Component
 * 
 * Renders an animated SVG vine graphic on left or right page border.
 * Creates organic vineyard aesthetic with procedurally generated elements.
 * 
 * @param {Object} props - Component props
 * @param {string} props.side - 'left' or 'right' side of page
 */
export function VineAnimation({ side }: { side: 'left' | 'right' }) {
  // Determine side-specific positioning and path directions
  const isLeft = side === 'left';
  
  return (
    // Fixed container spanning full page height on designated side
    <div className={`fixed ${isLeft ? 'left-0' : 'right-0'} top-0 h-full w-32 pointer-events-none z-10 opacity-60`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 150 1000"    // 150px wide, 1000px tall for full height coverage
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
      >
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ MAIN VINE STEM - Central structural element                 │ */}
        {/* │ Animation: Path draws from top to bottom (pathLength)        │ */}
        {/* │ Duration: 3 seconds with easeInOut for smooth motion        │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        <motion.path
          // Quadratic curves for organic vine shape
          // Left side: curves right-left alternating
          // Right side: curves left-right alternating
          d={isLeft 
            ? "M 120 0 Q 80 100 90 200 T 100 400 T 80 600 T 100 800 T 90 1000"
            : "M 30 0 Q 70 100 60 200 T 50 400 T 70 600 T 50 800 T 60 1000"
          }
          stroke="hsl(var(--color-vine-green))"  // Theme-based vine green
          strokeWidth="4"                          // Thick main stem
          fill="none"
          initial={{ pathLength: 0 }}             // Start invisible
          animate={{ pathLength: 1 }}             // Draw to completion
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ VINE BRANCHES - Secondary structures with leaves            │ */}
        {/* │ Generates 8 branches evenly spaced down the main stem       │ */}
        {/* │ Each branch has 2 leaves attached                           │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        {[...Array(8)].map((_, i) => {
          // Calculate vertical position for this branch (spacing: 125px)
          const y = i * 125 + 50;
          
          return (
            <motion.g key={`branch-${i}`}>
              {/* Branch path extending from main stem */}
              <motion.path
                d={isLeft
                  // Left side: branches curve leftward
                  ? `M ${90 + (i % 3) * 5} ${y} Q ${70 - i * 3} ${y + 20} ${60 - i * 2} ${y + 40}`
                  // Right side: branches curve rightward
                  : `M ${60 - (i % 3) * 5} ${y} Q ${80 + i * 3} ${y + 20} ${90 + i * 2} ${y + 40}`
                }
                stroke="hsl(var(--color-sage-green))"  // Lighter green for secondary branches
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: 1,
                }}
                // Branches appear sequentially after main stem (delay: 1s + 0.3s per branch)
                transition={{ 
                  duration: 2, 
                  delay: i * 0.3 + 1,
                  ease: "easeOut" 
                }}
              />
              
              {/* ┌──────────────────────────────────────────────────────┐ */}
              {/* │ LEAVES - Grow on branch endpoints                    │ */}
              {/* │ 2 leaves per branch at different heights              │ */}
              {/* │ Continuous gentle rotation for alive feeling         │ */}
              {/* └──────────────────────────────────────────────────────┘ */}
              {[0, 1].map((leafIndex) => {
                // Calculate leaf positions offset from branch
                const leafX = isLeft ? 75 - i * 2 - leafIndex * 10 : 75 + i * 2 + leafIndex * 10;
                const leafY = y + 20 + leafIndex * 15;
                
                return (
                  <motion.ellipse
                    key={`leaf-${i}-${leafIndex}`}
                    cx={leafX}
                    cy={leafY}
                    rx="8"
                    ry="12"
                    fill="hsl(var(--color-sage-green))"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1,
                      opacity: 0.8,
                      rotate: [0, 5, -5, 0]  // Gentle rotation: flutter in breeze
                    }}
                    transition={{ 
                      scale: { 
                        duration: 0.5, 
                        delay: i * 0.3 + 1.5 + leafIndex * 0.2 
                      },
                      opacity: { 
                        duration: 0.5, 
                        delay: i * 0.3 + 1.5 + leafIndex * 0.2 
                      },
                      rotate: { 
                        duration: 4,
                        delay: i * 0.3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  />
                );
              })}
            </motion.g>
          );
        })}
        
        {/* ┌─────────────────────────────────────────────────────────────┐ */}
        {/* │ GRAPE CLUSTERS - Fruit on vine (4 clusters total)           │ */}
        {/* │ Positioned at odd branch indices (1, 3, 5, 7) for balance  │ */}
        {/* │ Each cluster has 6 individual grapes arranged naturally     │ */}
        {/* └─────────────────────────────────────────────────────────────┘ */}
        {[1, 3, 5, 7].map((clusterIndex) => {
          // Base position for this grape cluster
          const baseY = clusterIndex * 125 + 70;
          const baseX = isLeft ? 65 - clusterIndex * 2 : 85 + clusterIndex * 2;
          
          return (
            <motion.g key={`cluster-${clusterIndex}`}>
              {/* Small stem connecting cluster to main branch */}
              <motion.line
                x1={baseX}
                y1={baseY - 10}
                x2={baseX}
                y2={baseY}
                stroke="hsl(var(--color-vine-green))"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5, delay: clusterIndex * 0.4 + 2 }}
              />
              
              {/* Individual grapes forming cluster */}
              {/* 6 grapes arranged in 3 rows (top:1, middle:2, bottom:2) */}
              {[...Array(6)].map((_, grapeIndex) => {
                // Grid positioning: 2 columns, 3 rows
                const row = Math.floor(grapeIndex / 2);
                const col = grapeIndex % 2;
                const grapeX = baseX + (col - 0.5) * 7;
                const grapeY = baseY + row * 7;
                
                return (
                  <motion.circle
                    key={`grape-${clusterIndex}-${grapeIndex}`}
                    cx={grapeX}
                    cy={grapeY}
                    r="4"                                    // Small grape radius
                    fill="hsl(var(--color-grape-purple))"   // Purple wine grape color
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [1, 1.1, 1],  // Breathing/pulsing effect
                      opacity: 0.9,
                    }}
                    transition={{ 
                      scale: {
                        duration: 3,
                        delay: clusterIndex * 0.4 + 2.5 + grapeIndex * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2  // Pause between pulses
                      },
                      opacity: {
                        duration: 0.5,
                        delay: clusterIndex * 0.4 + 2.5 + grapeIndex * 0.1
                      }
                    }}
                  />
                );
              })}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
