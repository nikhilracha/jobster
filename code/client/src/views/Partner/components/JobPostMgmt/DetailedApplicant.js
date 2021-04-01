import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
    Box,
    Container,
    Grid,
    Card,
    Typography,
    CardContent,
    CardHeader,
    Divider,
    Avatar,
    Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import setAuthToken from '../../../../utils/setAuthToken';
import { setCurrentPartner } from '../../../../actions/authActions'
import axios from "axios";
import store from '../../../../store'
import jwt_decode from "jwt-decode";
import Header from '../Header';
import ApplicantResume from './DetailedApplicant/ApplicantResume';
import ApplicantProfileDetails from './DetailedApplicant/ApplicantProfileDetails';
import ApplicantProfileComponent from './DetailedApplicant/ApplicantProfileComponent';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#2867B2",
        },
        background: {
            default: "#f4f5fd"
        },
    },
})


const useStyles = makeStyles({
});

function DetailedApplicant(props) {
    const classes = useStyles();
    const history = useHistory();

    const [applicant, setApplicant] = React.useState({});

    console.log("Data from List", props.location.state)

    let u_ID = props.location.state.u_ID;

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
                url: "http://localhost:5000/api/profile/" + u_ID,
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    setApplicant(response.data.payload)

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
        <ThemeProvider theme={theme}>
            <div>
                <Header />
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
                            <ApplicantProfileComponent user={applicant} />
                        </Grid>
                        <Grid
                            item
                            lg={6}
                            md={6}
                            xs={12}
                        >
                            <ApplicantProfileDetails user={applicant} />
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xs={12}
                        >
                            <ApplicantResume u_resume={applicant.u_resume} />
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </ThemeProvider>

    );
}

DetailedApplicant.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, {}, null))(DetailedApplicant);
