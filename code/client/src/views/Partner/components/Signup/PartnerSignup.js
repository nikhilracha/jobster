import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, ErrorMessage } from 'formik';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { PartnerSignupSchema } from '../../../../validation/Validations';
import Header from '../../../../components/Header/Header';

import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { asyncPartnerRegister } from "../../../../actions/authActions";

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function PartnerSignup(props) {
    const classes = useStyles();
    const [visible, setVisible] = React.useState({
        showPassword: false,
        showConfPassword: false
    });

    const handleClickShowPassword = () => {
        setVisible({ ...visible, showPassword: !visible.showPassword });
    };
    const handleClickShowConfPassword = () => {
        setVisible({ ...visible, showConfPassword: !visible.showConfPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [open, setOpen] = React.useState(false);
    const [end, setEnd] = React.useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Header
                brand="JOBSTER"
                fixed
                color="transparent"

            />
            <CssBaseline />
            <div className={classes.paper}>
                {
                    end ?
                        <>
                            <h4>Account created successfully.</h4>
                            <Grid container justify="center">
                                <Grid item>
                                    <Link href="/partner" variant="body2">
                                        Go to Login Page
                                        </Link>
                                </Grid>
                            </Grid>
                        </>
                        :
                        <>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    password: '',
                                    c_password: '',
                                    country: '',
                                    state: '',
                                    city: '',
                                    zip: '',
                                    street: '',
                                    company: '',
                                    phone: ''
                                }}
                                validationSchema={PartnerSignupSchema}
                                onSubmit={(values, actions) => {
                                    console.log("props", values)

                                    props.asyncPartnerRegister(values)
                                        .then(res => {
                                            if (res.error) {
                                                console.log("error in Signup", res.error)
                                                actions.setSubmitting(false);
                                                actions.setErrors(res.error);
                                            }
                                            else {
                                                console.log("response", res);
                                                setOpen(true);
                                                setEnd(true)
                                                actions.setSubmitting(false);
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

                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        autoComplete="fname"
                                                        name="firstName"
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="firstName"
                                                        label="First Name"
                                                        autoFocus
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.firstName}
                                                    />
                                                    <ErrorMessage name="firstName" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="lastName"
                                                        label="Last Name"
                                                        name="lastName"
                                                        autoComplete="lname"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.lastName}
                                                    />
                                                    <ErrorMessage name="lastName" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                    />
                                                    <ErrorMessage name="email" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="password"
                                                        label="Password"
                                                        type={visible.showPassword ? 'text' : 'password'}
                                                        id="password"
                                                        autoComplete="current-password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.password}
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
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="c_password"
                                                        label="Confirm Password"
                                                        type={visible.showConfPassword ? 'text' : 'password'}
                                                        id="c_password"
                                                        //autoComplete="current-password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.c_password}
                                                        InputProps={{
                                                            endAdornment:
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickShowConfPassword}
                                                                        onMouseDown={handleMouseDownPassword}
                                                                    >
                                                                        {visible.showConfPassword ? <Visibility /> : <VisibilityOff />}
                                                                    </IconButton>
                                                                </InputAdornment>

                                                        }}

                                                    />
                                                    <ErrorMessage name="c_password" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="country"
                                                        label="Country"
                                                        type="text"
                                                        id="country"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.country}
                                                    />
                                                    <ErrorMessage name="country" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="state"
                                                        label="State"
                                                        type="text"
                                                        id="state"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.state}
                                                    />
                                                    <ErrorMessage name="state" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="city"
                                                        label="City"
                                                        type="text"
                                                        id="city"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.city}
                                                    />
                                                    <ErrorMessage name="city" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="zip"
                                                        label="Zip"
                                                        type="text"
                                                        id="zip"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.zip}
                                                    />
                                                    <ErrorMessage name="zip" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="street"
                                                        label="Street"
                                                        type="text"
                                                        id="street"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.street}
                                                    />
                                                    <ErrorMessage name="street" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="company"
                                                        label="Company name"
                                                        type="text"
                                                        id="company"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.company}
                                                    />
                                                    <ErrorMessage name="company" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="phone"
                                                        label="Phone number"
                                                        type="text"
                                                        id="phone"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.phone}
                                                    />
                                                    <ErrorMessage name="phone" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                                </Grid>
                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                            >
                                                Sign Up
                                </Button>
                                            <Grid container justify="center">
                                                <Grid item>
                                                    <Link href="/partner" variant="body2">
                                                        Already have an account? Sign in
                                        </Link>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    )}
                            </Formik>
                        </>
                }
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Registered Successfully!
        </Alert>
            </Snackbar>
        </Container>
    );
}

PartnerSignup.propTypes = {
    asyncPartnerRegister: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, { asyncPartnerRegister }, null))(PartnerSignup);