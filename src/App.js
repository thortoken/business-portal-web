import React from 'react';

import RouteFactory from './routes/RouteFactory';

import './css/app.css';
import './css/index.css';
import './css/tokensale.webflow.css';
import './css/webflow.css';
import './utilities.js';

export default class App extends React.Component {
  render() {
    return <RouteFactory />;
  }
}
