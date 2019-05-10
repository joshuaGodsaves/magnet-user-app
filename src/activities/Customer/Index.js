import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";

// Pages
import ListActivity from "./List";
import CustomerActivity from "./Customer";
import Context from "../../AppContext";
let styles = {};

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={"/customers"} exact component={ListActivity} />
          <Route path={"/customers/:customer"} exact component={CustomerActivity} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
