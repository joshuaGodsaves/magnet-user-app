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
        <Grid container style={{ padding: "0px 8px", margin: "8px 0" }}>
          <Grid item xs={12}>
            <div style={{ height: 300, background: "ghostwhite" }}>
              <Typography variant={"h1"}>Store Theme goes here</Typography>
            </div>
            <div style={{ padding: "8px 8px", background: "lightblue" }}>
              <Button
                size={"small"}
                variant={"contained"}
                style={{ margin: "0 8px" }}
              >
                Edit theme
              </Button>
              <Button
                size={"small"}
                variant={"contained"}
                style={{ margin: "0 8px" }}
              >
                Change theme
              </Button>
            </div>
          </Grid>
        </Grid>

        <Grid container
              justify={"center"}
              spacing={24}
        >
          {[1, 2, 3].map(v => (
            <Grid item>
                <Paper  style={{padding:8, width:270,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "lightblue",
                    height: "100%",
                    justifyContent: "center"}}>
                        <Typography variant={"h1"}>0</Typography>
                        <Typography>Products</Typography>
                </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid container>
          <Grid />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LandingPage);
