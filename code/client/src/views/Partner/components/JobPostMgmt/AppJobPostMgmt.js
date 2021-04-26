import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from '../Header';
import {
  Box,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  TextField,
} from '@material-ui/core';
import { Formik, ErrorMessage } from 'formik';
import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import setAuthToken from '../../../../utils/setAuthToken';
import { setCurrentPartner } from '../../../../actions/authActions'
import axios from "axios";
import store from '../../../../store'
import jwt_decode from "jwt-decode";


// For job postings

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


// import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2867B2",
    },
    background: {
      default: "#f4f5fd"
    }
  },
})


const useStyles = makeStyles({
  appMain: {
    marginTop: '75px',
  },

  formControl: {
    marginTop: '15px',
    minWidth: 120,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  ckEdit: {
    minHeight: 100,
  },
})

function AppJobPostMgmt(props) {
  const classes = useStyles();
  const history = useHistory();

  //  for date picker
  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const [text, setText] = React.useState(""); // for job description.

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
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                jobRole: '',
                jobCity: '',
                jobState: '',
                jobZip: null,
                jobType: '',
                jobCountry: '',
                jobSalary: '',
                date: ''
              }}
              validationSchema={Yup.object().shape({
                jobRole: Yup.string().max(1000).required('Job Role is required'),
                jobState: Yup.string().max(100).required(' Job State is required'),
                jobCity: Yup.string().max(100).required(' Job City is required'),
                jobZip: Yup.number().required(' Job Zipcode is required').typeError("It should be a number"),
                jobType: Yup.string().max(1000).required(' Job Type is required'),
                jobSalary: Yup.string().max(10000).required(' Job Salary is required'),
                jobCountry: Yup.string().max(1000).required(' Job Country is required'),
                date: Yup.string().max(10000).required(' Date is required'),
              })}
              onSubmit={(values, actions) => {
                // navigate('/details', { replace: true });
                if (text.length <= 0) {
                  alert("Job Description cannot be empty")
                }
                else {
                  values.jobDes = text;
                  values.p_ID = props.auth.user.id;
                  var d = new Date(Date.now());
                  values.j_posted_date = d.toISOString().split('T')[0];
                  console.log("xyz", values)
                  axios.post('http://localhost:5000/api/post-job', values).then(response => {
                    if (response.data.status) {
                      console.log("response", response.data);
                      alert(response.data.message)
                      history.replace('/partner')
                    }
                  })
                    .catch(error => {
                      console.log(error);
                    })
                }

              }}

            // 

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
                    <Box className={classes.appMain}>
                      <Typography
                        color="textPrimary"
                        variant="h4"
                      >
                        Welcome to Job Postings
                  </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Enter the details to post a Job.
                  </Typography>
                    </Box>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.jobRole && errors.jobRole)}
                          fullWidth
                          helperText={touched.jobRole && errors.jobRole}
                          label="Job Role *"
                          margin="normal"
                          name="jobRole"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.jobRole}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          fullWidth
                          error={Boolean(touched.jobType && errors.jobType)}
                          helperText={touched.jobType && errors.jobType}
                        >
                          <InputLabel>Job Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={values.jobType}
                            name="jobType"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="jobType"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Full time"}>Full Time</MenuItem>
                            <MenuItem value={"Part time"}>Full Time</MenuItem>
                            <MenuItem value={"Internship"}>Internship</MenuItem>
                          </Select>
                          <FormHelperText>{errors.jobType}</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.jobState && errors.jobState)}
                          fullWidth
                          helperText={touched.jobState && errors.jobState}
                          label="Job State *"
                          margin="normal"
                          name="jobState"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.jobState}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.jobCity && errors.jobCity)}
                          fullWidth
                          helperText={touched.jobCity && errors.jobCity}
                          label="Job City *"
                          margin="normal"
                          name="jobCity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.jobCity}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.jobSalary && errors.jobSalary)}
                          fullWidth
                          helperText={touched.jobSalary && errors.jobSalary}
                          label="Job Salary *"
                          margin="normal"
                          name="jobSalary"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.jobSalary}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.jobCountry && errors.jobCountry)}
                          fullWidth
                          helperText={touched.jobCountry && errors.jobCountry}
                          label="Job Country *"
                          margin="normal"
                          name="jobCountry"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.jobCountry}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.jobZip && errors.jobZip)}
                          fullWidth
                          helperText={touched.jobZip && errors.jobZip}
                          label="Job Zipcode *"
                          margin="normal"
                          name="jobZip"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.jobZip}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.date && errors.date)}
                          fullWidth
                          helperText={touched.date && errors.date}
                          label="Deadline Date"
                          type="date"
                          name="date"
                          variant="outlined"
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.date}
                        />
                      </Grid>
                    </Grid>

                    <Box>

                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="subtitle1"
                      >
                        Enter the Job Description.
                  </Typography>
                      <ErrorMessage name="jobDes" />
                    </Box>

                    {/* for job description. */}

                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                      >
                        <CKEditor
                          className={classes.ckEdit}
                          editor={ClassicEditor}
                          data={text}
                          onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setText(data)
                            console.log({ event, editor, data });
                          }}
                          onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                          }}
                          onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                          }}
                        />
                        {/* <p>{parse(text)}</p> */}
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
                        Submit
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

AppJobPostMgmt.propTypes = {
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default compose(connect(mapStateToProps, {}, null))(AppJobPostMgmt);


