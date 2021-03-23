import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from 'components/Header-adv/Header';
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
import { useParams } from 'react-router-dom';
import axios from "axios";
import UserPortal from 'views/Home/UserPortal';


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
    height: 130,
    width: 130,
    justifyContent: 'center'
  },
  
})

function ClientDetails() {
  const classes = useStyles();

  const { clientid } = useParams();
  
  let [responseData, setResponseData] = React.useState('');

  React.useEffect(() => {
    axios({
      "method": "GET",
      "url": "http://localhost:5000/api/clients/"+clientid,
    })
    .then((response) => {
      setResponseData(response.data)
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header /> 
          <Box maxWidth="lg" className={classes.Container}>
            <Grid container spacing={3}>
            <Grid item xs> 
              <Card>
              <CardHeader
                title="Client Details"
              />                
              <Divider />
               <CardContent>
               <Box
                    display="flex"
                    justifyContent="center"
                  >
                    <Avatar
                      alt="Product"
                      src= {responseData.logo}
                      variant="square"
                      className = {classes.avatar}
                    />
                  </Box>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant='subtitle1'
                  >
                    Name: {responseData.c_name}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant='subtitle1'
                  >
                    Industry: {responseData.industry}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant='subtitle1'
                  >
                    Info: {responseData.info}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant='subtitle1'
                  >
                    Headquater: {responseData.headquater}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant='subtitle1'
                  >
                    Type: {responseData.ind_type}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant='subtitle1'
                  >
                    Revenue Generated:{responseData.revenue}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant='subtitle1'
                  >
                    Total Employess: {responseData.c_size}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant='subtitle1'
                  >
                    Website: <a target="_blank" href={responseData.website}>{responseData.website}</a>
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant='subtitle1'
                  >
                    Founded: {responseData.founded}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant='subtitle1'
                  >
                    Specialties: {responseData.specialties}
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

export default ClientDetails;
