import React from 'react'
import { AppBar, Toolbar, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#2867B2',
        
    },
    logoColor: {
       color: '#fff'
    }
}))

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                
                    <Typography className={classes.logoColor} variant="h5">
                        Jobster-JobPostMgmt.
                    </Typography>
            </Toolbar>
        </AppBar>
    )
}
