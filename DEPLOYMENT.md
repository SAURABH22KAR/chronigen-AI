# Deployment Guide - Chronigen AI Website

## Prerequisites

1. A GitHub account (free at github.com)
2. A Netlify account (free at netlify.com)
3. Your Supabase URL and Anon Key (from your .env file)

## Step 1: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
   - Name it something like `chronigen-ai-website`
   - Do NOT initialize with README, .gitignore, or license
   - Click "Create repository"

2. Add the GitHub remote to your local repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/chronigen-ai-website.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Set Up Netlify

1. Go to https://netlify.com and sign up (or log in)

2. Click "Add new site" → "Import an existing project"

3. Choose GitHub as your Git provider and authenticate

4. Select your `chronigen-ai-website` repository

5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

## Step 3: Configure Environment Variables

1. In Netlify dashboard, go to your site settings

2. Navigate to "Build & deploy" → "Environment"

3. Add these environment variables:
   - Key: `VITE_SUPABASE_URL` → Value: Your Supabase URL from .env
   - Key: `VITE_SUPABASE_ANON_KEY` → Value: Your Supabase Anon Key from .env

4. Trigger a new deploy (Site settings → Deploys → Trigger deploy)

## Step 4: Set Up Custom Domain (Optional)

1. In Netlify, go to your site settings

2. Click "Domain settings" → "Add custom domain"

3. Enter your domain and follow the DNS instructions

## Step 5: Enable Continuous Deployment

Your site will automatically redeploy whenever you:
- Push changes to the main branch on GitHub
- No additional setup needed!

## Troubleshooting

### Site shows blank page
- Check browser console (F12) for errors
- Verify environment variables are set in Netlify
- Check Netlify build logs for compilation errors

### Contact form not working
- Verify Supabase URL and Anon Key are correct
- Check Netlify Functions logs
- Ensure Supabase RLS policies allow inserts

### Routing issues (404 on page reload)
- The `netlify.toml` file handles SPA routing
- Ensure it's included in your deployment

## Making Updates

1. Make changes locally
2. Commit: `git add . && git commit -m "Your message"`
3. Push: `git push origin main`
4. Netlify automatically deploys within 1-2 minutes

Enjoy your live website!
