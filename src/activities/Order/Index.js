import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import OrderPage from "./Orders";
let styles = {};

class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={"/orders"} exact component={OrderPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
