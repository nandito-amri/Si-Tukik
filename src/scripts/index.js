import 'regenerator-runtime';
import '../styles/main.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Landing, Dashboard } from './utils/user-authentication';
import App from './views/app';

const app = new App();

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    Dashboard(user);
  } else {
    Landing();
  }
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});
