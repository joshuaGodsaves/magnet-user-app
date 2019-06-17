import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, AppBar, Toolbar, GridList, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/es/Grid";
import GridListTile from "@material-ui/core/GridListTile";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import Button from "@material-ui/core/Button";
let styles = {};

class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PageAppBar>
          <Typography>Your store</Typography>
          <div style={{ display: "flex" }}>
            <Button variant={"outlined"}>Visit Store Page</Button>
          </div>
        </PageAppBar>

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LandingPage);
