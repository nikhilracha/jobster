import React from 'react';

import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none'
    }
}));

const ApplicantResume = (props, { className, ...rest }) => {
    const classes = useStyles();
    return (
        <Card
            className={classes.root}
            {...rest}
        >
            <CardHeader
                title="Resume"
                action={
                    <>
                    </>
                }
            />
            <Divider />
            <CardContent>
                {props.u_resume === undefined
                    ?
                    <>
                        <p>No resume uploaded!</p>
                    </>

                    :
                    <embed src={props.u_resume} width="100%" height="375"></embed>
                }

            </CardContent>
            <Divider />
        </Card>

    )

};

export default ApplicantResume;
