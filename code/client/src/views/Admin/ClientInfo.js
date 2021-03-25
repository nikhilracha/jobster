import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from 'components/Header-adv/Header';
import {
  Box,
  Grid,
  Card,
  Typography,
  CardContent,
  Divider,
  Avatar,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
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
    // backgroundColor: '#000000',
    marginTop: '100px',
    Directions: 'row',
    marginLeft: '10%',
    marginRight: '10%',
    flexDirection: "row",
    textAlign: 'center'
  }
})

function ClientInfo() {
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

  const nav1 = (clientId) => history.push('clientdetails/' + clientId);

  let [responseData, setResponseData] = React.useState('');

  React.useEffect(() => {
    axios({
      "method": "GET",
      "url": "http://localhost:5000/api/clients",
    })
      .then((response) => {
        setResponseData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header /> 
        
           <Box maxWidth="sm" className={classes.Container}>
           <Button onClick={()=> history.push('/addClient')}
            color='primary'
            fullWidth
            size="small"
            type="submit"
            variant="contained"
          >
           + Add a Client
           </Button>
           </Box>
          <Box maxWidth="lg" className={classes.Container}>
            <Grid container spacing={3}> 
              {
                Object.keys(responseData).map(index => (
                  <Grid item lg={4}>
                    <Card>
                      <CardContent>
                      <Box
                        display="flex"
                        justifyContent="center"
                        mb={3}
                      >
                        <Avatar
                          alt="Product"
                          src={responseData[index].logo}
                          variant="square"
                        />
                      </Box>
                      <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                      >
                        {responseData[index].c_name}
                      </Typography>
                      <Typography
                        align="center"
                        color="textPrimary"
                        variant="body1"
                      >
                        {responseData[index].info}
                      </Typography>
                    </CardContent>
                    <Box flexGrow={1} />
                    <Divider />
                    <Box p={2}>
                      <Grid
                        Container
                        justify='flex-end'
                      >
                        <Button
                          color='primary'
                          fullWidth
                          size="small"
                          type="submit"
                          variant="contained"
                          onClick={() => { nav1(responseData[index].c_id) }}
                        >
                          Open
                          </Button>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default ClientInfo;
