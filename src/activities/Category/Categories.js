import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import GridListTile from "@material-ui/core/GridListTile";
import { VerifiedUser} from "@material-ui/icons";
import {
  List,
  Checkbox,
  Divider,
  GridListTileBar,
  Icon, ListItem,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Avatar
} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import { Menu } from "@material-ui/core";
import MenuList from "@material-ui/core/MenuList";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import ButtonBase from "@material-ui/core/ButtonBase";

let styles = {
  categoryItemRoot: {
    padding:"24px 24px",
    background:"ghostwhite",
    display:"flex"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
};

class DefaultCategoriesView extends React.Component {
  state= {
    categories:[

    ]
  }
  render() {
    let { classes } = this.props;
    let categoriesComponent= (
        <List>
          <ListItem component={ButtonBase} className={classes.categoryItemRoot}>
            <Avatar style={{margin:"0px 24px"}}/>
            <div  style={{margin:"0px 24px"}}>
              <Typography>Category name</Typography>
              <Typography> Description</Typography>
            </div>
          </ListItem>
        </List>
    )
    return (
      <React.Fragment>
        {this.state.categories.length != 0? categoriesComponent :<Typography> Create categories for you store</Typography>}
      </React.Fragment>
    );
  }
}
let WithStylesDefaultCategoriesView = withStyles(styles)(DefaultCategoriesView);

class Categories extends React.Component {
  state = {
    ui: {
      create: {
        anchorEl: null
      }
    }
  };
  handleCreateButttonOpen = event => {
    event.persist();
    this.setState(state => {
      state.ui.create.anchorEl = event.currentTarget;
      return state;
    });
  };
  handleCreateButtonClose = () => {
    this.setState(state => {
      state.ui.create.anchorEl = null;
      return state;
    });
  };

  render() {
    let anchorEl = this.state.ui.create.anchorEl;
    let open = Boolean(anchorEl);
    let { classes, theme } = this.props;
    return (
      <React.Fragment>
        <PageAppBar>
          <div>
            <Typography variant={"h6"}> Categories</Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Button
              variant={"contained"}
              size={"medium"}
              style={{ marginLeft: 8, marginRight: 8 }}
              to={"/categories/category"}
              component={Link}
            >
              Add Category
            </Button>
          </div>
        </PageAppBar>
        <Grid container style={{ padding: "8px 8px" }} justify={"center"}>
          <Grid item xs={11} sm={10} md={8}>
          <WithStylesDefaultCategoriesView />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Categories);
