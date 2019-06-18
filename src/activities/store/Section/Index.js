import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import StoreContext from "../StoreContext";

// Pages
import SectionsActivity from "./Sections";
import SectionActivity from "./Section";

class Index extends React.Component {

  static contextType= StoreContext
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={`/stores/${this.context.store.id}/sections`} exact component={SectionsActivity} />
          <Route path={`/stores/${this.context.store.id}/sections/:section`} exact component={SectionActivity} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Index;
