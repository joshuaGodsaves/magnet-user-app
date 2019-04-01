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
  TableBody,
  TableRow,
  TableCell
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
          <Typography variant={"title"}>Orders</Typography>
          <div style={{ display: "flex" }} />
        </PageAppBar>
        <Table>
          <TableHead>
            <TableRow>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell/>
            </TableRow>
          </TableBody>
        </Table>
        <Typography align={"center"}>No sales functionality available for now</Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LandingPage);
