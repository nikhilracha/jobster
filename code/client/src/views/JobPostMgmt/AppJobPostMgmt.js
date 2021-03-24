import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from 'components/Header-jobPostMgmt/Header';
import {
  Box,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from '@material-ui/core';
import { Formik } from 'formik';

// For Date Picker.
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


// For job postings

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'

import { useHistory } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0e76a8",
    },
    background: {
      default: "#f4f5fd"
    },
    // formControl: {
    //   margin: theme.spacing(1),
    // },
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

function AppJobPostMgmt() {
  const classes = useStyles();

  //  for dropdown menu.
  const [age, setAge] = React.useState('');

  //  for date picker
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const [text, setText] = React.useState(""); // for job description.

  // const history = useHistory();
  // const navigateTo = () => history.push('/A_home');

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
              jobZip: '',
              age: ''
            }}
            validationSchema={Yup.object().shape({
              jobRole: Yup.string().max(1000).required('Job Role is required'),
              jobState: Yup.string().max(100).required(' Job State is required'),
              jobCity: Yup.string().max(100).required(' Job City is required'),
              jobZip: Yup.string().max(10000).required(' Job Zipcode is required'),
              jobType: Yup.string().max(1000).required(' Job Type is required'),
            })}
            onSubmit={() => {
              // navigate('/details', { replace: true });
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
                <Box  className={classes.appMain}>
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
                    <FormControl variant="outlined" className={classes.formControl} fullWidth >
                      <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={age}
                        onChange={handleChange}
                        label="Age"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
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
                          onChange= {handleChange}
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justify="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              variant="inline"
                              inputVariant="outlined"
                              id="date-picker-dialog"
                              label="Date picker dialog"
                              format="MM/dd/yyyy"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
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

export default AppJobPostMgmt;
