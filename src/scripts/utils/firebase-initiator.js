import { initializeApp } from 'firebase/app';

const FirebaseInitiator = {
  init({ firebaseConfig }) {
    initializeApp(firebaseConfig);
  },
};

export default FirebaseInitiator;
