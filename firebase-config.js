const firebaseConfig = {
  apiKey: "AIzaSyDYUu7tOwONLUuCWpI3LRPuzCVqSxuuZHU",
  authDomain: "facebook-1b634.firebaseapp.com",
  projectId: "facebook-1b634",
  storageBucket: "facebook-1b634.firebasestorage.app",
  messagingSenderId: "53424277943",
  appId: "1:53424277943:web:5323c9a7f64e2f5f0a0032",
  measurementId: "G-CNXLHRLY71"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
