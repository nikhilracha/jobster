import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField } from './Fields/InputField.js';
import SelectField from './Fields/SelectField';
import DatePickerField from './Fields/DatePickerField';

const picker = require('countrycitystatejson')

const AllCountries = picker.getCountries();
var CountryData = []

AllCountries.forEach(country => {
    CountryData.push({ value: country.name, label: country.name })
})


export default function ProfileForm(props) {

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Profile Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <InputField name='firstName' label='First Name' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name='lastName' label='Last Name' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePickerField
                        name="dob"
                        label="Date of Birth"
                        format="dd/MM/yy"
                        views={['year', 'month', 'date']}
                        minDate={new Date('1960/12/31')}
                        maxDate={new Date('2050/12/31')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name='city' label='City' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name='street' label='Street' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name='state' label='State' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name='zip' label='Zip Code' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectField
                        name="country"
                        label="Country"
                        data={CountryData}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
