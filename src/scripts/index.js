import 'regenerator-runtime';
import '../styles/main.css';
import App from './views/app';
import './globals/firebase-config';
import './script';

const app = new App({
  button: document.querySelector('.navbar-toggler'),
  drawer: document.querySelector('#navbarNav'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});
