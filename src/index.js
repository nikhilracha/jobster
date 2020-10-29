import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UserPortal from './Home/UserPortal';
import PartnerPortal from './Home/PartnerPortal';
import FAQ from './Helpdesk/FAQ';
import Contact from './Helpdesk/Contact';

ReactDOM.render(
  <React.StrictMode>
    <UserPortal />
    <PartnerPortal />
    <FAQ />
    <Contact />
  </React.StrictMode>,
  document.getElementById('root')
);