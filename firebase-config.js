// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyD8FLtqBTHXGfjAyuaG5hDDAqB_tky9S28",
  authDomain: "sgstrefa.firebaseapp.com",
  projectId: "sgstrefa",
  storageBucket: "sgstrefa.firebasestorage.app",
  messagingSenderId: "396163945444",
  appId: "1:396163945444:web:99632a4dda16b08f412df1",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();