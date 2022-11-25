import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA99tEGniA4xGadgg4UdzfYf5UKYB4F6Oo",
  authDomain: "login-10e36.firebaseapp.com",
  projectId: "login-10e36",
  storageBucket: "login-10e36.appspot.com",
  messagingSenderId: "11363529889",
  appId: "1:11363529889:web:3f753cf2aa26cb52f26ce0"
};

    app.initializeApp(firebaseConfig);

    const db = app.firestore()
    const auth = app.auth()

    export {db,auth}