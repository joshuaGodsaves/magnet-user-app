import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Route, Switch} from "react-router-dom";
import OrderPage from "./Orders";
import New from "./New";

let styles = {};

class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={"/orders"} exact component={OrderPage} />
            <Route path={"/orders/new-transaction"} exact component={New}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
