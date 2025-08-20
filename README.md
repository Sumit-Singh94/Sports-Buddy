Sports Buddy ⚽🏀🎾
Sports Buddy is a web application designed to connect sports enthusiasts. It allows users to create and discover local sports events based on sport, location, and skill level.

📖 Table of Contents
Tech Stack

Core Features

Local Setup Guide

1. Frontend Setup

2. Appwrite Backend Setup

Application Workflow

Deployment

💻 Tech Stack
Frontend: Vite, React.js, Tailwind CSS

Backend (BaaS): Appwrite (handles authentication and database)

✨ Core Features
User
Authentication: Secure user registration and login.

Event Management: Create, view, and delete personal sports events.

Event Creation: Specify sport, location, time, and skill level for new events.

Admin
Admin Dashboard: A separate interface for administrative tasks.

Category Management: Add or delete sports, cities, and areas.

Event Moderation: View and delete any event created by any user.

🚀 Local Setup Guide
Follow these steps to run the project on your local machine.

1. Frontend Setup
Clone the Repository:

git clone <your-repository-url>
cd <your-project-directory>

Install Dependencies:

npm install

Create Environment File:
Create a .env file in the project's root directory. Copy the contents of .env.example (if available) or add the following variables. You will get these values from the Appwrite setup below.

VITE_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="YOUR_PROJECT_ID"
VITE_APPWRITE_DATABASE_ID="YOUR_DATABASE_ID"
VITE_SPORTS_COLLECTION_ID="YOUR_SPORTS_COLLECTION_ID"
VITE_CITIES_COLLECTION_ID="YOUR_CITIES_COLLECTION_ID"
VITE_AREAS_COLLECTION_ID="YOUR_AREAS_COLLECTION_ID"
VITE_EVENTS_COLLECTION_ID="YOUR_EVENTS_COLLECTION_ID"

Run the Development Server:

npm run dev

The application will be available at http://localhost:5173.

2. Appwrite Backend Setup
This is a mandatory step for the application to function.

Create Project:

Go to your Appwrite Console and create a new project.

Copy the Project ID into your .env file.

Add Web Platform:

In your project, navigate to Platforms.

Add a New Web App and register localhost as the hostname for local development.

Create Database:

Go to the Databases section and create a new database.

Copy the Database ID into your .env file.

Create Collections:
Inside your database, create the following four collections. For each one, you must add the specified attributes and set permissions.

sports Collection:

Attributes: name (String, Required)

Permissions: Grant Read access to the Users role.

cities Collection:

Attributes: name (String, Required)

Permissions: Grant Read access to the Users role.

areas Collection:

Attributes: name (String, Required)

Permissions: Grant Read access to the Users role.

events Collection:

Attributes: name, sport, city, area, skillLevel, ownerId, ownerName (all String, Required), and time (Datetime, Required).

Permissions: Grant Create access to the Users role. Enable Document Security to ensure users can only edit their own entries.

Configure an Admin User:

Run the app locally and register a new user.

In the Appwrite Console, go to Auth -> Users and find the user you just created.

Click the user, go to the Overview tab, and edit their Prefs.

Set the Prefs to the following JSON: { "isAdmin": true }. This flag grants admin privileges within the app.

🔄 Application Workflow
Authentication: Users register or log in.

Redirection: After login, the app checks the isAdmin preference.

Admins are sent to the Admin Dashboard.

Regular users are sent to the User Dashboard.

User Actions: Users can create events using a form, which then appear in their "My Events" list.

Admin Actions: Admins can manage categories (sports, cities, areas) and moderate all user-created events.

☁️ Deployment
Build for Production:

npm run build

This command creates a dist directory with the optimized, static files.

Deploy:
Host the contents of the dist folder on any static hosting service like Vercel, Netlify, or GitHub Pages.

Important: After deploying, add your production URL (e.g., your-app.vercel.app) as a new Web Platform in your Appwrite project settings.
