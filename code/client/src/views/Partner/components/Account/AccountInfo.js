import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentPartner } from 'actions/authActions';
import setAuthToken from "../../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "../../../../store";
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import {
  Grid,
  Card,
  CardContent,
  Container,
  TextField,
  Box,
  Avatar,
  Divider,
  Button,
  Typography
} from '@material-ui/core';

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
    appMain: {
      width: '100%',
      marginTop: '100px',
      minHeight: '100%',
    },
    icon: {
      height: 100,
      width: 100,
      justifyContent: "center"
    },
    Container: {
      // backgroundColor: '#000000',
      marginTop: '50px',
      Directions: 'row',
      marginLeft: '10%',
      marginRight: '10%',
      flexDirection: "row",
      textAlign: 'center'
    },
    appMain:{
        display:"flex",
        flexDirection:"row",
        justifyContent: "center",
        marginTop: '75px',
        textAlign: 'left'
    },
    typo:{
        textAlign: 'left',
        backgroundColor: '#2867B2',
        color: '#ffffff'
    }
  })
  

function AccountInfo(props) {
    const classes = useStyles();


    const history = useHistory();
    const nav1 = () => history.push('/jobinfo');

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
        else {
            history.replace('/partner')
        }
    }, [localStorage.pt_jwtToken])

    return (
        <ThemeProvider theme={theme}>
            <div>
        <Header />
        
        <Box className={classes.appMain}>
        <Container maxWidth="md">
                <Typography
                color="textPrimary"
                variant="h4"
                >
                    Hi Adam!
                </Typography>
           </Container>
           </Box>

                

          </div>
        </ThemeProvider>
    );
}

AccountInfo.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, {}, null))(AccountInfo);
