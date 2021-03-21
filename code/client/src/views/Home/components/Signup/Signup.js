import React, { useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    CircularProgress
} from '@material-ui/core';
import { Formik, Form } from 'formik';

//Forms
import BasicForm from './Forms/BasicForm';
import ProfileForm from './Forms/ProfileForm';
import ReviewForm from './Forms/ReviewForm';

//Validation Schema
import { UserSignupSchema } from "../../../../validation/Validations";

import useStyles from './Forms/SignupFormStyles';

import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { asyncRegister } from "../../../../actions/authActions";

const steps = ['Account Details', 'Profile Details', 'Confirm Details'];

function _renderStepContent(step) {
    switch (step) {
        case 0:
            return <BasicForm />;
        case 1:
            return <ProfileForm />;
        case 2:
            return <ReviewForm />;
        default:
            return <div>Not Found</div>;
    }
}

function CheckoutPage(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = UserSignupSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        await _sleep(1000);
        //alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
        //setActiveStep(activeStep + 1);

        props.asyncRegister(values)
            .then(res => {
                actions.setErrors(res);
                actions.setSubmitting(false);
                console.log("response", res);
                if (!res.hasOwnProperty('status')) {
                    setActiveStep(0);
                }
                else {
                    setActiveStep(activeStep + 1);
                }
                // if (res.error) {
                //     //setActiveStep(0);
                //     console.log("error in signup", res.error)
                // }
            })
    }

    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    return (
        <React.Fragment>
            <Typography component="h1" variant="h4" align="center">
                Create Account
      </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {activeStep === steps.length ? (
                    // <CheckoutSuccess />
                    <h4>Account Created</h4>
                ) : (
                        <Formik
                            initialValues={{
                                email: '',
                                phone: '',
                                password: '',
                                c_password: '',
                                firstName: '',
                                lastName: '',
                                city: '',
                                dob: '',
                                street: '',
                                state: '',
                                zip: '',
                                country: '',
                                profstatus: '0'
                            }}
                            validationSchema={currentValidationSchema}
                            onSubmit={_handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form id="Signup Form">
                                    {_renderStepContent(activeStep)}

                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={_handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <div className={classes.wrapper}>
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                            >
                                                {isLastStep ? 'Create Account' : 'Next'}
                                            </Button>
                                            {isSubmitting && (
                                                <CircularProgress
                                                    size={24}
                                                    className={classes.buttonProgress}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
            </React.Fragment>
        </React.Fragment>
    );
}

CheckoutPage.propTypes = {
    asyncRegister: PropTypes.func.isRequired,
};



export default compose(connect(null, { asyncRegister }, null))(CheckoutPage);
