import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import DefaultLandingPage from "./DefaultLandingPage";
// Pages
let styles = {};

class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={"/"} component={DefaultLandingPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
