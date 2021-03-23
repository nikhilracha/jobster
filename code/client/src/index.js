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
import SearchResults from 'views/Home/SearchResults';
import PostJob from './views/Home/PostJob';
import App from 'views/Admin/App';
import A_home from 'views/Admin/A_home';
import Profile from 'views/Home/components/Profile/Profile';
import ClientInfo from 'views/Admin/ClientInfo';
import PostAd from 'views/Admin/PostAd';
import ClientDetails from 'views/Admin/ClientDetails';

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
          <Route path="/results" component={SearchResults} />
          <Route path="/FAQ" component={FAQ} />
          <Route path="/testh" component={Testh} />
          <Route path="/post" component={PostJob} />
          <Route path="/admin" component={App} />
          <Route path="/a_home" component={A_home} />
          <Route path="/profile" component={Profile} />
          <Route path="/clientinfo" component={ClientInfo} />
          <Route path="/clientdetails/:clientid" component={ClientDetails} />
          <Route path="/postad" component={PostAd} />
          <Route path="/" component={UserPortal} />
        </Switch>
        {/* </Router> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(<Loader />, document.getElementById("loader"));