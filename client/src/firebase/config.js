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
export const firestore = firebase.firestore()

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
//const faceProvider = new firebase.auth.FacebookAuthProvider();

GoogleProvider.setCustomParameters({ prompt: "select_account" });


//export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);
//export const signInWithFaceBook = () => auth.signInWithPopup(faceProvider);

export const signOutWithGoogle = () => auth.signOut()

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return
  const { uid } = userAuth;
  
  const userRef = firestore.doc(`users/${uid}`)
  const snapshot = userRef.get()

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();


    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData
      })
    } catch (err) {
      console.log(err)
    }
  }

  return userRef
}

export default firebase;
