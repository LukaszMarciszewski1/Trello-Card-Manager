# Trello Card Manager

## Project Description
This is a commercial project for a printing company named Dreamtex.
The application allows generating orders based on a form template. The generated orders are represented as cards in the Trello application and automatically placed in the selected board, along with attachments, checklists, members, dates, and other information added to the order.

This enables the user to easily manage orders without the need to manually add this information. All cards are displayed in a dynamic table that allows for easy filtering and sorting, making it easier for the user to find the information they need and focus on the most important tasks.

## Built With
TypeScript,
React,
Firebase,
Module SCSS

## Demo
👉  https://trello-card-manager.netlify.app/

### Demo Account Credentials
Login:  `admin@demo.pl`
Password:  `Demo1234` 

### Trello board sharing link:
https://trello.com/invite/b/SqDigaOB/ATTI1a6e35ad35cc6aa4d3f14f40112f03bf66AA5F1D/ploterownia

## Running the Application
To run the project as a demo version, a .env file with pre-configured variables must be provided. 
This file should contain the necessary environment variables for the application to run, including the Trello and Firebase API keys and authentication tokens.

Clone the repository
Create a .env file in the project's root directory
In the .env file, set the environment variables as follows:
```
REACT_APP_TRELLO_API_KEY=your_trello_api_key
REACT_APP_TRELLO_TOKEN=your_trello_token
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=your_firebase_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```
Install the required libraries using the command npm install
Run the application using the command npm start
Open a web browser and navigate to http://localhost:3000/
