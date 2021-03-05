import React from "react";
import { Formik, ErrorMessage } from 'formik';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

// components
import { LoginSchema } from "../../../../validation/Validations";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

// @material-ui/icons
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { asyncLogin } from "../../../../actions/authActions";

const useStyles = makeStyles(styles);

function Login(props) {
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

    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, actions) => {
                    console.log("props", values)

                    props.asyncLogin(values)
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
                                margin="normal"
                                variant="outlined"
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
                                margin="normal"
                                variant="outlined"
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
                            <Button type="submit" style={{ background: '#2867B2' }}
                                size="lg">Login</Button>
                        </form>
                    )}
            </Formik>
        </div >
    );
}

Login.propTypes = {
    asyncLogin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, { asyncLogin }, null))(Login);
