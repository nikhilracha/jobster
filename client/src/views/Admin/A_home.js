import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from 'components/Header-adv/Header';
import {
  Box,
  Container,
  Typography
} from '@material-ui/core';
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
  },
  
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  },
  form:{
    
  }
})


const useStyles = makeStyles({
  appMain: {
    width: '100%'
  }
})

function A_home() {
  const classes = useStyles();

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
          <Typography variant ="h3" >Welcome to Advertisement Mangement Homepage!</Typography>
        </Container>
      </Box>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default A_home;
