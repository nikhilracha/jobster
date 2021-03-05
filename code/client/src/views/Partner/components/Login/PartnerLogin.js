import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Formik, ErrorMessage } from 'formik';
import { Visibility, VisibilityOff } from "@material-ui/icons";

// @material-ui/core components

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';

import { PartnerLoginSchema } from '../../../../validation/Validations';

import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { asyncPartnerLogin, setCurrentPartner } from "../../../../actions/authActions";
import { useHistory } from 'react-router-dom';


import setAuthToken from "../../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "../../../../store";



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Jobster
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function PartnerLogin(props) {
    const history = useHistory();

    const classes = useStyles();

    const [visible, setVisible] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setVisible({ ...visible, showPassword: !visible.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
        console.log("props", props)
        if (props.auth.isAuthenticated) {
            history.push("/p-dashboard");
        }
    });


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={PartnerLoginSchema}
                        onSubmit={(values, actions) => {
                            console.log("props", values)

                            props.asyncPartnerLogin(values)
                                .then(res => {
                                    actions.setErrors(res);
                                    actions.setSubmitting(false);
                                    console.log("response", res);
                                    if (res.error) {
                                        console.log("error in login", res.error)
                                    }
                                })
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    <ErrorMessage name="email" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={visible.showPassword ? 'text' : 'password'}
                                        id="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        autoComplete="new-password"
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {visible.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>

                                        }}
                                    />
                                    <ErrorMessage name="password" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container justify="center">
                                        <Grid item>
                                            <Link href="/p-signup" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <Box mt={5}>
                                        <Copyright />
                                    </Box>
                                </form>
                            )}
                    </Formik>
                </div>
            </Grid>
        </Grid>
    );
}

PartnerLogin.propTypes = {
    asyncPartnerLogin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, { asyncPartnerLogin }, null))(PartnerLogin);