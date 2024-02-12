// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'sua-api-key',
  authDomain: 'seu-dominio.firebaseapp.com',
  projectId: 'seu-projeto-id',
  storageBucket: 'seu-storage-bucket.appspot.com',
  messagingSenderId: 'seu-sender-id',
  appId: 'seu-app-id',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default auth;
