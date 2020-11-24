import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

import Login from '../Login/Login';
import Signup from '../Signup/Signup';


// icons
import { Close } from "@material-ui/icons";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';


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

const styless = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styless)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <h4>{children}</h4>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <Close />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

function Header(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    const history = useHistory();

    const goToPartner = () => {
        history.push("/partner")
    }

    const handleLoginOpen = () => {
        setOpenLogin(true);
    };

    const handleLoginClose = () => {
        setOpenLogin(false);
    };

    const handleSignupOpen = () => {
        setOpenSignup(true);
    };

    const handleSignupClose = () => {
        setOpenSignup(false);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    return (
        <div className={classes.root}>
            <AppBar style={{ background: '#2867B2' }}>
                <Toolbar>
                    <Typography onClick={() => history.push('/')} variant="h6" className={classes.title}>
                        Jobster
                    </Typography>
                    <Hidden smDown implementation="css">
                        <Button className={classes.buttons} color="inherit" startIcon={<LockOpenIcon />} onClick={handleLoginOpen}>Login</Button>
                        <Button className={classes.buttons} color="inherit" startIcon={<PersonAddIcon />} onClick={handleSignupOpen}>Sign Up</Button>
                        <Button className={classes.buttons} color="inherit" startIcon={<GroupIcon />} onClick={goToPartner}>Partner</Button>
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
                <Hidden mdUp implementation="js">
                    <Drawer
                        variant="temporary"
                        anchor={"right"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    >
                        <div className={classes.appResponsive}>
                            <List>
                                <ListItem>
                                    <Button onClick={handleLoginOpen}>
                                        <LockOpenIcon /> Login
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button onClick={handleSignupOpen}>
                                        <PersonAddIcon /> SignUp
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button onClick={goToPartner}>
                                        <GroupIcon /> Partner
                                    </Button>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </Hidden>
            </AppBar>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                disableBackdropClick={true}
                open={openLogin}
                onClose={handleLoginClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title" onClose={handleLoginClose}>Login</DialogTitle>
                <DialogContent>
                    <Login />
                </DialogContent>
            </Dialog>
            <Dialog disableBackdropClick={true} open={openSignup} onClose={handleSignupClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" onClose={handleSignupClose}></DialogTitle>
                <DialogContent>
                    <Signup />
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default Header;