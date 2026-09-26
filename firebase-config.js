const firebaseConfig = {
  apiKey: "AIzaSyDRe-r50Ip_FgMIbociR5BRVonxQvh_VsQ",
  authDomain: "insta-18495.firebaseapp.com",
  projectId: "insta-18495",
  storageBucket: "insta-18495.firebasestorage.app",
  messagingSenderId: "722306681308",
  appId: "1:722306681308:web:66715ab9a6fb4fd0e0a719",
  measurementId: "G-18K686YMZX"
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
