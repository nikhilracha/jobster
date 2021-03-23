import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from 'components/Header-adv/Header';
import {
  Box,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { useHistory } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
import SearchIcon from '@material-ui/icons/Search';
import ClientBox from './ClientBox';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0e76a8",
    },
    background: {
      default: "#f4f5fd"
    },
  },
})


const useStyles = makeStyles({
  appMain: {
    width: '100%',
    marginTop: '20px',
    justifyContent: "center"
  },
  paper: {
    marginTop: '100px',
    textAlign: 'center',
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

function A_home() {
  const classes = useStyles();
  const history = useHistory();
  const nav1 = () => history.push('/clientinfo');
  const nav2 = () => history.push('/postad');

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header /> 
        <Typography className={classes.paper}
            color="textPrimary"
            variant="h3"
          >
              Welcome to Admin Portal.
          </Typography>
        <Grid 
        className={classes.appMain}
        container spacing={3}
        >
          <Grid item xs={3}>
            <Card spacing={3}>
              <CardContent>
                <AssignmentIndIcon className={classes.icon}/>
                <Button
                    color='primary'
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={nav1}
                >
                  Access Client Information
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
                <CardContent className={classes.card}>
                  <FeaturedVideoIcon className={classes.icon}/>
                  <Button
                    color='primary'
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={nav2}
                >
                  Post An Ad
                </Button>
                </CardContent>
              </Card>
          </Grid>
        </Grid>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default A_home;
