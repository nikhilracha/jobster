/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;

  const history = useHistory();


  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                onClick={() => history.push("/contact")}
                className={classes.block}
                target="_blank"
              >
                Contact Us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                onClick={() => history.push("/FAQ")}
                className={classes.block}
                target="_blank"
              >
                FAQ
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          Jobster &copy; {1900 + new Date().getYear()} , for better job exploration.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
