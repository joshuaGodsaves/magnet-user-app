import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";

// Pages
import CategoriesActivity from "./Categories";
import CategoryActivity from "./Category";
import Context from "../../AppContext";
let styles = {};

class Index extends React.Component {
  constructor(props) {
    super(props);
    CategoriesActivity.contextType = Index.contextType;
    CategoryActivity.contextTyp = Index.contextType;
  }
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={"/categories"} exact component={CategoriesActivity} />
          <Route path={"/categories/category"} exact component={CategoryActivity} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
