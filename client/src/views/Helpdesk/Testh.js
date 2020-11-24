import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


// icons
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

export default function Testh(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    console.log("widh", props)

    return (
        <div className={classes.root}>
            <AppBar style={{ background: '#2867B2' }}>
                <Toolbar>
                    <Typography onClick={() => alert("home")} variant="h6" className={classes.title}>
                        Jobster
                    </Typography>
                    <Hidden smDown implementation="css">
                        <Button className={classes.buttons} color="inherit" startIcon={<LockOpenIcon />}>Login</Button>
                        <Button className={classes.buttons} color="inherit" startIcon={<PersonAddIcon />}>Sign Up</Button>
                        <Button className={classes.buttons} color="inherit" startIcon={<GroupIcon />}>Partner</Button>
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
                        //   classes={{
                        //     paper: classes.drawerPaper
                        //   }}
                        onClose={handleDrawerToggle}
                    >
                        <div className={classes.appResponsive}>
                            {/* {rightLinks} */}
                            <List>
                                <ListItem>
                                    <Button>
                                        <LockOpenIcon /> Login
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button>
                                        <PersonAddIcon /> SignUp
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button>
                                        <GroupIcon /> Partner
                                    </Button>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </Hidden>
            </AppBar>
        </div>
    );
}