import React from 'react';

import RouteFactory from './routes/RouteFactory';

import './css/app.css';
import './css/index.css';
import './css/tokensale.webflow.css';
import './css/webflow.css';
import './css/antd.css';

export class App extends React.Component {
  render() {
    console.log('Version: 1.0.0');

    return <RouteFactory />;
  }
}

export default App;
