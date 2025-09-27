import sys
import os

# Add the project root directory to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

# Import the Flask app
from app import app, init_db

# For Vercel, we should handle database initialization more gracefully
try:
    # Initialize the database within app context
    with app.app_context():
        # Only create tables if they don't exist (safer for production)
        from models import db
        db.create_all()
except Exception as e:
    # Log the error but don't crash the app
    print(f"Database initialization warning: {e}")
    # The app can still run without the database for static content

# This is the handler that Vercel will use
app = app