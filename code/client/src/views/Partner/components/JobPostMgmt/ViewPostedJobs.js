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
  Box,
  Avatar,
  Divider,
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
      marginTop: '100px',
      Directions: 'row',
      marginLeft: '10%',
      marginRight: '10%',
      flexDirection: "row",
      textAlign: 'center'
    }
  })
  

function ViewPostedJobs(props) {
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
        
        <Box maxWidth="sm" className={classes.Container}>
           <Button onClick={()=> history.push('/jobpost')}
            color='primary'
            fullWidth
            size="small"
            type="submit"
            variant="contained"
          >
           + Add New Job
           </Button>
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
                        Software Engineer Intern
                      </Typography>
                      <Typography
                        align="center"
                        color="textPrimary"
                        variant="body1"
                      >
                        Internship
                      </Typography>
                      <Typography
                        align="center"
                        color="textPrimary"
                        variant="body1"
                      >
                        Job Posted: 31/03/2021
                      </Typography>
                      <Typography
                        align="center"
                        color="textPrimary"
                        variant="body1"
                      >
                        Job Deadline: 14/04/2021
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
                          onClick={nav1}
                        >
                          Open
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

ViewPostedJobs.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, {}, null))(ViewPostedJobs);