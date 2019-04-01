import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import PostPage from "./Posts";
import NewPost from "./NewPost";
// Pages
let styles = {};

class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={"/blog"} exact component={PostPage} />
          <Route path={"/blog/post"} exact component={NewPost} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Index);
