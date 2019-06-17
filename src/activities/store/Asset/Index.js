import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Button,
  Toolbar,
  Typography,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  AppBar,
  Tab
} from "@material-ui/core";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Asset from "./Asset";

let styles = {};

class Index extends React.Component {
  state = {
    currentNav: 0
  };
  handleViewChange = (e, value) => {
    this.setState({ currentView: value });
  };
  render() {
    //let {classes}= this.props
    return (
      <React.Fragment>
        <Switch>
          <Route path={"/assets"} exact component={Asset} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
