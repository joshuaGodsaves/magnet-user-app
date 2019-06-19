import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
// Pages
import ProductsActivity from "./Products";
import ProductActivity from "./Product";
import StoreContext from "../StoreContext";

let styles = {};

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  static contextType= StoreContext
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={`/stores/${this.context.store.id}/products`} exact  component={ProductsActivity}/>
          <Route path={`/stores/${this.context.store.id}/products/:product`} exact component={ProductActivity} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
