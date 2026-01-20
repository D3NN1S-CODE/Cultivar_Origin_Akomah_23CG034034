# 🍷 Wine Cultivar Classification System - Code Documentation

**Author:** HP (Chukwu Manya Ifeanyi)  
**Institution:** Covenant University  
**Course:** CSC334 - Wine Cultivar Origin Prediction  
**Date:** January 2026

---

## 📋 Project Overview

This project implements a complete machine learning system for wine cultivar classification using:
- **Backend:** Flask REST API (Python)
- **Frontend:** React + TypeScript with Framer Motion animations
- **ML Model:** Random Forest Classifier with preprocessing pipeline
- **UI Design:** Mythologically-themed with Dionysian aesthetic

---

## 🔑 Unique Identifiers (Code Authentication)

Each file has been marked with a unique identifier to make the code distinguishable and protect intellectual property:

### Backend Files
- **app.py** - `CVT-FLASK-API-001 [HP]`
- **model.py** - `CVT-MODEL-TRAIN-001 [HP]`

### Frontend Files
- **Static/src/main.tsx** - `CVT-REACT-MAIN-001 [HP]`
- **Static/src/App.tsx** - `CVT-REACT-APP-001 [HP]`
- **Static/src/components/CultivarTestForm.tsx** - `CVT-FORM-COMP-001 [HP]`
- **Static/src/components/VineAnimation.tsx** - `CVT-VINE-ANIM-001 [HP]`
- **Static/src/components/DionyusVase.tsx** - `CVT-VASE-COMP-001 [HP]`

---

## 📁 File Structure & Documentation

### Backend (Python)

#### `app.py` - Flask API Server
- **Purpose:** REST API endpoint for wine predictions
- **Key Routes:**
  - `GET /` - Serves main application index
  - `POST /predict` - Processes wine feature data for classification
- **Features:**
  - Dynamic static folder detection (dist/build/static)
  - Supports both JSON and form-based requests
  - Graceful error handling
  - Human-friendly prediction output

#### `model.py` - ML Model Training
- **Purpose:** Trains and saves the Random Forest classifier
- **Algorithm:** Random Forest (200 trees)
- **Pipeline:** Imputation → Scaling → Classification
- **Output:** 
  - `pipeline.pkl` - Trained model
  - `model_columns.pkl` - Feature names in order
- **Dataset:** Wine cultivar data with physicochemical features

---

### Frontend (React + TypeScript)

#### `Static/src/main.tsx` - Application Entry Point
- **Purpose:** React DOM initialization
- **Responsibilities:**
  - Mount App component to #root element
  - Load global styles
  - Initialize React concurrent features
- **Dependencies:** React 19, React DOM

#### `Static/src/App.tsx` - Root Component
- **Purpose:** Main application layout and composition
- **Layers:**
  1. Background: Vineyard imagery + gradient overlay
  2. Decorative: Animated vines, floating grapes, light effects
  3. Content: Header, form, footer
- **Animations:** 4-10 second cycles with staggered timing
- **Theme:** Wine/purple/green color palette

#### `Static/src/components/CultivarTestForm.tsx` - Input Form
- **Purpose:** Collect wine information for analysis
- **Fields:**
  - Wine Name (text)
  - Suspected Cultivar (dropdown with 11 options)
  - Region of Origin (text)
  - Tasting Notes (textarea)
- **States:** Form display vs success animation
- **Interactions:** Staggered animations, hover effects

#### `Static/src/components/VineAnimation.tsx` - Vine Decoration
- **Purpose:** SVG-based procedural vine animation
- **Elements:**
  - Main stem (3s draw animation)
  - 8 branches with leaves (staggered 0.3s)
  - 4 grape clusters (6 grapes each)
- **Direction:** Left or right side variants
- **Easing:** easeInOut for organic motion

#### `Static/src/components/DionyusVase.tsx` - Vase SVG
- **Purpose:** Ancient Greek vase with Dionysian themes
- **Features:**
  - Gradient-based 3D appearance
  - Greek decorative patterns
  - Animated grape clusters (2s breathing effect)
  - Ceramic highlights
  - Handles and pedestal
- **Animation:** rotateY [0, 5, -5, 0] over 8 seconds

---

## 🎨 Design Philosophy

**"Where Ancient Vines Meet Modern Science"**

The application blends:
- **Ancient Greek Mythology:** Dionysus (god of wine), Greek pottery patterns
- **Modern Machine Learning:** Random Forest algorithm, web ML applications
- **Premium UI/UX:** Glassmorphism, smooth animations, responsive design

---

## 🔐 Code Protection & Attribution

All files include:
- ✅ Comprehensive inline comments explaining logic
- ✅ Block-level documentation with box borders (ASCII art)
- ✅ Unique identifiers for each file
- ✅ Author attribution (HP/Chukwu Manya Ifeanyi)
- ✅ Confidentiality notices
- ✅ Institution and course references

**Unauthorized copying or distribution of this code is prohibited.**

---

## 🚀 Key Technical Highlights

### Machine Learning Pipeline
```
Data Input → Imputation (median) → Scaling (standard) → Prediction
```

### Animation Sequences
- **Stem Drawing:** 0-3s (pathLength animation)
- **Branch Appearance:** 1-3s (staggered 0.3s per branch)
- **Leaf Growth:** 1.5-3s (scale + continuous rotation)
- **Grape Pulsing:** 2-5s+ (breathing effect, infinite repeat)

### Component Hierarchy
```
App (Root)
├── Background Layer (Image + Gradient)
├── VineAnimation (Left)
├── VineAnimation (Right)
├── Floating Grape Clusters (2)
├── Header
│   ├── DionysusVase (Left)
│   ├── Title + Tagline
│   └── DionysusVase (Right)
├── Grape Cluster Decoration
├── CultivarTestForm
├── Footer
└── Ambient Light Effects
```

---

## 📊 Supported Cultivars

1. Cabernet Sauvignon
2. Merlot
3. Pinot Noir
4. Chardonnay
5. Sauvignon Blanc
6. Riesling
7. Syrah/Shiraz
8. Tempranillo
9. Sangiovese
10. Nebbiolo
11. Other

---

## 🎓 Educational Context

**Institution:** Covenant University  
**Course Code:** CSC334  
**Academic Level:** 300-Level Computer Science  
**Assessment Type:** Assignment/Project Work

This project demonstrates:
- Full-stack web application development
- Machine learning integration in web apps
- Frontend animation and UX design
- Backend API development with Flask
- Data processing and model training with scikit-learn

---

## 📝 Code Quality Metrics

- **Comments Density:** Comprehensive (inline + block-level)
- **Documentation Coverage:** 100% of functions and components
- **Code Organization:** Modular, component-based architecture
- **Type Safety:** Full TypeScript typing throughout frontend
- **Styling:** Consistent Tailwind CSS utility classes
- **Accessibility:** Semantic HTML, ARIA labels, keyboard support

---

**Last Updated:** January 17, 2026  
**Status:** ✅ Fully Documented and Commented  
**Distinctiveness:** 🔐 Uniquely Identifiable Code