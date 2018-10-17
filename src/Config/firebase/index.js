import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB7wDUQE1HLe7P7TuBgVIU2DEA57EXH2sY",
    authDomain: "meetingapp3011.firebaseapp.com",
    databaseURL: "https://meetingapp3011.firebaseio.com",
    projectId: "meetingapp3011",
    storageBucket: "",
    messagingSenderId: "228652578963"
};
const fire = firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();
export { db, fire, auth, provider};