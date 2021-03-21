import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";

import { useHistory } from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// @material-ui/icons
import { AccountCircle } from "@material-ui/icons";

//Components
import store from '../../../../store';
import { logoutUser } from '../../../../actions/authActions';



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




function Header(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        store.dispatch(logoutUser());
    }

    const handleProfile = () => {
        history.push('/profile')
    }

    const handleHome = () => {
        history.push('/')
    }




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
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                        >
                            <Grid container item xs={10} spacing={1}>
                                <h4>Hello {props.user.lname}</h4>
                            </Grid>
                            <Grid container item xs={2} spacing={1}>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleHome}>Home</MenuItem>
                                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
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
                            <List className={classes.list}>
                                <ListItem className={classes.listItem}>
                                    <h4>Hello {props.user.lname}</h4>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </Hidden>
            </AppBar>

        </div>
    );
}
export default Header;