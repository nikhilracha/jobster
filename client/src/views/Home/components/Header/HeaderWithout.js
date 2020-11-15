import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),

    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(10)
    },
    buttons: {
        marginRight: theme.spacing(2),
    },
    appResponsive: {
        margin: "20px 10px"
    },
}));





function HeaderWithout(props) {
    const classes = useStyles();
    const history = useHistory();



    return (
        <div className={classes.root}>
            <AppBar style={{ background: '#2867B2' }}>
                <Toolbar>
                    <Typography onClick={() => history.push('/')} variant="h6" className={classes.title}>
                        Jobster
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default HeaderWithout;