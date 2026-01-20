"""
╔════════════════════════════════════════════════════════════════════════════╗
║                  🍇 WINE CULTIVAR CLASSIFICATION 🍇                        ║
║                        ML MODEL TRAINING SCRIPT                            ║
║                                                                            ║
║  Author: HP (Chukwu Manya Ifeanyi)                                         ║
║  Project: CSC334 - Wine Cultivar Origin Prediction System                 ║
║  Institution: Covenant University                                          ║
║  Date: January 2026                                                        ║
║                                                                            ║
║  UNIQUE IDENTIFIER: CVT-MODEL-TRAIN-001 [HP]                              ║
║  Language: Python 3.8+                                                     ║
║  ML Framework: Scikit-learn 0.24+                                          ║
║                                                                            ║
║  Description:
║  This script trains a machine learning model to classify wine cultivars
║  based on their physicochemical properties. The trained model is saved as
║  a scikit-learn Pipeline and can be loaded by the Flask API for predictions.
║  
║  Key Features:
║  - Loads wine dataset from local file or scikit-learn's built-in dataset
║  - Builds a processing pipeline with imputation, scaling, and classification
║  - Trains a Random Forest classifier with 200 trees
║  - Saves the trained model and feature names for use in production API
║  - Includes test/train split for model evaluation capability
║  
║  Algorithm: Random Forest Classifier
║  - 200 decision trees for robust predictions
║  - Handles non-linear relationships in wine chemistry
║  - Provides feature importance insights
║  
║  Pipeline Steps:
║  1. SimpleImputer: Handle missing values using median strategy
║  2. StandardScaler: Normalize features to same scale
║  3. RandomForestClassifier: Multi-class classification
║  
║  Output Files:
║  - pipeline.pkl: Complete training pipeline (serialized)
║  - model_columns.pkl: Feature names in training order (serialized)
║  
║  Dependencies: pandas, numpy, scikit-learn, joblib
║  
║  ★ ★ ★ STRICTLY CONFIDENTIAL - COVENANT UNIVERSITY CSC334 ★ ★ ★
║  This code is the proprietary work of HP (Chukwu Manya Ifeanyi)
║  Unauthorized copying or distribution is prohibited
║  
╚════════════════════════════════════════════════════════════════════════════╝
"""

import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import joblib

# ================================================================================
# STEP 1: DATA LOADING
# ================================================================================

# Get the directory where this script is located
HERE = os.path.dirname(__file__)

# Define path to wine dataset file (expected to be in same directory)
data_path = os.path.join(HERE, 'wine.data')

# Attempt to load from local file; fall back to scikit-learn's built-in dataset
if os.path.exists(data_path):
    """
    Local Dataset Loading:
    If wine.data exists locally, load it as a CSV file without headers.
    Expected format:
    - 14 columns total (13 features + 1 target)
    - First 13 columns: Physicochemical properties (alcohol, acidity, etc.)
    - Last column: Wine cultivar class (0, 1, or 2)
    """
    df = pd.read_csv(data_path, header=None)
    
    # Check if dataset has expected shape (14 columns)
    if df.shape[1] == 14:
        # Standard wine dataset format
        X = df.iloc[:, :-1]  # Features: all columns except last
        y = df.iloc[:, -1]   # Target: last column
    else:
        # Generic format: assume last column is target
        X = df.iloc[:, :-1]
        y = df.iloc[:, -1]
else:
    """
    Fallback to Scikit-learn Dataset:
    If local wine.data file not found, use scikit-learn's built-in Wine dataset.
    This ensures the model can be trained even without the local data file.
    """
    from sklearn.datasets import load_wine
    w = load_wine()
    X = pd.DataFrame(w.data, columns=w.feature_names)
    y = pd.Series(w.target)

# ================================================================================
# STEP 2: DATA SPLITTING
# ================================================================================

"""
Train-Test Split:
- 80% training data (X_train, y_train)
- 20% testing data (X_test, y_test)
- random_state=5: Ensures reproducible splits across runs
"""
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=5)

# ================================================================================
# STEP 3: MODEL TRAINING
# ================================================================================

"""
Random Forest Classifier Configuration:
- n_estimators=200: Create 200 decision trees
  * More trees = more robust predictions
  * Better generalization to unseen data
- random_state=5: Ensures reproducible model across training runs
  * Allows consistent predictions for same input
  * Enables model comparison and debugging

Why Random Forest?
- Handles non-linear relationships in wine chemistry
- Robust to outliers in physicochemical measurements
- Provides feature importance rankings
- Naturally handles multi-class classification (3 cultivar classes)
- No scaling required at this stage (handled in pipeline)
"""
clf = RandomForestClassifier(n_estimators=200, random_state=5)
clf.fit(X_train, y_train)

# ================================================================================
# STEP 4: PIPELINE CREATION AND TRAINING
# ================================================================================

"""
Machine Learning Pipeline:
A pipeline chains multiple preprocessing and modeling steps, ensuring that:
1. Training and prediction follow identical preprocessing
2. Data leakage is prevented (fit only on training data)
3. Deployment is simplified (pipeline saved as single object)

Pipeline Stages:
"""
pipe = Pipeline([
    # Stage 1: Imputation
    # Handle missing or NaN values by replacing with median of that feature
    # Median chosen because it's robust to outliers in wine measurements
    ('imputer', SimpleImputer(strategy='median')),
    
    # Stage 2: Feature Scaling
    # Normalize features to have mean=0 and standard deviation=1
    # Important because:
    # - Features have different units (alcohol %, acidity in g/L, etc.)
    # - Standardization ensures fair feature comparison
    # - Some models are sensitive to feature scaling
    ('scaler', StandardScaler()),
    
    # Stage 3: Classification
    # Random Forest classifier trained in previous section
    # Makes final predictions based on scaled, imputed features
    ('clf', clf)
])

# Train the complete pipeline on training data
# Pipeline applies imputation and scaling, then fits the classifier
pipe.fit(X_train, y_train)

# ================================================================================
# STEP 5: MODEL PERSISTENCE
# ================================================================================

"""
Save Model and Metadata:
Serialize the trained pipeline and feature information for production use.
This allows the Flask API to make predictions without retraining.
"""

# Save the complete trained pipeline to a pickle file
# The pipeline includes all preprocessing and the trained classifier
pipeline_pkl_path = os.path.join(HERE, 'pipeline.pkl')
joblib.dump(pipe, pipeline_pkl_path)

# Save the feature column names in order
# The API uses this to ensure features are provided in the correct order
# This prevents silent errors from mismatched feature ordering
columns_pkl_path = os.path.join(HERE, 'model_columns.pkl')
joblib.dump(list(X.columns), columns_pkl_path)

# ================================================================================
# SCRIPT OUTPUT
# ================================================================================

print('Wine pipeline saved to pipeline.pkl')
