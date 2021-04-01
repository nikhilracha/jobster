import React from 'react';

import {
    Grid,
    Card,
    CardContent,
    Divider,
    CardHeader,
    makeStyles,
    Box,

    TextField,
} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8)
    }
}));

const ApplicantProfileDetails = (props, { className, ...rest }) => {

    const classes = useStyles();

    console.log("in app profile", props)


    return (
        <Card
            className={classes.root}
            {...rest}
        >
            <CardHeader
                title="Education"
            />
            <Divider />
            <CardContent>
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                >
                    <Box
                        // alignItems="left"
                        display="flex"
                        flexDirection="column"
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6} lg={6} >
                                {/* Name */}
                                <TextField
                                    id="u_ug"
                                    name="u_ug"
                                    label="Undergraduate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={props.user.u_undergrad}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} >
                                {/* Name */}
                                <TextField
                                    id="u_ug_gpa"
                                    name="u_ug_gpa"
                                    label="Undergraduate GPA"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={props.user.u_undergrad_gpa}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6} lg={6} >
                                {/* Name */}
                                <TextField
                                    id="u_grad"
                                    name="u_grad"
                                    label="Graduate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={props.user.u_grad}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} >
                                {/* Name */}
                                <TextField
                                    id="u_grad_gpa"
                                    name="u_grad_gpa"
                                    label="Graduate GPA"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={props.user.u_grad_gpa}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12} >
                                <TextField
                                    id="u_major"
                                    name="u_major"
                                    label="Major"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={props.user.u_major}
                                    disabled={true}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12} >
                                <TextField
                                    id="u_conc"
                                    name="u_conc"
                                    label="Concentration"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={props.user.u_concentration}
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

export default ApplicantProfileDetails;
