import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import App from './components/App.js';
import Photos from './components/Photos.js';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <App />
        </Route>
        <Route path="/photos/:userId">
          <Photos />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes;