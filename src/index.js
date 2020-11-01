import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

//Importing Pages 
import UserPortal from './Home/UserPortal';


var hist = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={hist}>
      <Switch>
        <Route path="/home" component={UserPortal} />
        <Route path="/" component={UserPortal} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

