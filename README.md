# Pluma Notes App
https://pluma-notes.web.app

Pluma notes is a web-based note-taking application that allows users to create, read, update, and delete notes. The app uses Firebase as a backend to authenticate users and store the notes in a database. It is built using ReactJS and designed with Bootstrap.

## Technologies Used
- React
- Firebase
- Bootstrap

## Major Functions

- Users can login and logout of the app using their Google account.
- Users can add notes to their account.
- Users can edit and delete their own notes.
- Users can view all notes made by all users (for showcase purposes only).

## Dependencies
- Node.js
- npm
- Git

## Installation:
1. Clone the repository from GitHub.
```
git clone https://github.com/keanureano/pluma-notes.git
```
2. Navigate to the project directory:
```
cd ./pluma-notes
```
3. Install the dependencies:
```
npm install
```
4. Set Up Firebase:
```
- Go to the Firebase Console and create a new Firebase project.
- Enable Firebase Authentication in the Authentication tab.
- Enable Firebase Firestore in the Firestore tab of your Firebase project.
- Create a new Web App in the Firebase project.
- Copy paste the Firebase configuration into src/firebase-config.js.
- Add a new collection named notes in the Firestore database.
```
5. Run the program:
```
npm start
```

## Deployment:
1. Set up Firebase Hosting:
```
npm install -g firebase-tools
firebase login
firebase init hosting
```
2. Build the App
```
npm run build
```
3. Deploy the App
```
firebase deploy
```
