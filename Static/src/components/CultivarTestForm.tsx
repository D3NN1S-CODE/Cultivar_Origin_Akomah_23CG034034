/*
╔════════════════════════════════════════════════════════════════════════════╗
║                  🍷 WINE CULTIVAR TEST FORM 🍷                             ║
║                    Interactive Input Component                             ║
║                                                                            ║
║  Author: HP (Chukwu Manya Ifeanyi)                                         ║
║  Project: CSC334 - Wine Cultivar Origin Prediction Frontend               ║
║  Institution: Covenant University                                          ║
║  Date: January 2026                                                        ║
║                                                                            ║
║  UNIQUE IDENTIFIER: CVT-FORM-COMP-001 [HP]                                ║
║  Component Type: Interactive Form Component                                ║
║                                                                            ║
║  Description:
║  Interactive form component for collecting wine information and initiating
║  cultivar classification. Features smooth animations, elegant styling, and
║  user-friendly input fields for wine analysis.
║  
║  Form Fields:
║  1. Wine Name (Text): User-defined wine identifier
║  2. Suspected Cultivar (Dropdown): Multiple cultivar options
║  3. Region of Origin (Text): Geographic location of wine origin
║  4. Tasting Notes (Textarea): Descriptive notes about wine characteristics
║  
║  Features:
║  - Animated entrance and form elements
║  - Staggered field animations for visual flow
║  - Success state with wine icon and message
║  - Form validation (required fields)
║  - Smooth button interactions (hover/tap effects)
║  - Gradient styling consistent with app theme
║  
║  State Management:
║  - submitted: Tracks whether form has been submitted
║  - Auto-resets after 3 seconds for repeat submissions
║  
║  User Experience:
║  - Three-second success animation before form resets
║  - Visual feedback on all interactions
║  - Accessible form labels with icons
║  - Responsive field sizing
║  
║  ★ ★ ★ STRICTLY CONFIDENTIAL - COVENANT UNIVERSITY CSC334 ★ ★ ★
║  This code is the proprietary work of HP (Chukwu Manya Ifeanyi)
║  Unauthorized copying or distribution is prohibited
║  
╚════════════════════════════════════════════════════════════════════════════╝
*/

import { motion } from "motion/react";
import { Wine, FlaskConical, MapPin } from "lucide-react";
import { useState } from "react";

/**
 * CultivarTestForm Component
 * 
 * Purpose: Main input form for wine cultivar classification
 * 
 * State:
 * - submitted: Boolean flag indicating submission state
 * 
 * Handlers:
 * - handleSubmit: Processes form submission with animation feedback
 */
export function CultivarTestForm() {
  // Track form submission state for animation control
  const [submitted, setSubmitted] = useState(false);

  /**
   * Handle Form Submission
   * 
   * Process:
   * 1. Prevent default form submission behavior
   * 2. Set submitted state to true (triggers success animation)
   * 3. After 3 seconds, reset form for next submission
   * 
   * Purpose: Provide visual feedback to user while form processes
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Auto-reset form after 3 seconds for potential re-submission
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    // Form Container: Glassmorphism design with gradient background
    <motion.div
      className="bg-gradient-to-br from-purple-900/40 to-green-900/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-purple-300/20 max-w-2xl w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* 
        Form Header Section
        Animated entrance with slide-down and fade-in
      */}
      <motion.div 
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-purple-200 mb-2">Test Your Wine's Heritage</h2>
        <p className="text-green-200/80">Discover the ancestral origins of your cultivar</p>
      </motion.div>

      {/* 
        CONDITIONAL RENDERING: Success State vs Form State
        
        If form was submitted within the last 3 seconds:
        - Show success animation with wine icon
        - Display completion message
        
        Otherwise:
        - Show form fields with staggered animations
      */}
      {submitted ? (
        // Success Animation and Message
        <motion.div
          className="text-center py-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          {/* Wine glass icon centered and animated */}
          <Wine className="w-16 h-16 mx-auto mb-4 text-purple-300" />
          
          {/* Success heading */}
          <h3 className="text-purple-200 mb-2">Analysis Submitted!</h3>
          
          {/* Status message */}
          <p className="text-green-200/80">Your cultivar is being traced through the vines of history...</p>
        </motion.div>
      ) : (
        // Form with Input Fields
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 
            ====================================================================
            FIELD 1: WINE NAME
            ====================================================================
            
            Purpose: Collect user-defined wine identifier
            Type: Text input
            Animation: Slides in from left (x: -50px)
            Delay: 0.6s after header
          */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label className="block text-purple-200 mb-2 flex items-center gap-2">
              <Wine className="w-5 h-5" />
              Wine Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-300/30 text-cream focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/30 transition-all"
              placeholder="Enter your wine's name"
              required
            />
          </motion.div>

          {/* 
            ====================================================================
            FIELD 2: SUSPECTED CULTIVAR
            ====================================================================
            
            Purpose: Select wine cultivar type from predefined list
            Type: Dropdown select
            Animation: Slides in from right (x: +50px)
            Delay: 0.7s after header
            
            Cultivar Options:
            - Cabernet Sauvignon: Full-bodied red wine
            - Merlot: Smooth red wine
            - Pinot Noir: Light-bodied red wine
            - Chardonnay: Full-bodied white wine
            - Sauvignon Blanc: Crisp white wine
            - Riesling: Sweet/dry white wine
            - Syrah/Shiraz: Spicy red wine
            - Tempranillo: Spanish red wine
            - Sangiovese: Italian red wine
            - Nebbiolo: Italian premium wine
            - Other: Fallback option
          */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <label className="block text-purple-200 mb-2 flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              Suspected Cultivar
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-300/30 text-cream focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/30 transition-all"
              required
            >
              <option value="">Select a cultivar...</option>
              <option value="cabernet-sauvignon">Cabernet Sauvignon</option>
              <option value="merlot">Merlot</option>
              <option value="pinot-noir">Pinot Noir</option>
              <option value="chardonnay">Chardonnay</option>
              <option value="sauvignon-blanc">Sauvignon Blanc</option>
              <option value="riesling">Riesling</option>
              <option value="syrah">Syrah/Shiraz</option>
              <option value="tempranillo">Tempranillo</option>
              <option value="sangiovese">Sangiovese</option>
              <option value="nebbiolo">Nebbiolo</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          {/* 
            ====================================================================
            FIELD 3: REGION OF ORIGIN
            ====================================================================
            
            Purpose: Collect geographic origin information
            Type: Text input with examples
            Animation: Slides in from left (x: -50px)
            Delay: 0.8s after header
            
            Examples provided in placeholder:
            - Bordeaux: French wine region
            - Napa Valley: California wine region
            - Tuscany: Italian wine region
          */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <label className="block text-purple-200 mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Region of Origin
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-300/30 text-cream focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/30 transition-all"
              placeholder="e.g., Bordeaux, Napa Valley, Tuscany"
              required
            />
          </motion.div>

          {/* 
            ====================================================================
            FIELD 4: TASTING NOTES
            ====================================================================
            
            Purpose: Collect descriptive wine characteristics
            Type: Textarea (4 rows, non-resizable)
            Animation: Slides in from right (x: +50px)
            Delay: 0.9s after header
            
            Guidance: Describe aroma, flavor, and other sensory characteristics
          */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <label className="block text-purple-200 mb-2">
              Tasting Notes
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-300/30 text-cream focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/30 transition-all resize-none"
              rows={4}
              placeholder="Describe the aroma, flavor, and characteristics..."
            />
          </motion.div>

          {/* 
            ====================================================================
            SUBMIT BUTTON
            ====================================================================
            
            Purpose: Submit form for cultivar analysis
            Type: Button (submit)
            Animation: Slides up from bottom with fade-in
            Delay: 1.0s after header
            
            Interactions:
            - Hover: Scale up slightly (1.02x)
            - Tap: Scale down slightly (0.98x)
            - State: Changes to success animation on submit
            
            Styling:
            - Gradient background: Purple to Green
            - Hover effect: Lighter gradient + shadow
            - Box shadow: Purple glow on hover
          */}
          <motion.button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-500 hover:to-green-500 text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Begin Cultivar Analysis
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}
