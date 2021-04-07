import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from '../Header';
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    TextField,
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import PropTypes from 'prop-types';
import { compose } from "recompose";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { asyncPartnerTokenUpdate } from "../../../../actions/authActions";

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
        marginTop: '50px',
        justifyContent: "center"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    icon: {
        height: 100,
        width: 100,
        justifyContent: "center"
    },
    card: {
        justifyContent: "center"
    }
})

function ProfileForm(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Box
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    justifyContent="center"
                >
                    <Container maxWidth="sm">
                        <Formik
                            initialValues={{
                                imgLink: '',
                                name: '',
                                industry: '',
                                info: '',
                                headquater: '',
                                type: '',
                                revenue: '',
                                totalEmp: '',
                                websiteLink: '',
                                foundedYear: '',
                                specialties: '',
                            }}
                            validationSchema={Yup.object().shape({
                                imgLink: Yup.string()
                                    .matches(
                                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                                        'Enter correct url!'
                                    )
                                    .required('Logo Link is required'),
                                name: Yup.string().max(255).required('Company Name is required'),
                                industry: Yup.string().max(255).required('Company Industry is required'),
                                info: Yup.string().max(255).required('Company Info is required'),
                                headquater: Yup.string().max(255).required('Headquater Location is required'),
                                type: Yup.string().max(255).required('Company Type is required'),
                                revenue: Yup.string().max(255).required('Company Revenue is required'),
                                totalEmp: Yup.string().max(255).required('Company Total Number of Employees is required'),
                                websiteLink: Yup.string()
                                    .matches(
                                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                                        'Enter correct url!'
                                    )
                                    .required('Website url is required'),
                                foundedYear: Yup.string().max(255).required('Company Foundation Year is required'),
                                specialties: Yup.string().max(255).required('Company Specialties is required'),
                            })}

                            onSubmit={(values, actions) => {
                                values.p_ID = props.id
                                console.log("props", values)
                                axios.post('http://localhost:5000/api/create-p-profile', values).then(response => {
                                    if (response.data.status) {
                                        props.asyncPartnerTokenUpdate(props.auth.user)
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
                                    .catch(error => {
                                        console.log(error);
                                    })

                            }}

                        >
                            {({
                                errors,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                handleReset,
                                isSubmitting,
                                touched,
                                values
                            }) => (
                                    <form id="postad_form" onSubmit={handleSubmit} onReset={handleReset} autoComplete="off">
                                        <Box className={classes.appMain}>
                                            <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="h5"
                                            >
                                                You haven't finished your profile!
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="body2"
                                            >
                                                Setup the Partner company Information.
                                            </Typography>
                                        </Box>

                                        <Grid
                                            container
                                            spacing={2}
                                        >
                                            <Grid
                                                item
                                                xs={6}
                                            >
                                                <TextField
                                                    error={Boolean(touched.name && errors.name)}
                                                    fullWidth
                                                    helperText={touched.name && errors.name}
                                                    label="Company Name *"
                                                    margin="normal"
                                                    name="name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={6}
                                            >
                                                <TextField
                                                    error={Boolean(touched.industry && errors.industry)}
                                                    fullWidth
                                                    helperText={touched.industry && errors.industry}
                                                    label="Company Industry *"
                                                    margin="normal"
                                                    name="industry"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.industry}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                        // spacing={1}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    error={Boolean(touched.imgLink && errors.imgLink)}
                                                    fullWidth
                                                    helperText={touched.imgLink && errors.imgLink}
                                                    label="Company Logo Link *"
                                                    margin="normal"
                                                    name="imgLink"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.imgLink}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                        // spacing={1}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    error={Boolean(touched.info && errors.info)}
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    helperText={touched.info && errors.info}
                                                    label="Company Info*"
                                                    margin="normal"
                                                    name="info"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.info}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                            spacing={2}
                                        >
                                            <Grid
                                                item
                                                xs={6}
                                            >
                                                <TextField
                                                    error={Boolean(touched.headquater && errors.headquater)}
                                                    fullWidth
                                                    helperText={touched.headquater && errors.headquater}
                                                    label="Headquater Location *"
                                                    margin="normal"
                                                    name="headquater"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.headquater}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={6}
                                            >
                                                <TextField
                                                    error={Boolean(touched.type && errors.type)}
                                                    fullWidth
                                                    helperText={touched.type && errors.type}
                                                    label="Company Type *"
                                                    margin="normal"
                                                    name="type"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.type}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                            spacing={2}
                                        >
                                            <Grid
                                                item
                                                xs={6}
                                            >
                                                <TextField
                                                    error={Boolean(touched.revenue && errors.revenue)}
                                                    fullWidth
                                                    helperText={touched.revenue && errors.revenue}
                                                    label="Company Revenue in $ *"
                                                    margin="normal"
                                                    name="revenue"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.revenue}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={6}
                                            >
                                                <TextField
                                                    error={Boolean(touched.totalEmp && errors.totalEmp)}
                                                    fullWidth
                                                    helperText={touched.totalEmp && errors.totalEmp}
                                                    label="Total Employess *"
                                                    margin="normal"
                                                    name="totalEmp"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.totalEmp}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                        // spacing={1}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    error={Boolean(touched.websiteLink && errors.websiteLink)}
                                                    fullWidth
                                                    helperText={touched.websiteLink && errors.websiteLink}
                                                    label="Company Website Link *"
                                                    margin="normal"
                                                    name="websiteLink"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.websiteLink}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                        // spacing={1}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    error={Boolean(touched.foundedYear && errors.foundedYear)}
                                                    fullWidth
                                                    helperText={touched.foundedYear && errors.foundedYear}
                                                    label="Company Foundation Year*"
                                                    margin="normal"
                                                    name="foundedYear"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.foundedYear}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                        // spacing={1}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    error={Boolean(touched.specialties && errors.specialties)}
                                                    fullWidth
                                                    helperText={touched.specialties && errors.specialties}
                                                    label="Company Specialties *"
                                                    margin="normal"
                                                    name="specialties"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.specialties}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>


                                        <Box my={2}>
                                            <Button
                                                color="primary"
                                                // disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                            >
                                                Upload
                                            </Button>
                                        </Box>
                                    </form>
                                )}
                        </Formik>
                    </Container>
                </Box>
            </div>
            <CssBaseline />
        </ThemeProvider>
    );
}

ProfileForm.propTypes = {
    className: PropTypes.string,
    asyncPartnerTokenUpdate: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, { asyncPartnerTokenUpdate }, null))(ProfileForm);

