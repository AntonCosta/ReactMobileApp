import * as firebase from 'firebase';
// should go in a secret file
var config = {
    apiKey: "AIzaSyAV_hyE2rKb5oQR0QOVE4PjAENq3APyrwo",
    authDomain: "reactmobileapp-4027c.firebaseapp.com",
    databaseURL: "https://reactmobileapp-4027c.firebaseio.com",
    projectId: "reactmobileapp-4027c",
    storageBucket: "reactmobileapp-4027c.appspot.com",
    messagingSenderId: "972749276872"
};
firebase.initializeApp(config);

export default firebase;