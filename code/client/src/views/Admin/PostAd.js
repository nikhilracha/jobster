import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from 'components/Header-adv/Header';
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
import { useHistory } from 'react-router-dom';

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
    marginTop: '100px',
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

function PostAd() {
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    let token = JSON.parse(localStorage.getItem('a_jwtToken'))
    if (token) {
      console.log('Authenticated User')
    }
    else {
      history.push('/admin')
    }
  }, [])
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
                company: '',
                redLink: '',
                ad: '',
                imageLocal: null
              }}
              validationSchema={Yup.object().shape({
                company: Yup.string().max(255).required('Company name is required'),
                redLink: Yup.string().max(10000).required('Redirection Link is required'),
                ad: Yup.string().max(10000).required('AD Link is required'),
              })}
              onSubmit={(values) => {
                axios.post('http://localhost:5000/api/advert', values).then(response => {
                  alert(response.data.message);
                  document.getElementById('postad_form').reset();
                })
                  .catch(error => {
                    alert(error.response.data.message)
                  })

                // navigate('/details', { replace: true });
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
                        color="textPrimary"
                        variant="h4"
                      >
                        Welcome to Ad Management
                  </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Enter the details to post an Ad.
                  </Typography>
                    </Box>
                    <Grid
                      container
                    // spacing={1}
                    >
                      <Grid
                        item
                        xs={12}
                      >
                        <TextField
                          error={Boolean(touched.company && errors.company)}
                          fullWidth
                          helperText={touched.company && errors.company}
                          label="Company *"
                          margin="normal"
                          name="company"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.company}
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
                          error={Boolean(touched.redLink && errors.redLink)}
                          fullWidth
                          helperText={touched.redLink && errors.redLink}
                          label="Redirection Link *"
                          margin="normal"
                          name="redLink"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.redLink}
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
                          error={Boolean(touched.ad && errors.ad)}
                          fullWidth
                          helperText={touched.ad && errors.ad}
                          label="Ad Image Link"
                          name="Ad Image Link"
                          margin="normal"
                          name="ad"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.ad}
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

export default PostAd;
