import React from 'react';
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import HeaderLinksOut from "../../components/Header/HeaderLinksOut.js";
import SearchBar from "./components/SearchBar/SearchBar";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser } from "../../actions/authActions";
import jwt_decode from "jwt-decode";
import store from "../../store";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '200px',
    },
}));

function UserPortal(props) {
    const { ...rest } = props;
    const classes = useStyles();
    console.log("Props", props);

    React.useEffect(() => {
        // Check for token
        if (localStorage.jwtToken) {
            // Set auth token header auth
            setAuthToken(localStorage.jwtToken);
            // Decode token and get user info and exp
            const decoded = jwt_decode(localStorage.jwtToken);
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
            <Header
                brand="JOBSTER"
                rightLinks={props.auth.isAuthenticated ? <HeaderLinksOut user={props.auth.user} /> : <HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />

            <div className={classes.root}>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <SearchBar />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

UserPortal.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, {}, null))(UserPortal);
