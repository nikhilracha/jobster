import React from 'react'
import { AppBar, Toolbar, Grid , makeStyles, Button } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
    },
    searchInput: {
        opacity: '0.6',
        fontSize: '1.0rem',
    }
}))

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    
                    <Button href="#text-buttons" color="primary">
                        Jobster
                    </Button>                   
                </Grid>
            </Toolbar>
        </AppBar>

   )

}