import React from 'react';
import PropTypes from 'prop-types';

// import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';


const user = {
  avatar: '/static/images/avatars/avatar_7.png',
  name: 'Noah William',
  id: 'Smart id: 713740912123',
  email: 'N.willaim@outlook.com',
  pno: '(551)-248-7662',
  ad1: '369 Base Ave',
  ad2: 'Jersey City, NJ, 07307',
  age: '9/12/1972 (47 Y)'
};

const useStyles = makeStyles(() => ({
  root: {
  },
  avatar: {
    height: 150,
    width: 150,
    marginRight: 10
  },
  text: {
    marginLeft: 1,
    AlignLeft: true
  },
}));

const ProfileComponent = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      {...rest}
    >
      <CardHeader
        title="Profile"
      />
      <Divider />
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Divider orientation="vertical" flexItem variant="middle" />
          <Box
            // alignItems="left"
            display="flex"
            flexDirection="column"
          >
            {/* Name */}
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {user.name}
            </Typography>
            {/* Smart Id */}
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {user.id}
            </Typography>
            {/* Email */}
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {user.email}
            </Typography>
            {/* phone no */}
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {user.pno}
            </Typography>
            {/* adress line 1 */}
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {user.ad1}
            </Typography>
            {/* adress line 2 */}
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {user.ad2}
            </Typography>
            {/* Age */}
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {user.age}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

ProfileComponent.propTypes = {
  className: PropTypes.string
};

export default ProfileComponent;
