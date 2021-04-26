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
import axios from 'axios';
import Header from '../Header';
import MuiAlert from '@material-ui/lab/Alert';
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
  Snackbar,
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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

function AccountInfo(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState(false);

    let purchased = new Date(parseInt(props.auth.user.acsubscribed))


    const handleMsg = () => {
      setMsg(true);
    };

    const handleCloseMsg = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setMsg(false);
    };

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

            if(decoded.acstatus==0) history.replace('/p-new-account') 
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
                    Hi {`${props.auth.user.fname} ${props.auth.user.lname}!`}
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
                  value={props.auth.user.email}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                &nbsp;
                <TextField
                  disabled
                  fullWidth
                  label="Purchased Subscription date"
                  id="outlined-disabled"
                  value= {purchased.toDateString()}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                          // type="submit"
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
                        {props.auth.user.acplan === 200 ? `Plan 1` : props.auth.user.acplan === 600 ? `Plan 2` : `Plan 3`}
                      </Typography>
                      <Typography
                        align="center"
                        color="textPrimary"
                        variant="body1"
                      >
                        {props.auth.user.acplan === 200 ? `1 Month` : props.auth.user.acplan === 600 ? `6 Months` : `12 Months`}
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
                      &nbsp;
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
                          onClick={()=>history.push('/p-ac-manage')}
                          variant="contained"
                        >
                          Manage
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
                    newConfirm:    Yup.string()
                    .oneOf([Yup.ref('new'), null], 'Passwords must match'), 
                    })}
                    onSubmit={(values,actions) => {
                      values.email = props.auth.user.email
                      console.log(values)
                      
                      axios({
                        method: "post",
                        url: "http://localhost:5000/api/p-pass-change",
                        data: values,
                      })
                        .then(function (response) {
                          //handle success
                          console.log(response);
                          if (response.data.success) {
                            console.log("Updated password")
                            handleClose()
                            handleMsg()
                            actions.resetForm();
                          }
              
                        })
                        .catch(function (error) {
                          //handle error
                          console.log(error.response.data);
                          actions.setErrors(error.response.data)
                        });
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
                        type="password"
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
                        type="password"
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
                        type="password"
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
           color="primary" variant="contained" onClick={handleSubmit} autoFocus>
            Proceed
          </Button>
          
        </DialogActions>
        
      </Dialog>
      </form>
            )}
              
</Formik>  
<Snackbar open={msg} onClose={handleCloseMsg} autoHideDuration={3000} >
        <Alert onClose={handleCloseMsg} severity="success">
          Password Changed Successfully!
        </Alert>
      </Snackbar>
  

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
