import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import StoreContext from "../StoreContext";

// Pages
import CategoriesActivity from "./Categories";
import CategoryActivity from "./Category";

class Index extends React.Component {

  static contextType= StoreContext
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={`/stores/${this.context.store.id}/categories`} exact component={CategoriesActivity} />
          <Route path={`/stores/${this.context.store.id}/categories/:category`} exact component={CategoryActivity} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Index;
