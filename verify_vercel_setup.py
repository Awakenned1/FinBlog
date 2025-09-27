#!/usr/bin/env python3
"""
Vercel Deployment Verification Script
This script verifies that the FinBlog application is ready for Vercel deployment.
"""

import sys
import os
import tempfile

# Add current directory to Python path
sys.path.insert(0, '.')

def test_imports():
    """Test that all required modules can be imported."""
    print("🔍 Testing imports...")
    try:
        from api.index import app
        print("  ✅ Flask app imports successfully")
        return app
    except Exception as e:
        print(f"  ❌ Import failed: {e}")
        return None

def test_routes(app):
    """Test that all main routes respond correctly."""
    print("🔍 Testing routes...")
    
    # Set production environment
    os.environ['FLASK_ENV'] = 'production'
    os.environ['SECRET_KEY'] = 'test-key-for-verification'
    
    routes = [
        ('/', 'Home'),
        ('/about', 'About'),
        ('/contact', 'Contact'),
        ('/blog', 'Blog'),
        ('/search', 'Search'),
        ('/login', 'Login'),
        ('/register', 'Register')
    ]
    
    failed = []
    with app.test_client() as client:
        for route, name in routes:
            try:
                response = client.get(route)
                if response.status_code == 200:
                    print(f"  ✅ {name} ({route}) - OK")
                else:
                    print(f"  ❌ {name} ({route}) - Status {response.status_code}")
                    failed.append(route)
            except Exception as e:
                print(f"  ❌ {name} ({route}) - Error: {e}")
                failed.append(route)
    
    return failed

def test_static_files(app):
    """Test that static files are accessible."""
    print("🔍 Testing static files...")
    
    static_files = [
        '/static/css/style.css',
        '/static/js/main.js'
    ]
    
    failed = []
    with app.test_client() as client:
        for static_file in static_files:
            try:
                response = client.get(static_file)
                if response.status_code == 200:
                    print(f"  ✅ {static_file} - OK")
                else:
                    print(f"  ❌ {static_file} - Status {response.status_code}")
                    failed.append(static_file)
            except Exception as e:
                print(f"  ❌ {static_file} - Error: {e}")
                failed.append(static_file)
    
    return failed

def check_files():
    """Check that required files exist."""
    print("🔍 Checking required files...")
    
    required_files = [
        'vercel.json',
        'api/index.py',
        'requirements.txt',
        'app.py',
        'models.py',
        'config.py'
    ]
    
    missing = []
    for file_path in required_files:
        if os.path.exists(file_path):
            print(f"  ✅ {file_path} - Found")
        else:
            print(f"  ❌ {file_path} - Missing")
            missing.append(file_path)
    
    return missing

def main():
    """Run all verification tests."""
    print("🚀 FinBlog Vercel Deployment Verification")
    print("=" * 50)
    
    # Check files
    missing_files = check_files()
    
    # Test imports
    app = test_imports()
    if not app:
        print("\n❌ Cannot proceed - import failed")
        return 1
    
    # Test routes
    failed_routes = test_routes(app)
    
    # Test static files
    failed_static = test_static_files(app)
    
    # Summary
    print("\n📊 Verification Summary")
    print("=" * 30)
    
    if missing_files:
        print(f"❌ Missing files: {', '.join(missing_files)}")
    else:
        print("✅ All required files present")
    
    if failed_routes:
        print(f"❌ Failed routes: {', '.join(failed_routes)}")
    else:
        print("✅ All routes working")
    
    if failed_static:
        print(f"❌ Failed static files: {', '.join(failed_static)}")
    else:
        print("✅ All static files accessible")
    
    total_issues = len(missing_files) + len(failed_routes) + len(failed_static)
    
    if total_issues == 0:
        print("\n🎉 SUCCESS: Your app is ready for Vercel deployment!")
        return 0
    else:
        print(f"\n⚠️  WARNING: {total_issues} issue(s) found. Please fix them before deployment.")
        return 1

if __name__ == "__main__":
    sys.exit(main())