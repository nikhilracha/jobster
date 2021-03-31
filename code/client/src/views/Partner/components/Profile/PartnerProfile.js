import React from 'react'
import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
    makeStyles,
    Container,
    Grid
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import setAuthToken from '../../../../utils/setAuthToken';
import { setCurrentPartner } from '../../../../actions/authActions'
import store from '../../../../store'
import Header from '../Header';
import Profileform from './ProfileForm';
import ProfileComponent from './ProfileComponent';
import PartnerCompanyProfile from './PartnerCompanyProfile';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    }

}));

const PartnerProfile = (props) => {

    const classes = useStyles();
    const history = useHistory();

    const [profData, setProfData] = React.useState({})

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


            axios({
                method: "get",
                url: "http://localhost:5000/api/p-profile/" + decoded.id,
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
            history.replace('/partner')
        }
    }, [localStorage.pt_jwtToken])







    return (
        <>
            <Header />
            <div className={classes.root}>
                {props.auth.user.profstatus ?

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
                                <PartnerCompanyProfile user={profData} />
                            </Grid>


                        </Grid>
                    </Container>


                    // <p>created already and shows profile</p>
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
                                <Profileform id={props.auth.user.id} />
                            </Grid>
                        </Grid>
                    </Container>
                }
                {/* } */}
            </div>
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