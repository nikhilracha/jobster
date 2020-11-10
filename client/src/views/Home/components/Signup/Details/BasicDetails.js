import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import useStyles from './DetailsStyles';

function BasicDetails(props) {
    const { formValues } = props;
    const classes = useStyles();
    const { email, phone } = formValues;
    return (
        <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
                Account Details
      </Typography>
            <Typography gutterBottom>Email: {`${email}`}</Typography>
            <Typography gutterBottom>Phone: {`${phone}`}</Typography>
        </Grid>
    );
}

export default BasicDetails;
