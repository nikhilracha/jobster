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
  CardHeader,
  Box,
  Avatar,
  Divider,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#2867B2",
      },
      background: {
        default: "#f4f5fd"
      },
      // closeButton: {
      //   position: 'absolute',
      //   right: theme.spacing(1),
      //   top: theme.spacing(1),
      //   color: theme.palette.grey[500],
      // },
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
        textAlign: 'center',
        // backgroundColor: '#2867B2',
        // color: '#ffffff'
    }
  })
  

function AccountInfo(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


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
                className={classes.typo}
                color="textPrimary"
                variant="h4"
                >
                    Hi Adam!
                </Typography>
           </Container>
           </Box>

           <Box maxWidth="lg" className={classes.Container}>
            <Grid container spacing={3}> 

            <Grid item lg={6}>
              <Card>
              <CardHeader
                title="Your Account Summary"
              />
              <Divider />
              <CardContent>
                <TextField
                  disabled
                  fullWidth
                  label="Your email"
                  id="outlined-disabled"
                  defaultValue="Example@email.com"
                  variant="outlined"
                />
                <Divider />
                <Box p={2}>
                      <Grid
                        Container
                        justify='flex-end'
                      >
                        <Button
                          color='primary'
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          onClick={() => handleClickOpen()}
                        >
                          Change Password
                          </Button>
                      </Grid>
                    </Box>
              </CardContent>
              </Card>
            </Grid>

            <Grid item lg={6}>
              <Card>
              <CardHeader
                title="Your Active Subscription"
              />
              <Divider />
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
                        - Feature 1
                      </Typography>
                      <Typography
                        align="center"
                        color="textPrimary"
                        variant="body1"
                      >
                        - Feature 2
                      </Typography>
                {/* <Divider /> */}
                <Box p={2}>
                      <Grid
                        Container
                        justify='flex-end'
                      >
                        <Button
                          color='primary'
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Edit
                          </Button>
                      </Grid>
                    </Box>
              </CardContent>
              </Card>
            </Grid>

            </Grid>
            </Box>
            <Formik
                    initialValues={{
                    current: '',
                    new: '',
                    newConfirm: '',
                    }}
                    validationSchema={Yup.object().shape({
                    current: Yup.string().max(1000).required(' Current password is required'),
                    new: Yup.string().max(10000).required(' New password is required'),
                    newConfirm: Yup.string().max(100).required(' New password conformaton is required'),
                    })}
                    onSubmit={(values,actions) => {
                      console.log(values)
                    }}

              >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit} autoComplete="off">

            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogTitle id="alert-dialog-title">{"Change Password?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter details to change password.
            
                <TextField
                        error={Boolean(touched.current && errors.current)}
                        fullWidth
                        helperText={touched.current && errors.current}
                        label="Current Password *"
                        margin="normal"
                        name="current"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.current}
                        variant="outlined"
                      />
                <TextField
                        error={Boolean(touched.new && errors.new)}
                        fullWidth
                        helperText={touched.new && errors.new}
                        label="New Password *"
                        margin="normal"
                        name="new"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.new}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.newConfirm && errors.newConfirm)}
                        fullWidth
                        helperText={touched.newConfirm && errors.newConfirm}
                        label="Confirm New Password *"
                        margin="normal"
                        name="newConfirm"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.newConfirm}
                        variant="outlined"
                      />
                
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
          // onClick={() => history.push('')}  
           color="primary" type="submit" autoFocus>
            Proceed
          </Button>
          
        </DialogActions>
        
      </Dialog>
      </form>
            )}
              
</Formik>     

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
