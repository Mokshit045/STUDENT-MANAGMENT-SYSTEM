# Vercel + MySQL Setup Guide

Use this guide to connect your Vercel deployment to a MySQL database.

## 1. Get a Hosted MySQL Database
Since Vercel doesn't host MySQL, you must use an external provider. I suggest one of these:
- **Aiven.io**: Excellent free tier.
- **Railway.app**: Quick and easy setup.

### After signup, get these values from your provider:
- **Host** (e.g., `mysql-xxxx.aivencloud.com`)
- **Username** (e.g., `avnadmin`)
- **Password**
- **Port** (usually `3306`)
- **SSL**: Most providers require `DB_SSL=true`.

## 2. Configure Vercel Environment Variables
Go to your **Vercel Project Dashboard** > **Settings** > **Environment Variables** and add:

| Key | Value |
|---|---|
| `DB_HOST` | *(from provider)* |
| `DB_USER` | *(from provider)* |
| `DB_PASSWORD` | *(from provider)* |
| `DB_NAME` | `student_mgmt` (or yours) |
| `DB_SSL` | `true` (if required) |

## 3. Deployment
1. **Push your changes** to GitHub:
   ```bash
   git add .
   git commit -m "Optimize for Vercel + MySQL"
   git push origin main
   ```
2. Vercel will automatically redeploy.
3. Check your Vercel deployment URL.

## 4. Local Testing
Your `.env` file should still work for your local database. Just ensure your local MySQL is running!
