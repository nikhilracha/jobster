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
  appMain: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: '75px'
  }
})


function NewAccount(props) {
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
          <Container maxWidth="sm">
            <Typography
              color="textPrimary"
              variant="h4"
            >
              You Don't have any Active Plan.
                </Typography>
            <Typography
              color="textPrimary"
              variant="body1"
            >
              Please Select a plan.
                </Typography>
          </Container>
        </Box>

        <Box maxWidth="lg" className={classes.Container}>
          <Grid container spacing={3}>

            <Grid item lg={4}>
              <Card>
                <CardContent>

                  <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                  >
                    Plan 1
                      </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    1 Month
                      </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    - Unlimited Job Posting
                      </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    - 24/7 support
                      </Typography>
                </CardContent>
                <Box flexGrow={1} />
                <Divider />
                <Box p={2}>
                  <Grid
                    Container
                    justify='flex-end'
                  >
                    <Button
                      color='primary'
                      fullWidth
                      size="small"
                      type="submit"
                      variant="contained"
                      onClick={() => history.push('/p-accpayment', { plan: '200' })}
                    >
                      Pay $ 200
                          </Button>
                  </Grid>
                </Box>
              </Card>
            </Grid>


            <Grid item lg={4}>
              <Card>
                <CardContent>

                  <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                  >
                    Plan 2
                      </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    6 Month
                      </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    - Unlimited Job Posting
                      </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    - 24/7 support
                      </Typography>
                </CardContent>
                <Box flexGrow={1} />
                <Divider />
                <Box p={2}>
                  <Grid
                    Container
                    justify='flex-end'
                  >
                    <Button
                      color='primary'
                      fullWidth
                      size="small"
                      type="submit"
                      variant="contained"
                      onClick={() => history.push('/p-accpayment', { plan: '600' })}
                    >
                      Pay $ 600
                          </Button>
                  </Grid>
                </Box>
              </Card>
            </Grid>

            <Grid item lg={4}>
              <Card>
                <CardContent>

                  <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                  >
                    Plan 3
                      </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    12 Month
                      </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    - Unlimited Job Posting
                      </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    - 24/7 support
                      </Typography>
                </CardContent>
                <Box flexGrow={1} />
                <Divider />
                <Box p={2}>
                  <Grid
                    Container
                    justify='flex-end'
                  >
                    <Button
                      color='primary'
                      fullWidth
                      size="small"
                      type="submit"
                      variant="contained"
                      onClick={() => history.push('/p-accpayment', { plan: '999' })}
                    >
                      Pay $ 999
                          </Button>
                  </Grid>
                </Box>
              </Card>
            </Grid>

          </Grid>
        </Box>

      </div>
    </ThemeProvider>
  );
}

NewAccount.propTypes = {
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default compose(connect(mapStateToProps, {}, null))(NewAccount);