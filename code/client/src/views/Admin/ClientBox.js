import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Button,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },

}));

const ClientBox = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="Product"
            src='/static/images/products/product_1.png'
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          Dropbox
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >            
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {' '}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Button
              color="primary"
              variant="contained"
            >
              Open
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ClientBox.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ClientBox;
