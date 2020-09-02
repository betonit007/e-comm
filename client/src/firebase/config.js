import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCXobbjJ2xBnnWjg4kUwZ_M0RjbWhSxZ4o",
    authDomain: "e-commerce-41.firebaseapp.com",
    databaseURL: "https://e-commerce-41.firebaseio.com",
    projectId: "e-commerce-41",
    storageBucket: "e-commerce-41.appspot.com",
    messagingSenderId: "126237537010",
    appId: "1:126237537010:web:11251ef1742cdd765dd66b",
    measurementId: "G-R8Q7FB27PV"
  };

    //Initialize firebase
    firebase.initializeApp(firebaseConfig);

    export const auth = firebase.auth();
    
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    //const faceProvider = new firebase.auth.FacebookAuthProvider();
    
    GoogleProvider.setCustomParameters({ prompt: "select_account" });
    export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);
    //export const signInWithFaceBook = () => auth.signInWithPopup(faceProvider);

    export const signOutWithGoogle = () => auth.signOut()
    
    export default firebase;
    