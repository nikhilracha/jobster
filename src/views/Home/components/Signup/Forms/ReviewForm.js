import React from 'react';
import { useFormikContext } from 'formik';
import { Typography, Grid } from '@material-ui/core';

import BasicDetails from '../Details/BasicDetails';
import ProfileDetails from '../Details/ProfileDetails';


export default function ReviewForm() {
    const { values: formValues } = useFormikContext();
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Account Summary
      </Typography>
            <Grid container spacing={2}>
                <BasicDetails formValues={formValues} />
                <ProfileDetails formValues={formValues} />
            </Grid>
        </React.Fragment>
    );
}
