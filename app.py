"""
╔════════════════════════════════════════════════════════════════════════════╗
║                  🍷 WINE CULTIVAR CLASSIFICATION 🍷                        ║
║                         BACKEND API SERVER                                 ║
║                                                                            ║
║  Author: HP (Chukwu Manya Ifeanyi)                                         ║
║  Project: CSC334 - Wine Cultivar Origin Prediction System                 ║
║  Institution: Covenant University                                          ║
║  Date: January 2026                                                        ║
║                                                                            ║
║  UNIQUE IDENTIFIER: CVT-FLASK-API-001 [HP]                                ║
║  Language: Python 3.8+                                                     ║
║  Framework: Flask 2.0+
║                                                                            ║
║  Description:
║  This Flask application serves as the backend API for a wine cultivar 
║  classification system. It provides endpoints for wine analysis and uses a 
║  pre-trained machine learning pipeline to predict the cultivar class of wine 
║  based on physicochemical properties.
║  
║  Key Features:
║  - Serves a React/TypeScript frontend (Single Page Application)
║  - Accepts both JSON and form-based POST requests for predictions
║  - Dynamically detects whether to serve built production assets or development files
║  - Implements error handling and graceful fallbacks
║  - Returns predictions in human-friendly format (Class 1, Class 2, Class 3)
║  
║  Dependencies: Flask, joblib, pandas
║  
║  ★ ★ ★ STRICTLY CONFIDENTIAL - COVENANT UNIVERSITY CSC334 ★ ★ ★
║  This code is the proprietary work of HP (Chukwu Manya Ifeanyi)
║  Unauthorized copying or distribution is prohibited
║  
╚════════════════════════════════════════════════════════════════════════════╝
"""

import os
from flask import Flask, render_template, request, redirect, url_for, flash
import joblib
import pandas as pd

# Get the base directory of the application for locating assets and model files
base = os.path.dirname(__file__)

# Define possible paths for built application assets
# The app supports both 'dist' (Vite build) and 'build' (legacy build) directories
dist_index = os.path.join(base, 'Static', 'dist', 'index.html')
build_index = os.path.join(base, 'Static', 'build', 'index.html')

# Determine which static folder to serve based on build availability
# Priority: dist > build > Static (development mode with templates)
if os.path.exists(dist_index):
    static_folder = os.path.join('Static', 'dist')
    template_folder = None
elif os.path.exists(build_index):
    static_folder = os.path.join('Static', 'build')
    template_folder = None
else:
    # Fallback to development mode with template folder
    static_folder = 'Static'
    template_folder = 'templates'

# Initialize Flask application with appropriate folder configuration
if template_folder is None:
    # SPA mode: serve everything from static folder
    app = Flask(__name__, static_folder=static_folder, static_url_path='', template_folder=None)
else:
    # Traditional mode: with templates
    app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)


@app.route('/')
def index():
    """
    Route Handler: Serve the main index page
    
    HTTP Method: GET
    URL: /
    
    Purpose:
    Serves the main landing page of the wine cultivar classification application.
    In SPA (Single Page Application) mode, serves the built React app directly.
    In template mode, renders the template with available model column names.
    
    Returns:
    - In SPA mode: Static index.html file
    - In template mode: Rendered index.html template with model columns
    
    Process:
    1. Check if running in SPA mode (no template folder configured)
    2. If SPA mode: Send the static index.html file
    3. If template mode: Load model column names from pickle file and pass to template
    """
    
    # SPA Mode: Send static file directly
    if app.template_folder is None:
        return app.send_static_file('index.html')
    
    # Template Mode: Load column information for form generation
    cols_path = os.path.join(os.path.dirname(__file__), 'model_columns.pkl')
    cols = []
    
    # Safely load the model column names if the pickle file exists
    if os.path.exists(cols_path):
        try:
            cols = joblib.load(cols_path)
        except Exception:
            # If loading fails, continue with empty column list
            cols = []
    
    # Render template and pass available columns for dynamic form generation
    return render_template('index.html', cols=cols)


@app.route('/predict', methods=['POST'])
def predict():
    """
    Route Handler: Process wine cultivar prediction requests
    
    HTTP Method: POST
    URL: /predict
    
    Purpose:
    Accepts wine feature data and uses the trained ML pipeline to predict
    the wine cultivar class. Supports both JSON API requests and form submissions.
    
    Accepted Content Types:
    - application/json (for API clients)
    - application/x-www-form-urlencoded (for HTML forms)
    
    Request Format:
    JSON: {"feature_name": value, "feature_name": value, ...}
    Form: name=value&name=value&...
    
    Returns:
    - JSON response: {'result': 'Class 1'|'Class 2'|'Class 3'|'Error message'}
    - HTML response: Simple HTML page displaying the prediction result
    
    Process:
    1. Load the pre-trained ML pipeline and model column names from pickle files
    2. Validate that both files exist; return error if not
    3. Extract feature values from request (JSON or form data)
    4. Create a DataFrame with the same structure as training data
    5. Generate prediction using the pipeline
    6. Map numeric prediction (0, 1, 2) to human-friendly class names
    7. Return result in appropriate format (JSON or HTML)
    
    Error Handling:
    - Missing model files: Redirect to index with flash message
    - Invalid input data: Return error message in result field
    - Type conversion failures: Caught and returned as error
    """
    
    # Define paths to the pre-trained machine learning pipeline and model metadata
    pipeline_path = os.path.join(os.path.dirname(__file__), 'pipeline.pkl')
    cols_path = os.path.join(os.path.dirname(__file__), 'model_columns.pkl')
    
    # Validate that both required model files exist
    if not os.path.exists(pipeline_path) or not os.path.exists(cols_path):
        flash('Model pipeline not found. Please run model training first.')
        return redirect(url_for('index'))
    
    # Load the pre-trained pipeline and feature column names from pickle files
    pipe = joblib.load(pipeline_path)
    cols = joblib.load(cols_path)

    try:
        # Extract feature values from request data (supports both JSON and form submissions)
        if request.is_json:
            # API request: extract from JSON body
            data = request.get_json()
            vals = [float(data.get(c, 0)) for c in cols]
        else:
            # Form submission: extract from form data, default to 0 if missing
            vals = [float(request.form.get(c, 0)) for c in cols]

        # Create a DataFrame with the same structure as the training data
        # This ensures the pipeline processes the data correctly
        X = pd.DataFrame([vals], columns=cols)
        
        # Generate prediction using the trained pipeline
        pred = pipe.predict(X)[0]
        
        # Map numeric prediction (0, 1, 2) to human-friendly class names
        # These correspond to the three wine cultivar classes from the dataset
        target_names = ['Class 1', 'Class 2', 'Class 3']
        out = target_names[int(pred)] if 0 <= int(pred) < len(target_names) else f'Class {int(pred)}'
        
    except Exception as e:
        # Catch any errors during prediction and return error message
        out = f'Error: {e}'

    # Determine response format based on request type
    # API clients expect JSON; web forms expect HTML
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest' or request.accept_mimetypes.best == 'application/json':
        from flask import jsonify
        return jsonify({'result': out})

        # If SPA mode (no template folder), return simple HTML for browser display
        # This fallback ensures users can see results even if served as SPA
        if app.template_folder is None:
                simple = f"""
                <!doctype html>
                <html>
                    <head><meta charset='utf-8'><title>Wine Prediction Result</title></head>
                    <body style='font-family:Inter,system-ui,Arial;padding:24px'>
                        <h2>Prediction Result</h2>
                        <p style='font-size:1.2rem;font-weight:600'>{out}</p>
                        <p><a href='/'>Back to app</a></p>
                    </body>
                </html>
                """
                return simple

        # Template mode: render full template with result and available columns
        return render_template('index.html', result=out, cols=cols)

# ================================================================================
# APPLICATION ENTRY POINT
# ================================================================================

if __name__ == '__main__':
    """
    Main Application Launcher
    
    Purpose:
    Entry point for running the Flask development server.
    
    Configuration:
    - debug=True: Enables auto-reload on file changes and detailed error pages
    - port=5004: Application runs on localhost:5004
    
    Usage:
    Run this script directly: python app.py
    Then navigate to http://localhost:5004 in your browser
    
    Note:
    For production deployment, use a WSGI server like Gunicorn instead of 
    Flask's built-in development server.
    """
    app.run(debug=True, port=5004)
