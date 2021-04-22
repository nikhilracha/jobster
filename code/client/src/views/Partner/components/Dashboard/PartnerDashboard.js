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
  Button,
  Typography
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import ListAltIcon from '@material-ui/icons/ListAlt';


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


const useStyles = makeStyles((theme) => ({
  appMain: {
    width: '100%',
    marginTop: '20px',
    justifyContent: "center"
  },
  paper: {
    marginTop: '100px',
    textAlign: 'center',
  },
  icon: {
    height: 100,
    width: 100,
    justifyContent: "center"
  },
  card: {
    justifyContent: "center"
  }
}));

function PartnerDashboard(props) {
  const classes = useStyles();


  const history = useHistory();
  const nav1 = () => history.push('/viewpostjobs');
  const nav2 = () => history.push('/jobpost');

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
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Typography className={classes.paper}
          color="textPrimary"
          variant="h4"
        >
          Welcome to Partner Dashboard.
          </Typography>
        <Grid
          className={classes.appMain}
          container spacing={3}
        >
          <Grid item xs={3}>
            <Card spacing={3}>
              <CardContent>
                <ListAltIcon className={classes.icon} />
                <Button
                  color='primary'
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={nav1}
                >
                  View Posted Job
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent className={classes.card}>
                <DescriptionIcon className={classes.icon} />
                <Button
                  color='primary'
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={nav2}
                >
                  Post A New Job
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* <CssBaseline /> */}
      </div>
    </ThemeProvider>
  );
}

PartnerDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default compose(connect(mapStateToProps, {}, null))(PartnerDashboard);