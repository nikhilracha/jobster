import { container } from "assets/jss/material-kit-react.js";

const footerStyle = {
  block: {
    color: "white",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    color: "white",
    padding: "15px 0",
    margin: "0",
    float: "center!important"
  },
  footer: {
    padding: "0.9375rem 0",
    background: '#2867B2',
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    position: "fixed",
    bottom: '0',
    width: '100%'
  },
  a: {
    color: 'white',
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: 'black'
    }
  },
  container,
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  icon: {
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px"
  }
};
export default footerStyle;
