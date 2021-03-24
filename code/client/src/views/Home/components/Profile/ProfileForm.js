import React from 'react';
import PropTypes from 'prop-types';
import { compose } from "recompose";
import { connect } from "react-redux";
import {
    Avatar,
    Grid,
    Card,
    CardContent,
    Divider,
    CardHeader,
    makeStyles,
    Box,
    Button,
    IconButton,
    TextField,
    FormLabel,
    FormControl
} from '@material-ui/core';
import { Formik, ErrorMessage } from 'formik';
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { ProfileFormSchema } from '../../../../validation/Validations';
import { asyncTokenUpdate } from '../../../../actions/authActions';



const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8)
    },
    avatar: {
        height: 120,
        width: 120,
        marginRight: 10
    },
    input: {
        display: 'none'
    }
}));

const ProfileForm = (props, { ...rest }) => {

    const history = useHistory();
    console.log("PRops", props)
    const id = props.id;

    const classes = useStyles();


    return (
        <Card
            className={classes.root}
            {...rest}
        >
            <CardHeader
                title="Profile not Created!"
                subheader="Let's create Profile"
            // action={
            //     <>
            //         {edit ? <></> : <IconButton onClick={onSave} aria-label="edit">
            //             <SaveIcon />
            //         </IconButton>}
            //         {edit ? <IconButton onClick={onEdit} aria-label="edit">
            //             <EditIcon />
            //         </IconButton> : <IconButton onClick={onEdit} aria-label="edit">
            //                 <ClearIcon />
            //             </IconButton>}

            //     </>
            // }
            />
            <Divider />
            <CardContent>

                <Formik
                    enableReinitialize
                    validationSchema={ProfileFormSchema}
                    initialValues={{
                        u_ID: id,
                        u_profpic: null,
                        u_resume: null,
                        u_profpic_preview: null,
                        u_undergrad: "",
                        u_undergrad_gpa: "",
                        u_grad: "",
                        u_grad_gpa: "",
                        u_major: "",
                        u_concentration: ""
                    }}
                    onSubmit={(values, actions) => {
                        console.log("props", values)
                        const {
                            u_ID,
                            u_profpic,
                            u_resume,
                            u_undergrad,
                            u_undergrad_gpa,
                            u_grad,
                            u_grad_gpa,
                            u_major,
                            u_concentration
                        } = values;

                        var formData = new FormData();
                        formData.append("u_ID", u_ID);
                        formData.append("u_profpic", u_profpic);
                        formData.append("u_resume", u_resume);
                        formData.append("u_undergrad", u_undergrad);
                        formData.append("u_undergrad_gpa", u_undergrad_gpa);
                        formData.append("u_grad", u_grad);
                        formData.append("u_grad_gpa", u_grad_gpa);
                        formData.append("u_major", u_major);
                        formData.append("u_concentration", u_concentration);
                        for (var key of formData.entries()) {
                            console.log(key[0] + ', ' + key[1]);
                        }

                        axios({
                            method: "post",
                            url: "http://localhost:5000/api/create-profile",
                            data: formData,
                            headers: { "Content-Type": "multipart/form-data" },
                        })
                            .then(function (response) {
                                //handle success
                                console.log(response);
                                if (response.data.status) {
                                    props.asyncTokenUpdate(props.auth.user)
                                        .then(res => {
                                            console.log("response", res);
                                            if (res.error) {
                                                console.log("error in updating token", res.error)
                                            }
                                            else {
                                                history.go(0)
                                            }
                                        })

                                }
                            })
                            .catch(function (error) {
                                //handle error
                                console.log(error);
                            });

                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                            <Box
                                alignItems="center"
                                //display="flex"
                                flexDirection="row"
                            >
                                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                                    <Box
                                        alignItems="center"
                                        //display="flex"
                                        flexDirection="column"
                                    >
                                        <Grid container justify="center">
                                            <input
                                                name="u_profpic"
                                                accept="image/*"
                                                className={classes.input}
                                                id="u_profpic"
                                                type="file"
                                                onChange={(event) => {
                                                    console.log("event", event)
                                                    setFieldValue("u_profpic", event.currentTarget.files[0]);
                                                    setFieldValue("u_profpic_preview", URL.createObjectURL(event.currentTarget.files[0]));
                                                }}
                                            />
                                            <label htmlFor="u_profpic">
                                                <IconButton component='span'>
                                                    <Avatar
                                                        className={classes.avatar}
                                                        src={values.u_profpic_preview}
                                                    />
                                                </IconButton>
                                            </label>
                                            <Divider orientation="vertical" flexItem variant="middle" />
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Upload Resume</FormLabel>
                                                &nbsp;
                                                <input
                                                    type="file"
                                                    name="u_resume"
                                                    id="u_resume"
                                                    onChange={(event) => {
                                                        console.log("event", event)
                                                        setFieldValue("u_resume", event.target.files[0]);
                                                    }}
                                                />
                                            </FormControl>

                                        </Grid>

                                    </Box>
                                    <Box
                                        // alignItems="left"
                                        //display="flex"
                                        flexDirection="column"
                                    >
                                        <Grid container spacing={3}>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* undergrad */}
                                                <TextField
                                                    //variant="outlined"
                                                    id="u_undergrad"
                                                    label="Undergraduate"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.u_undergrad}
                                                    fullWidth={true}
                                                />
                                                <ErrorMessage name="u_undergrad" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* undergrad_gpa */}
                                                <TextField
                                                    //variant="outlined"
                                                    id="u_undergrad_gpa"
                                                    label="Undergraduate GPA"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.u_undergrad_gpa}
                                                    fullWidth={true}
                                                />
                                                <ErrorMessage name="u_undergrad_gpa" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* undergrad */}
                                                <TextField
                                                    //variant="outlined"
                                                    id="u_grad"
                                                    label="Graduate"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.u_grad}
                                                    fullWidth={true}
                                                />
                                                <ErrorMessage name="u_grad" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* undergrad_gpa */}
                                                <TextField
                                                    //variant="outlined"
                                                    id="u_grad_gpa"
                                                    label="Graduate GPA"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.u_grad_gpa}
                                                    fullWidth={true}
                                                />
                                                <ErrorMessage name="u_grad_gpa" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                            </Grid>
                                        </Grid>
                                        {/* u_major */}
                                        <TextField
                                            //variant="outlined"
                                            id="u_major"
                                            label="Major"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.u_major}
                                            fullWidth={true}
                                        />
                                        <ErrorMessage name="u_major" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                        {/*u_concentration*/}
                                        <TextField
                                            //variant="outlined"
                                            id="u_concentration"
                                            label="Concentration"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.u_concentration}
                                            fullWidth={true}
                                        />
                                        <ErrorMessage name="u_concentration" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Create
                                </Button>
                                    </Box>
                                </form>
                            </Box>
                        )}
                </Formik>

            </CardContent>
            <Divider />
        </Card >
    );
};

ProfileForm.propTypes = {
    className: PropTypes.string,
    asyncTokenUpdate: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, { asyncTokenUpdate }, null))(ProfileForm);
