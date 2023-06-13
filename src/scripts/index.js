import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import swRegister from './utils/sw-register';
import App from './views/app';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
// eslint-disable-next-line no-unused-vars
const START = 10;
// eslint-disable-next-line no-unused-vars
const NUMBER_OF_IMAGES = 100;

const app = new App({
  menuHamburger: document.querySelector('#hamburger'),
  navList: document.querySelector('.nav-list'),
  mainElement: document.querySelector('.nav-list'),
  content: document.querySelector('#resto-content'),
});

const skipLink = document.querySelector('.skip-link');
const mainContent = document.querySelector('#maincontent');

// tutorial dari reviewer
skipLink.addEventListener('click', (event) => {
  event.preventDefault();
  mainContent.scrollIntoView({ behavior: 'smooth' });
  skipLink.blur();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
