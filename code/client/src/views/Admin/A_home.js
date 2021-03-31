import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from 'components/Header-adv/Header';
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
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


  React.useEffect(() => {
    let token = JSON.parse(localStorage.getItem('a_jwtToken'))
    if (token) {
      console.log('Authenticated User')
    }
    else {
      history.push('/admin')
    }
  }, [])

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
                <AssignmentIndIcon className={classes.icon} />
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
                <PostAddIcon className={classes.icon} />
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
