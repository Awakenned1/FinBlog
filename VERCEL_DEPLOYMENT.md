# Vercel Deployment Guide for FinBlog

## Overview
This guide explains how to deploy the FinBlog Flask application to Vercel.

## Files Added for Vercel Support

### 1. `vercel.json`
Configuration file that tells Vercel:
- Use Python runtime (`@vercel/python`)
- Route static files directly to `/static/`
- Route all other requests to the serverless function
- Set production environment variables

### 2. `api/index.py`
Serverless function handler that:
- Imports the Flask application
- Initializes the database safely
- Handles potential database errors gracefully
- Exposes the app for Vercel to serve

## Deployment Steps

1. **Connect to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the `vercel.json` configuration

2. **Set Environment Variables**
   - In Vercel dashboard, set these environment variables:
     - `SECRET_KEY`: A secure secret key for Flask sessions
     - `DATABASE_URL`: (Optional) External database URL for persistence

3. **Deploy**
   - Push changes to your main branch
   - Vercel will automatically build and deploy
   - The app will be available at your Vercel URL

## Important Notes

- **Database**: The current setup uses SQLite which is ephemeral on Vercel
- **Static Files**: CSS, JS, and images are served directly by Vercel
- **Uploads**: File uploads work but are not persistent between deployments
- **Environment**: The app runs in production mode on Vercel

## Troubleshooting

If you encounter issues:
1. Check the Vercel function logs in the dashboard
2. Ensure all required dependencies are in `requirements.txt`
3. Verify environment variables are set correctly
4. Check that static files exist in the `/static/` directory

## Production Considerations

For a production deployment, consider:
- Using a persistent database (PostgreSQL, MySQL)
- Setting up proper file upload storage (AWS S3, Cloudinary)
- Configuring custom domain and SSL
- Setting up monitoring and logging