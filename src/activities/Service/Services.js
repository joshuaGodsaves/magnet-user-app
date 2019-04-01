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
  TableCell, ListItem, Avatar, List
} from "@material-ui/core";
import Grid from "@material-ui/core/es/Grid";
import { Link } from "react-router-dom";
import GridListTile from "@material-ui/core/GridListTile";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
let styles = {};

class Services extends React.Component {
  state={
    services:[

    ]
  }

  render() {


    let {classes} = this.props

    let servicesComp=(
            <div style={{ padding: 16, }}>
              <List>
                <ListItem component={ButtonBase} className={classes.categoryItemRoot}>
                  <Avatar style={{margin:"0px 24px"}}/>
                  <div  style={{margin:"0px 24px"}}>
                    <Typography>Service name</Typography>
                    <Typography> Description</Typography>
                  </div>
                </ListItem>
              </List>
            </div>
        )
    return (
      <React.Fragment>
        <PageAppBar>
          <Typography variant={"title"}>Service</Typography>
          <div style={{ display: "flex" }}>
            <Button
              variant={"outlined"}
              to={"/services/new-service"}
              component={Link}
            >
              Add Services
            </Button>
          </div>
        </PageAppBar>
        <div style={{ padding: "16px 24px" }}>
          {this.state.services.length !=0? servicesComp: <Typography>You havent added any service yet</Typography>}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Services);
