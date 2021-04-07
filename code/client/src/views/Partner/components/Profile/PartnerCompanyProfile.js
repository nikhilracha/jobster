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



import { PartnerCompanyInfoSchema } from '../../../../validation/Validations';

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

const PartnerCompanyProfile = (props, { className, ...rest }) => {
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
            validationSchema={PartnerCompanyInfoSchema}
            initialValues={{
                p_ID: user.p_ID,
                c_name: user.c_name,
                c_logo: user.c_logo,
                c_website: user.c_website,
                c_industry: user.c_industry,
                c_size: user.c_size,
                c_headquarters: user.c_headquarters,
                c_revenue: user.c_revenue,
                c_founded: user.c_founded,
                c_specialities: user.c_specialities
            }}
            onSubmit={(values, actions) => {
                console.log("props in submit", values)

                axios({
                    method: "post",
                    url: "http://localhost:5000/api/update-p-company-profile",
                    data: values,
                })
                    .then(function (response) {
                        //handle success
                        console.log(response);
                        if (response.data.success) {
                            console.log("Updated the token")
                            setEdit(!edit)

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
                                title="Company"
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
                                        src={user.c_logo}
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
                                                    error={Boolean(touched.c_name && errors.c_name)}
                                                    id="c_name"
                                                    name="c_name"
                                                    label="Company name"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.c_name}
                                                    helperText={touched.c_name && errors.c_name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={edit}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* Name */}
                                                <TextField
                                                    error={Boolean(touched.c_industry && errors.c_industry)}
                                                    id="c_industry"
                                                    name="c_industry"
                                                    label="Company Industry"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.c_industry}
                                                    helperText={touched.c_industry && errors.c_industry}
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
                                                    error={Boolean(touched.c_website && errors.c_website)}
                                                    id="c_website"
                                                    name="c_website"
                                                    label="Website"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.c_website}
                                                    helperText={touched.c_website && errors.c_website}
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
                                                    error={Boolean(touched.c_headquarters && errors.c_headquarters)}
                                                    id="c_headquarters"
                                                    name="c_headquarters"
                                                    label="Headquarters"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.c_headquarters}
                                                    helperText={touched.c_headquarters && errors.c_headquarters}
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
                                                    error={Boolean(touched.c_revenue && errors.c_revenue)}
                                                    id="c_revenue"
                                                    name="c_revenue"
                                                    label="Revenue"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.c_revenue}
                                                    helperText={touched.c_revenue && errors.c_revenue}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={edit}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* Name */}
                                                <TextField
                                                    error={Boolean(touched.c_founded && errors.c_founded)}
                                                    id="c_founded"
                                                    name="c_founded"
                                                    label="Founded"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.c_founded}
                                                    helperText={touched.c_founded && errors.c_founded}
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
                                                    error={Boolean(touched.c_size && errors.c_size)}
                                                    id="c_size"
                                                    name="c_size"
                                                    label="Size"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={values.c_size}
                                                    onChange={handleChange}
                                                    helperText={touched.c_size && errors.c_size}
                                                    onBlur={handleBlur}
                                                    disabled={edit}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6} >
                                                {/* Name */}
                                                <TextField
                                                    error={Boolean(touched.c_specialities && errors.c_specialities)}
                                                    id="c_specialities"
                                                    name="c_specialities"
                                                    label="Specialities"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    helperText={touched.c_specialities && errors.c_specialities}
                                                    value={values.c_specialities}
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

PartnerCompanyProfile.propTypes = {
    className: PropTypes.string,

};


function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, {}, null))(PartnerCompanyProfile);
