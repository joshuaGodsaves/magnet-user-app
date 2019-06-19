import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Route, Switch} from "react-router-dom";
import OrderPage from "./Orders";
import New from "./New";
import StoreContext from "../StoreContext";


let styles = {};

class Index extends React.Component {


    static  contextType= StoreContext
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={ `/stores/${this.context.store.id}/orders`} exact component={OrderPage} />
            <Route path={`/stores/${this.context.store.id}/orders/new-transaction`} exact component={New}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
