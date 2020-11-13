import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserHistory } from "history";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
import Loader from './views/Home/Loader';

import "assets/scss/material-kit-react.scss?v=1.9.0";

//Importing Pages 
import UserPortal from './views/Home/UserPortal';
import PartnerPortal from './views/Partner/PartnerPortal';
import Contact from './views/Helpdesk/Contact';
import PartnerSignup from './views/Partner/components/Signup/PartnerSignup';
import PartnerDashboard from './views/Partner/components/Dashboard/PartnerDashboard'
import FAQ from 'views/Helpdesk/FAQ';
import Testh from 'views/Helpdesk/Testh';


var hist = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={hist}>
        {/* <Router history={hist}> */}
        <Switch>
          <Route path="/home" component={UserPortal} />
          <Route path="/partner" component={PartnerPortal} />
          <Route path="/p-signup" component={PartnerSignup} />
          <Route path="/p-dashboard" component={PartnerDashboard} />
          <Route path="/contact" component={Contact} />
          <Route path="/FAQ" component={FAQ} />
          <Route path="/testh" component={Testh} />
          <Route path="/" component={UserPortal} />
        </Switch>
        {/* </Router> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(<Loader />, document.getElementById("loader"));