import React from "react";

// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

// @material-ui/icons
import { LockOpen, Business, Close } from "@material-ui/icons";

//Components
import Button from "../CustomButtons/Button";
import Login from "../../views/Home/components/Login/Login";
import Signup from "../../views/Home/components/Signup/Signup";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

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

export default function HeaderLinks(props) {
  const classes = useStyles();
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

  return (
    <>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button
            onClick={handleLoginOpen}
            color="transparent"
            className={classes.navLink}
          >
            <LockOpen className={classes.icons} /> Login
        </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            onClick={handleSignupOpen}
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <LockOpen className={classes.icons} /> SignUp
        </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            onClick={goToPartner}
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <Business className={classes.icons} /> Partner
        </Button>
        </ListItem>

      </List>
      <Dialog disableBackdropClick={true} open={openLogin} onClose={handleLoginClose} aria-labelledby="form-dialog-title">
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
    </>
  );
}
