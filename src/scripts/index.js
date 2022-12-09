/* eslint-disable import/no-unresolved */
import 'regenerator-runtime';
import '../styles/main.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Landing, Dashboard } from './utils/user-authentication';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  content: document.querySelector('#mainContainer'),
});

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    Dashboard();
  } else {
    Landing();
  }
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
