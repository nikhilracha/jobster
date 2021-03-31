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
import { Formik,ErrorMessage } from 'formik';

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
      main: "#2867B2",
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


  //  for date picker
  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = (date) => {
  //   this.setState({
  //     new_date: null
  // });
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
              jobType: '',
              date: ''
            }}
            validationSchema={Yup.object().shape({
              jobRole: Yup.string().max(1000).required('Job Role is required'),
              jobState: Yup.string().max(100).required(' Job State is required'),
              jobCity: Yup.string().max(100).required(' Job City is required'),
              jobZip: Yup.string().max(10000).required(' Job Zipcode is required'),
              jobType: Yup.string().max(1000).required(' Job Type is required'),
              date: Yup.string().max(10000).required(' Date is required'),
            })}
            onSubmit={(values,actions) => {
              // navigate('/details', { replace: true });
              if(text.length<=0){
                alert("cannot be empty")
              }
              else{
                values.jobDes = text;
                console.log("xyz",values)
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

export default AppJobPostMgmt;
