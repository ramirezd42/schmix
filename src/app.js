import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import configureStore from './store/configureStore';

// Create application containers for React app and CSS
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

  if (process.env.NODE_ENV !== 'production') {
    // Use require because imports can't be conditional.
    // In production, you should ensure process.env.NODE_ENV
    // is envified so that Uglify can eliminate this
    // module and its dependencies as dead code.
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
