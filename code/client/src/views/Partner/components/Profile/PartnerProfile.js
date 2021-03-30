import React from 'react'
import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
    makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import setAuthToken from '../../../../utils/setAuthToken';
import { setCurrentPartner } from '../../../../actions/authActions'
import store from '../../../../store'
import Header from '../Header';


const useStyles = makeStyles((theme) => ({

}));

const PartnerProfile = (props) => {

    const classes = useStyles();
    const history = useHistory();

    React.useEffect(() => {
        // Check for token
        if (localStorage.pt_jwtToken) {
            // Set auth token header auth
            console.log("in effect", localStorage.pt_jwtToken);
            setAuthToken(localStorage.pt_jwtToken);
            // Decode token and get user info and exp
            const decoded = jwt_decode(localStorage.pt_jwtToken);
            console.log("in effect decoded", decoded);
            // Set user and isAuthenticated
            store.dispatch(setCurrentPartner(decoded));

            // Check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                //console.log("App.js is running inside if and if")
                // Logout user
                //store.dispatch(logoutUser());
                // TODO: Clear current Profile
                console.log("Session Expired")
                // Redirect to login
                // window.location.href = "/login";
            }
        }
    }, [])

    React.useEffect(() => {
        if (!props.auth.isAuthenticated) {
            console.log("true");
            history.replace('/partner')
        }
    });





    return (
        <>
            <Header />
        </>
    )
}



PartnerProfile.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, {}, null))(PartnerProfile);