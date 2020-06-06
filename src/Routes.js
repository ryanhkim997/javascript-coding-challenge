import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import App from './components/App.js';
import PhotoList from './components/PhotoList.js';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/photos/:userId" component={PhotoList} />
      </Switch>
    </Router>
  )
}

export default Routes;