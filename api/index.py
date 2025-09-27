import sys
import os

# Add the project root directory to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

# Import the Flask app
from app import app, init_db

# Initialize the database within app context
with app.app_context():
    init_db()

# This is the handler that Vercel will use
app = app