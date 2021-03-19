import React from 'react'
import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';

import setAuthToken from "../../../../utils/setAuthToken";
import { setCurrentUser } from "../../../../actions/authActions";
import store from "../../../../store";

import Header from '../../components/Header/Header';
import HeaderLinksOut from '../../components/Header/HeaderLinksOut';
import Exp from './Exp';
import ProfileDetails from './ProfileDetails';
import ProfileComponent from './ProfileComponent';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    }
}));

const Profile = (props) => {

    const classes = useStyles();

    console.log("This is props", props)


    React.useEffect(() => {
        // Check for token
        if (localStorage.jwtToken) {
            // Set auth token header auth
            console.log("in effect", localStorage.jwtToken);
            setAuthToken(localStorage.jwtToken);
            // Decode token and get user info and exp
            const decoded = jwt_decode(localStorage.jwtToken);
            console.log("in effect decoded", decoded);
            // Set user and isAuthenticated
            store.dispatch(setCurrentUser(decoded));

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
        if (props.auth.isAuthenticated) {
            console.log("true");
        }
    });



    return (
        <>
            {props.auth.isAuthenticated ? <HeaderLinksOut user={props.auth.user} /> : <Header />}
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={5}
                            md={6}
                            xs={12}
                        >
                            <ProfileComponent />
                        </Grid>
                        <Grid
                            item
                            lg={7}
                            md={6}
                            xs={12}
                        >
                            <Exp />
                        </Grid>
                        <Grid
                            item
                            xs={5}
                        >
                            <ProfileDetails />
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </>
    )
}



Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, {}, null))(Profile);