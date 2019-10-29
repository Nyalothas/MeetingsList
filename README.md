# MeetingsList

React app based on the LinkedIn course [React: SPAs](https://www.linkedin.com/learning/react-spas).


### Features

- [React Router](https://reach.tech/router) - custom routing
- [AntDesign](https://ant.design/) - UI library
- [Firebase🔥](https://firebase.google.com/) integration
- Authentication
- Authorization and DB manipulation.
- User rating
- Search

# Setup

**Clone repo**

```
git clone https://github.com/Nyalothas/MeetingsList.git
```

**Install dependencies**

```
npm install
```

## 🔥Firebase

 - Navigate to [Firebase](https://firebase.google.com/) and create an account
 - Go to [Firebase Console](https://console.firebase.google.com/)
 - Select *Add project*
 - Enter a project name
 - (Optional) - Enable analytics

After the project is created, click on it(this will open the project console).

 - Click on *Add app* , select the *Web* icon and enter a name for your app then *Register app*
 - Copy the `firebaseConfig` object

 Open `Firebase.js` file from under `src/` folder and replace the `firebaseConfig` object

 **Enable Firebase Authentication**

 - In the firebase console for your project, navigate to *Develop* > *Authentication* > *Sign-in method*
 - Select *Email/Password* and toggle the *Enable* switch
 - Be amazed how eazy it was🤯

**Enable Firebase Database**

- Open the Firebase console
- Navigate to *Develop* > *Database* > *Realtime Database* > *Create database*
- For testing purposes select *Start in test mode* then click on *enable*

**Enhance security rules**

We want to allow only authenticated users to write in the DB, except for the `/meetings/:meetingId/:userId/attendees` path section, where anybody will be able to write, since we want users to register.

- Open the Firebase console
- Navigate to *Develop* > *Database* > *Rules*
- Paste the following rule then *Publish* it.

```
{
    "rules": {
        ".read": true,
        ".write": "auth!=null",
          "meetings": {
              "$meetingId": {
                  "$userId": {
                      "attendees": {
                          ".write": true
                      }
                  }
              }
          }
    }
}
```
Where:

 - `".write": "auth!=null"` - meaning only authenticated users can write to the DB
 - We want to allow unauthenticated users to write to the `/meetings/:meetingId/:userId/attendees`

You can also simulate the *path* using the *Simulator*.

![](https://github.com/Nyalothas/MeetingsList/blob/master/docs/Simulate_write_path.png)

For more information about Firebase DB security check out [Firebase DB security docs](https://firebase.google.com/docs/database/security)


## Start the development server😊

```
npm run start
```