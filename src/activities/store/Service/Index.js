import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import ServicePage from "./Services";
import NewService from "./NewService";
// Pages
let styles = {};

class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={"/services"} exact component={ServicePage} />
          <Route path={"/services/new-service"} exact component={NewService} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
