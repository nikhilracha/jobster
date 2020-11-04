import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField } from './Fields/InputField.js';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';


export default function BasicForm(props) {

    const [visible, setVisible] = React.useState({
        showPassword: false,
        showConfPassword: false
    });

    const handleClickShowPassword = () => {
        setVisible({ ...visible, showPassword: !visible.showPassword });
    };
    const handleClickShowConfPassword = () => {
        setVisible({ ...visible, showConfPassword: !visible.showConfPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Account Details
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <InputField name='email' type="email" label='Email' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name='phone' type="text" label='Phone number' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField
                        name='password'
                        type={visible.showPassword ? 'text' : 'password'}
                        label='Password'
                        fullWidth
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {visible.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>

                        }}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField
                        name='c_password'
                        type={visible.showConfPassword ? 'text' : 'password'}
                        label='Confirm Password'
                        fullWidth
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {visible.showConfPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>

                        }} />
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
