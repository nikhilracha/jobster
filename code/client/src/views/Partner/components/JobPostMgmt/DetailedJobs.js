import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
  Box,
  Grid,
  Card,
  Typography,
  CardContent,
  CardHeader,
  Divider,
  Avatar,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Header from '../Header';

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
    minHeight: '100%',
  },
  icon: {
    height: 100,
    width: 100,
    justifyContent: "center"
  },
  Container: {
    marginTop: '100px',
    Directions: 'column',
    marginLeft: '10%',
    marginRight: '10%',
    flexDirection: "column",
    textAlign:'left',
    justifyContent: 'center'
  },
  avatar: {
    height: 500,
    width: 500,
    justifyContent: 'center'
  },
  typo:{
      fontSize: "20px"
  }
  
})

function DetailedJobs() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header /> 
          <Box maxWidth="lg" className={classes.Container}>
            <Grid container spacing={3}>
            <Grid item xs> 
              <Card>
              <CardHeader
                title="Job Details"
              />                
              <Divider />
               <CardContent>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Job Id:
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Role:
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Type:
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Description:
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Date Posted:
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Deadline:
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    City:
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    State:
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Country:
                  </Typography>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                    variant='body1'
                  >
                    Zipcode:
                  </Typography>
               </CardContent>
              </Card>
            </Grid>
            </Grid> 
          </Box>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default DetailedJobs;
