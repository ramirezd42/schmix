import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import Schmix from './containers/Schmix';

const appContainer = document.getElementById('app');
/**
 * Render React App on Client
 */
function render() {
  const store = configureStore();
  // Render routes
  ReactDOM.render(
    <Provider store={store}>
      <App>
        <Schmix/>
      </App>
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
