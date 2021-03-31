import React from 'react'
import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
    Container,
    Grid,
    makeStyles,
} from '@material-ui/core';


import setAuthToken from "../../../../utils/setAuthToken";
import { setCurrentUser } from "../../../../actions/authActions";
import store from "../../../../store";

import Header from '../../components/Header/Header';
import HeaderLinksOut from '../../components/Header/HeaderLinksOut';
import Resume from './Resume';
import ProfileDetails from './ProfileDetails';
import ProfileComponent from './ProfileComponent';
import ProfileForm from './ProfileForm';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();

    const [profData, setProfData] = React.useState({})

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

            axios({
                method: "get",
                url: "http://localhost:5000/api/profile/" + decoded.id,
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    setProfData(response.data.payload)

                })
                .catch(function (error) {
                    //handle error
                    console.log(error);
                });

            // Check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                console.log("Session Expired")
                // Redirect to login
                // window.location.href = "/login";
            }
        }
        else {
            history.replace('/')
        }

    }, [localStorage.jwtToken])


    return (
        <>
            {props.auth.isAuthenticated ? <HeaderLinksOut user={props.auth.user} /> : <Header />}
            <div className={classes.root}>
                {parseInt(props.auth.user.profstatus) ?

                    <Container maxWidth="lg">
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xs={12}
                            >
                                <ProfileComponent user={profData} />
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xs={12}
                            >
                                <ProfileDetails user={profData} />
                            </Grid>
                            <Grid
                                item
                                lg={12}
                                md={12}
                                xs={12}
                            >
                                <Resume u_resume={profData.u_resume} />
                            </Grid>

                        </Grid>
                    </Container>

                    :
                    <Container maxWidth="lg">
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                lg={12}
                                md={12}
                                xs={12}
                            >
                                <ProfileForm id={props.auth.user.id} />
                            </Grid>
                        </Grid>
                    </Container>

                }
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