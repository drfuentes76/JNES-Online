
// Firebase configuration (public demo project)
const firebaseConfig = {
    apiKey: "AIzaSyCcehUGmj1OVFSHLBDAAiEhGdDbHRdGIrQ",
    authDomain: "tetris-arcade-demo.firebaseapp.com",
    projectId: "tetris-arcade-demo",
    storageBucket: "tetris-arcade-demo.appspot.com",
    messagingSenderId: "424381501952",
    appId: "1:424381501952:web:52b5d9db3e6e4f3a56f71f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
