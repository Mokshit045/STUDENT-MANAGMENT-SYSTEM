# Deployment and Connection Guide

This guide follows the **Modern Web Development Workflow** to help you deploy your Student Management System.

## 1. Local Database Setup
Before running the app locally, ensure you have MySQL installed.
1. Open your MySQL terminal or a tool like MySQL Workbench.
2. Run the commands in [schema.sql](file:///c:/Users/TAARUN%20N/Downloads/New%20folder/new%20website/schema.sql) to create the database and table.
3. Update your `.env` file with your local credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=student_mgmt
   ```

## 2. Connect Backend and Frontend
The backend (Node.js) connects to MySQL using the `mysql2` pool in `config/db.js`.
- Run `npm install` to install dependencies.
- Run `npm start` to start the server.
- The frontend (index.html) communicates with the backend via the `/api/students` endpoints.

## 3. Version Control (Git & GitHub)
As shown in your workflow diagram:
1. Initialize Git: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Migrate to MySQL"`
4. Create a repository on [GitHub](https://github.com).
5. Push your code:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

## 4. Cloud Deployment (Hosting)
To deploy online with a database:
1. **Database**: Use a managed MySQL service like **Aiven**, **PlanetScale**, or **Railway**.
2. **Backend/Frontend**: Deploy to **Vercel**, **Heroku**, or **Render**.
   - For Vercel, the `vercel.json` is already configured.
   - Connect your GitHub repo to Vercel for automatic CI/CD (every push redeploys the site).
3. **Environment Variables**: Add your production `DB_HOST`, `DB_USER`, etc., in the Vercel dashboard settings.

## 5. Domain and DNS
- Once deployed, Vercel provides a `.vercel.app` domain.
- You can connect a custom domain by updating the DNS records at your domain registrar to point to Vercel's servers.

---
**Happy Coding!**
