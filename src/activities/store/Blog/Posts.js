import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  AppBar,
  Toolbar,
  GridList,
  GridListTileBar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@material-ui/core";
import Grid from "@material-ui/core/es/Grid";
import { Link } from "react-router-dom";
import GridListTile from "@material-ui/core/GridListTile";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import Button from "@material-ui/core/Button";

let styles = {};

class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PageAppBar>
          <Typography variant={"title"}>Blog Page</Typography>
          <div style={{ display: "flex" }}>
            <Button variant={"outlined"} to={"/blog/post"} component={Link}>
              Add Post
            </Button>
          </div>
        </PageAppBar>

        <div style={{ padding: "8px 8px" }}>
          <Paper style={{ padding: 16 }}>
            <Table>
              <TableHead style={{ background: "lightblue" }}>
                <TableRow style={{ background: "lightblue" }}>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell />
              </TableBody>
            </Table>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LandingPage);
