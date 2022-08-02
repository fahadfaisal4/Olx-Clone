import firebase from "firebase";
import "firebase/auth";
import "firebase/firebase";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyClT9jdZGWGzaZqc2dk4_8ng7T0IoAvKdg",
  authDomain: "olx-clone-c1034.firebaseapp.com",
  projectId: "olx-clone-c1034",
  storageBucket: "olx-clone-c1034.appspot.com",
  messagingSenderId: "158451479017",
  appId: "1:158451479017:web:b23786e4fc7a80f56c1b78",
  measurementId: "G-NKQR0GPP1Z",
};

export default firebase.initializeApp(firebaseConfig);
