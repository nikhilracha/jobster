import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  // Box,
  Card,
  CardContent,
  Grid,
  Divider,
  CardHeader,
  makeStyles,
  Typography
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    textAlign: 'left'
  },
  avatar: {
    height: 170,
    width: 170,
    alignSelf: 'center',
    marginLeft: '30px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 5px',
    transform: 'scale(1.5)'
  }
}));

const ProfileDetails = ({ className, ...rest }) => {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card
      className={classes.root}
      {...rest}
    >
      <CardHeader
        title="Skills"
      />
      <Divider />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {bull}
              JavaScript
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {bull}
              Java
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {bull}
              React.js
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {bull}
              Node.js
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {bull}
              MongoDb
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {bull}
              Python
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {bull}
              SQL
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
