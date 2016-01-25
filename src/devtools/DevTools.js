/* eslint-disable quote-props */

import React from 'react';

import { createDevTools } from 'redux-devtools';

import ChartMonitor from 'redux-devtools-chart-monitor';

const tooltipOptions = {
  disabled: false,
  offset: { left: 30, top: 10 },
  indentationSize: 2,
  style: {
    'background-color': 'lightgrey',
    'opacity': '0.7',
    'border-radius': '5px',
    'padding': '5px'
  }
};

const DevTools = createDevTools(
  <ChartMonitor
    theme="tomorrow"
    tooltipOptions={tooltipOptions}
  />
);

export default DevTools;
