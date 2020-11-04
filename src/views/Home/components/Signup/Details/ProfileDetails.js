import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import useStyles from './DetailsStyles';

function ProfileDetails(props) {
    const { formValues } = props;
    const classes = useStyles();
    const { firstName, lastName, dob, street, city, state, zip, country } = formValues;
    return (
        <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
                Profile Details
      </Typography>
            <Typography gutterBottom>{`${firstName} ${lastName}`}</Typography>
            <Typography gutterBottom>{`${dob}`}</Typography>
            <Typography gutterBottom>{`${street}`}</Typography>
            <Typography gutterBottom>{`${city}`}</Typography>
            <Typography gutterBottom>{`${state}`}</Typography>
            <Typography gutterBottom>{`${zip}`}</Typography>
            <Typography gutterBottom>{`${country}`}</Typography>
        </Grid>
    );
}

export default ProfileDetails;
