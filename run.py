#!/usr/bin/env python3
"""
FINBlog - Financial Tips for South African Students
Startup script for the Flask application
"""

import os
import sys
from app import app

if __name__ == '__main__':
    # Get configuration from environment variables
    debug = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    host = os.environ.get('FLASK_HOST', '0.0.0.0')
    port = int(os.environ.get('FLASK_PORT', 5000))
    
    print("🚀 Starting FINBlog...")
    print(f"📍 Running on http://{host}:{port}")
    print(f"🔧 Debug mode: {'ON' if debug else 'OFF'}")
    print("📝 Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        app.run(debug=debug, host=host, port=port)
    except KeyboardInterrupt:
        print("\n👋 Shutting down FINBlog...")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)
