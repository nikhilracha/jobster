import React from 'react';
import PropTypes from 'prop-types';
import { compose } from "recompose";
import { connect } from "react-redux";
import {
    Avatar,
    Box,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    TextField,
    makeStyles
} from '@material-ui/core';
import { Formik, ErrorMessage } from 'formik';
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

import { asyncPartnerTokenUpdate } from '../../../../actions/authActions';

import { PartnerProfileInfoSchema } from '../../../../validation/Validations';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8)
    },
    avatar: {
        height: 120,
        width: 120,
        marginRight: 10
    }
}));

const ProfileComponent = (props, { className, ...rest }) => {
    const classes = useStyles();

    const [edit, setEdit] = React.useState(true);

    const onEdit = () => {
        setEdit(!edit)
    }


    console.log("Props from parent", props)

    const user = props.user

    return (
        <Formik
            enableReinitialize
            validationSchema={PartnerProfileInfoSchema}
            initialValues={{
                p_ID: user.p_ID,
                p_poc_firstname: user.p_poc_firstname,
                p_poc_lastname: user.p_poc_lastname,
                p_email: user.p_email,
                p_poc_phone: user.p_poc_phone,
                p_street: user.p_street,
                p_city: user.p_city,
                p_state: user.p_state,
                p_zip: user.p_zip
            }}
            onSubmit={(values, actions) => {
                console.log("props in submit", values)

                axios({
                    method: "post",
                    url: "http://localhost:5000/api/update-p-profile",
                    data: values,
                })
                    .then(function (response) {
                        //handle success
                        console.log(response);
                        if (response.data.success) {
                            props.asyncPartnerTokenUpdate({ email: values.p_email })
                                .then(res => {
                                    console.log("response", res);
                                    if (res.error) {
                                        console.log("error in updating token", res.error)
                                    }
                                    else {
                                        //history.push('/profile')
                                        console.log("Updated the token")
                                        setEdit(!edit)
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
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <Card
                            className={classes.root}
                            {...rest}
                        >
                            <CardHeader
                                title="Profile"
                                action={
                                    <>
                                        {edit ? <></> : <IconButton type="submit" aria-label="edit">
                                            <SaveIcon />
                                        </IconButton>}
                                        {edit ? <IconButton onClick={onEdit} aria-label="edit">
                                            <EditIcon />
                                        </IconButton> : <IconButton onClick={onEdit} aria-label="edit">
                                                <ClearIcon />
                                            </IconButton>}
                                    </>
                                }
                            />
                            <Divider />
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
                                    <Box
                                        // alignItems="left"
                                        display="flex"
                                        flexDirection="column"
                                    >
                                        <Grid container spacing={3}>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* Name */}
                                                <TextField
                                                    error={Boolean(touched.p_poc_firstname && errors.p_poc_firstname)}
                                                    helperText={touched.p_poc_firstname && errors.p_poc_firstname}
                                                    id="p_poc_firstname"
                                                    name="p_poc_firstname"
                                                    label="First Name"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.p_poc_firstname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={edit}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* Name */}
                                                <TextField
                                                    error={Boolean(touched.p_poc_lastname && errors.p_poc_lastname)}
                                                    helperText={touched.p_poc_lastname && errors.p_poc_lastname}
                                                    id="p_poc_lastname"
                                                    name="p_poc_lastname"
                                                    label="Last Name"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.p_poc_lastname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={edit}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12} lg={12} >
                                                {/* Name */}
                                                <TextField
                                                    id="p_email"
                                                    name="p_email"
                                                    label="Email"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.p_email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={true}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12} lg={12} >
                                                {/* Name */}
                                                <TextField
                                                    error={Boolean(touched.p_poc_phone && errors.p_poc_phone)}
                                                    helperText={touched.p_poc_phone && errors.p_poc_phone}
                                                    id="p_poc_phone"
                                                    name="p_poc_phone"
                                                    label="Phone no"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.p_poc_phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={edit}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* Name */}
                                                <TextField
                                                    error={Boolean(touched.p_street && errors.p_street)}
                                                    helperText={touched.p_street && errors.p_street}
                                                    id="p_street"
                                                    name="p_street"
                                                    label="Street"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.p_street}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={edit}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* Name */}
                                                <TextField
                                                    error={Boolean(touched.p_city && errors.p_city)}
                                                    helperText={touched.p_city && errors.p_city}
                                                    id="p_city"
                                                    name="p_city"
                                                    label="City"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.p_city}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={edit}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* Name */}
                                                <TextField
                                                    error={Boolean(touched.p_state && errors.p_state)}
                                                    helperText={touched.p_state && errors.p_state}
                                                    id="p_state"
                                                    name="p_state"
                                                    label="State"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.p_state}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={edit}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* Name */}
                                                <TextField
                                                    id="p_zip"
                                                    error={Boolean(touched.p_zip && errors.p_zip)}
                                                    helperText={touched.p_zip && errors.p_zip}
                                                    name="p_zip"
                                                    label="Zip"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.p_zip}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={edit}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </CardContent>
                            <Divider />
                        </Card>
                    </form>
                )}
        </Formik>
    );
};

ProfileComponent.propTypes = {
    className: PropTypes.string,
    asyncPartnerTokenUpdate: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, { asyncPartnerTokenUpdate }, null))(ProfileComponent);
