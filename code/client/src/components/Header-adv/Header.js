import React from 'react'
import { AppBar, Toolbar, makeStyles, Typography, Button, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#2867B2',
    },
    logoColor: {
        color: '#fff'
    },
    logoutButton: {
        color: '#fff',
        marginRight: 10
    }
}))

export default function Header() {

    const history = useHistory();
    const classes = useStyles();
    const [auth, setAuth] = React.useState(0);
    const handleClick = () => {
        localStorage.removeItem('a_jwtToken')
        history.replace('/admin')
    }


    React.useEffect(() => {
        let token = JSON.parse(localStorage.getItem('a_jwtToken'))
        if (token) {
            setAuth(1)
        }
        else {

        }
    }, [])

    return (
        <AppBar position="static" className={classes.root}>
        <Toolbar>
        <Grid container
                alignItems="center">
                <Grid item>
                <Typography className={classes.logoColor} variant="h5" onClick={()=> history.push('/admin')}>
                Jobster-Adv Mgmt.
                </Typography>
                </Grid>
                <Grid item sm></Grid>

                    {
                        auth ?
                            <Grid item>
                                <Button className={classes.logoutButton} onClick={handleClick}>
                                    Log Out
                    </Button>
                            </Grid> : <></>
                    }

                </Grid>
            </Toolbar>
        </AppBar>
    )
}
