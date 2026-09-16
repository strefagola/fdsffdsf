const firebaseConfig = {
  apiKey: "AIzaSyD8FLtqBTHXGfjAyUAy5G8DDAqB_tky9S28",
  authDomain: "sgstrefa.firebaseapp.com",
  projectId: "sgstrefa",
  storageBucket: "sgstrefa.firebasestorage.app",
  messagingSenderId: "396163945444",
  appId: "1:396163945444:web:99632a4dda16b08f412df1",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
