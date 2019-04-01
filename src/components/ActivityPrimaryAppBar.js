import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { AppBar, Divider } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
let styles = theme => ({
  root: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    background: "white",
    boxShadow: "none"
  }
});
class CustomSystemAppBar extends React.Component {
  render() {
    let { classes } = this.props;
    let { children, nospacing } = this.props;

    let style = {};
    if (nospacing) {
      //style.padding = 0;
    }
    return (
      <React.Fragment>
        <AppBar
          className={classes.root}
          position={"relative"}
          elevation={5}
          style={style}
        >
          <Toolbar style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            {children}
          </Toolbar>
        </AppBar>
        <Divider />
      </React.Fragment>
    );
  }
}

export default withStyles(styles())(CustomSystemAppBar);
