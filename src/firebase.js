import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDBDtyqhrpzvg5PI7JVY8p2FoNqD3bJcJM',
  authDomain: 'slack-clone-9516e.firebaseapp.com',
  projectId: 'slack-clone-9516e',
  storageBucket: 'slack-clone-9516e.appspot.com',
  messagingSenderId: '650693053645',
  appId: '1:650693053645:web:0ed629d576510a98866d84',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
