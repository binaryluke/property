import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.addEventListener('resize', debounce(() => {
  // Credit: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  // Still the best solution I've found for keeping full screen apps full screen!
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}, 100));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
