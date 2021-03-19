import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
// import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import Exp from './Exp';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();

  return (
    // <Page
    //   className={classes.root}
    //   title="Information"
    // >
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={5}
          md={6}
          xs={12}
        >
          <Profile />
        </Grid>
        <Grid
          item
          lg={7}
          md={6}
          xs={12}
        >
          <Exp />
        </Grid>
        <Grid
          item
          xs={5}
        // lg
        // lg={7}
        // md={6}
        // xs={12}
        >
          <ProfileDetails />
        </Grid>
        {/* <Grid
            item
            xs
            // lg
            // lg={7}
            // md={6}
            // xs={12}
          >
            <Exp />
          </Grid> */}
      </Grid>
    </Container>
    //</Page>
  );
};

export default Account;
