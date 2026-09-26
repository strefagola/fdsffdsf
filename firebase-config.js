const firebaseConfig = {
  apiKey: "AIzaSyAFd36LXlmO1vyS6ztRZcilPWNyEU6L8T8",
  authDomain: "biuro-16f65.firebaseapp.com",
  databaseURL: "https://biuro-16f65-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "biuro-16f65",
  storageBucket: "biuro-16f65.firebasestorage.app",
  messagingSenderId: "720364589922",
  appId: "1:720364589922:web:97225720a4f608a14a123b",
  measurementId: "G-Z4WH749S27"
};

// Inicjalizacja Firebase
firebase.initializeApp(firebaseConfig);

// Udostępnienie Firestore i Auth globalnie
window.db = firebase.firestore();
window.auth = firebase.auth();

// Kontrola w konsoli
console.log("Firebase zostało poprawnie załadowane.");
console.log("Firestore:", window.db);
console.log("Auth:", window.auth);
