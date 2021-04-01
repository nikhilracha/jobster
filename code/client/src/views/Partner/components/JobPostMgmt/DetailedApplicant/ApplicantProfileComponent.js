import React from 'react';
import {
    Avatar,
    Box,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    TextField,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8)
    },
    avatar: {
        height: 120,
        width: 120,
        marginRight: 10
    }
}));

const ApplicantProfileComponent = (props, { className, ...rest }) => {
    const classes = useStyles();


    const user = props.user

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
                        src={user.u_profpic}
                    />
                    <Divider orientation="vertical" flexItem variant="middle" />
                    <Box
                        // alignItems="left"
                        display="flex"
                        flexDirection="column"
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6} lg={6} >
                                {/* Name */}
                                <TextField
                                    id="u_firstname"
                                    name="u_firstname"
                                    label=""
                                    value={user.u_firstname}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} >
                                {/* Name */}
                                <TextField
                                    id="u_lastname"
                                    name="u_lastname"
                                    label=""
                                    value={user.u_lastname}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12} >
                                {/* Name */}
                                <TextField
                                    id="u_email"
                                    name="u_email"
                                    label=""
                                    value={user.u_email}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12} >
                                {/* Name */}
                                <TextField
                                    id="u_phone"
                                    name="u_phone"
                                    label=""
                                    value={user.u_phone}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12} >
                                {/* Name */}
                                <TextField
                                    id="u_dob"
                                    name="u_dob"
                                    label=""
                                    value={user.u_dob === undefined ? "" : user.u_dob.split('T')[0]}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6} lg={6} >
                                {/* Name */}
                                <TextField
                                    id="u_street"
                                    name="u_street"
                                    label=""
                                    value={user.u_street}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} >
                                {/* Name */}
                                <TextField
                                    id="u_city"
                                    name="u_city"
                                    label=""
                                    value={user.u_city}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6} lg={6} >
                                {/* Name */}
                                <TextField
                                    id="u_state"
                                    name="u_state"
                                    label=""
                                    value={user.u_state}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} >
                                {/* Name */}
                                <TextField
                                    id="u_zip"
                                    name="u_zip"
                                    label=""
                                    value={user.u_zip}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </CardContent>
            <Divider />
        </Card>

    );
};


export default ApplicantProfileComponent;
