import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import configureStore from './store/configureStore';

const appContainer = document.getElementById('app');

/**
 * Render React App on Client
 */
function render() {
  const store = configureStore();
  // Render routes
  ReactDOM.render(
    <Provider store={store}>
      <ReduxRouter />
    </Provider>,
    appContainer
  );

  if (ENV.DEVTOOLS) {
    require('./devtools/createDevToolsWindow').default(store);
  }
}

// Run the application when both DOM is ready
// and page content is loaded
if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', render);
} else {
  window.attachEvent('onload', render);
}
