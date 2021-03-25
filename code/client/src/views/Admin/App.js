import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Formik } from 'formik';
import Header from 'components/Header-adv/Header';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2867B2",
    },
    background: {
      default: "#f4f5fd"
    },
  },

  props: {
    MuiIconButton: {
      disableRipple: true
    }
  },
  form: {

  }
})


const useStyles = makeStyles({
  appMain: {
    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(()=> {
    let token = JSON.parse(localStorage.getItem('a_jwtToken'))
    if(token){
      history.push('/a_home')
    }
    else{
      history.push('/admin')
    }
      },[])

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <Header />
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
          marginTop='100px'
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
              })}
              onSubmit={(data) => {

                console.log(data)
                axios.post("http://localhost:5000/api/a-login", data, { timeout: 10000 }).then((res) => {
                  console.log(res.data)
                  if (res.data.success) {
                    localStorage.setItem("a_jwtToken", JSON.stringify(res.data.token));
                    history.push('/a_home')
                  }
                })
                  .catch((err) => {
                    console.log(err)
                  })
              }}
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
                    <Box mb={3}>
                      <Typography
                        color="textPrimary"
                        variant="h3"
                      >
                        Sign in
                  </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Welcome to Advertisement Mangement sign in!
                  </Typography>
                    </Box>
                    <TextField
                      autoComplete="off"
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      autoComplete="off"
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Box my={2}>
                      <Button
                        color='primary'
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Sign in
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

export default App;
