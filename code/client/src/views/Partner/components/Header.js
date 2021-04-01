import React from 'react'
import { AppBar, Toolbar, makeStyles, IconButton, Typography, MenuItem, Menu } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useHistory } from 'react-router-dom';
import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentPartner, logoutPartner } from "../../../actions/authActions";
import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "../../../store";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header(props) {

    const classes = useStyles();
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
        store.dispatch(logoutPartner());
    }


    React.useEffect(() => {
        // let token = JSON.parse(localStorage.getItem('a_jwtToken'))
        // if (token) {
        //     setAuth(1)
        // }
        // else {

        // }
    }, [])

    React.useEffect(() => {
        // Check for token
        if (localStorage.pt_jwtToken) {
            // Set auth token header auth
            console.log("in effect", localStorage.pt_jwtToken);
            setAuthToken(localStorage.pt_jwtToken);
            // Decode token and get user info and exp
            const decoded = jwt_decode(localStorage.pt_jwtToken);
            console.log("in effect decoded", decoded);
            // Set user and isAuthenticated
            store.dispatch(setCurrentPartner(decoded));

            // Check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                //console.log("App.js is running inside if and if")
                // Logout user
                //store.dispatch(logoutUser());
                // TODO: Clear current Profile
                console.log("Session Expired")
                // Redirect to login
                // window.location.href = "/login";
            }
        }
        else {
            history.replace('/partner')
        }
    }, [localStorage.pt_jwtToken])

    return (
        <AppBar style={{ background: '#2867B2' }} position="static">
            <Toolbar>
                <IconButton onClick={() => history.replace('/partner')} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Typography variant="h6" className={classes.title}>
                        Jobster
                    </Typography>
                </IconButton>
                <Typography variant="h6" className={classes.title}>

                </Typography>
                {true && (
                    <div>
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
                            <MenuItem onClick={() => history.replace('/p-profile')}>Profile</MenuItem>
                            <MenuItem onClick={() => history.replace('/p-account')}>Account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}


Header.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, {}, null))(Header);