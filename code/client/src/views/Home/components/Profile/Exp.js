import React from 'react';
import PropTypes from 'prop-types';

// import moment from 'moment';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';


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
  bullet: {
    display: 'inline-block',
    margin: '0 5px',
    transform: 'scale(1.5)'
  }
}));

const Exp = ({ className, ...rest }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card
      className={classes.root}
      {...rest}
    >
      <CardHeader
        title="Professional Work Experience"
      />
      <Divider />
      <CardContent>
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
            {bull}
            Tech Lead
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
          >
            Measurement Controls, Inc.
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
          >
            Jan 2020 - Present - 1 yr 2 mos
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
          >
            Charlotte, North Carolina, United States
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
          >
            Achievements:
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
          >
            - Successful delivery of 15+ mobile applications across different mobility technologies.
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
          >
            - Delivery across clients and across multiple technologies
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

Exp.propTypes = {
  className: PropTypes.string
};

export default Exp;
