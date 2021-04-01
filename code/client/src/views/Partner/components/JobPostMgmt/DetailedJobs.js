import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
  Box,
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
import parse from 'html-react-parser'

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
    marginTop: '100px',
    Directions: 'row',
    marginLeft: '10%',
    marginRight: '10%',
    flexDirection: "row",
    textAlign: 'left',
    justifyContent: 'center'
  },
  avatar: {
    height: 50,
    width: 50,
    justifyContent: 'center'
  },
  typo: {
    fontSize: "20px"
  }

})

function DetailedJobs(props) {
  const classes = useStyles();
  const history = useHistory();

  console.log("Data from List", props.location.state)

  let job = props.location.state;

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
        url: `http://localhost:5000/api/applied/${job.j_id}/${decoded.id}`,
      })
        .then(function (response) {
          //handle success
          console.log(response);
          //setJobsData(response.data.payload)

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
        <Box maxWidth="lg" className={classes.Container}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card>
                <CardHeader
                  title="Job Details"
                />
                <Divider />
                <CardContent>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Job Id: {job.j_id}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Role: {job.j_role}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Type: {job.j_type}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Date Posted: {job.j_posted_date}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Deadline: {job.j_deadline}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    City: {job.city}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    State: {job.state}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Country: {job.country}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Zipcode: {job.zip}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Description:
                  </Typography>
                  {parse(job.j_description)}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Typography
                color="textPrimary"
                className={classes.typo}
                gutterBottom
                variant='h5'
              >
                Applicants
                  </Typography>
              <Box maxWidth="lg" className={classes.Container}>
                <Grid container spacing={3}>
                  {/* {
                    Object.keys(applData).map(index => ( */}
                  <Grid item lg={6}>
                    <Card>
                      <CardContent>
                        <Box
                          alignItems="center"
                          display="flex"
                          flexDirection="row"
                        >
                          <Avatar
                            className={classes.avatar}
                          //src={user.u_profpic}
                          />
                          <Divider orientation="vertical" flexItem variant="middle" />

                          <Typography
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            variant="h6"
                          >
                            Sri Nikhil Racha
                            </Typography>
                        </Box>

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
                          //onClick={() => history.push('/jobinfo', jobsData[index])}
                          >
                            View Application
                          </Button>
                        </Grid>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item lg={6}>
                    <Card>
                      <CardContent>
                        <Box
                          alignItems="center"
                          display="flex"
                          flexDirection="row"
                        >
                          <Avatar
                            className={classes.avatar}
                          //src={user.u_profpic}
                          />
                          <Divider orientation="vertical" flexItem variant="middle" />

                          <Typography
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            variant="h6"
                          >
                            Sri Nikhil Racha
                            </Typography>
                        </Box>

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
                          //onClick={() => history.push('/jobinfo', jobsData[index])}
                          >
                            View Application
                          </Button>
                        </Grid>
                      </Box>
                    </Card>
                  </Grid>
                  {/* 
                    ))
                  } */}
                </Grid>
              </Box>
            </Grid>

          </Grid>

        </Box>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}



DetailedJobs.propTypes = {
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default compose(connect(mapStateToProps, {}, null))(DetailedJobs);
