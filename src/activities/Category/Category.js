import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import DropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
  Tabs,
  ButtonBase,
  Toolbar,
  Tab,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemAvatar,
  ListItemText,
  List,
  InputBase,
  Input
} from "@material-ui/core";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ListItem from "@material-ui/core/ListItem";

let styles = {
  listItem: {
    background: "orange"
  },
  xPadding: {
    padding: "0px 16px"
  },
  margin: {
    marginBottom: 8,
    marginTop: 8
  },
  ymargin: {
    marginTop: 16,
    marginBottom: 16
  },
  toolBar: {
    background: "white",
    display: "flex",
    justifyContent: "space-between"
  },
  primaryFormArea: {
    padding: "16px 32px"
  },
  rootFormControls: {
    margin: "8px 0"
  },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    justifyItems: "space-between"
  }
};
class Category extends React.Component {
  state = {
    currentTab: 0,
    categoryDialogOpen: false,
    product: {
      category: undefined,
      gallery: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      tags: [],
      title: undefined,
      description: undefined,
      priceUpperBound: undefined,
      priceLowerBound: undefined,
      mainImage: undefined
    }
  };

  setUpenv = () => {};
  toggleCategoryDialog = () => {
    this.setState(state => {
      state.categoryDialogOpen = !state.categoryDialogOpen;
      return state;
    });
  };
  addNewProduct = () => {};
  updateProduct = () => {};
  getProductDetail = () => {};
  tabChange = (e, v) => {
    this.setState({ currentTab: v });
  };

  watchInput = propName => {
    return event => {
      event.persist();
      this.setState(state => {
        state.product[propName] = event.target.value;
        return state;
      });
    };
  };
  render() {
    let { classes } = this.props;

    let categorySelector = (
      <React.Fragment>
        <Dialog
          open={this.state.categoryDialogOpen}
          maxWidth={"sm"}
          fullWidth
          onClose={this.toggleCategoryDialog}
        >
          <DialogActions
            style={{ display: "flex", justifyContent: "space-between" }}
            className={classes.xPadding}
          >
            <Typography variant={"h6"}> Select category</Typography>
            <Button variant={"text"}>Add Category</Button>
          </DialogActions>
          <DialogContent>
            <List color={"primary"}>
              <ListItem className={classes.listItem} component={ButtonBase}>
                <ListItemText>Category text</ListItemText>
              </ListItem>
              <ListItem className={classes.listItem} component={ButtonBase}>
                <ListItemText>Category text</ListItemText>
              </ListItem>
              <ListItem className={classes.listItem} component={ButtonBase}>
                <ListItemText>Category text</ListItemText>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions className={classes.xPadding} s>
            <Button onClick={this.toggleCategoryDialog}> Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );

    let primaryComponent = (
      <React.Fragment>
        {categorySelector}
        <Grid container>
          <Grid item sm={7} xs={12}>
            <div className={classes.primaryFormArea}>
              <FormControl fullWidth className={classes.rootFormControls}>
                <InputLabel>Category title</InputLabel>
                <Input
                  onChange={this.watchInput("title")}
                />
              </FormControl>
              <FormControl fullWidth className={classes.rootFormControls}>
                <InputLabel>Category Caption</InputLabel>
                <Input
                  onChange={this.watchInput("description")}
                />
              </FormControl>
              <div />
            </div>
          </Grid>

          <Grid
            item
            sm={5}
            xs={12}
            style={{
              height: "500%",
              background: "ghostwhite",
              padding: "32px 32px"
            }}
          >
            <div
              className={classes.ymargin}
              style={{
                display: "flex",
                justifyContent: "center",
                background: "orange",
                padding: "20px",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  width: 150,
                  height: 150,
                  background: "#404040",
                  border: "5px solid grey"
                }}
              />
              <Button className={classes.ymargin}>Upload Image</Button>
            </div>
            <Typography> Core Options</Typography>
            <div className={classes.ymargin}>
            </div>
            <div className={classes}>
              <FormControl fullWidth>
                <InputBase
                  multiline
                  style={{ background: "white", padding: "16px" }}
                />
                <FormHelperText>
                  Enter product tags and seperate with spaces
                </FormHelperText>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <PageAppBar nospacing>
            <Tabs
              style={{ padding: 0 }}
              variant={"scrollable"}
              value={this.state.currentTab}
              onChange={this.tabChange}
            >
              <Tab label={"Primary"} style={{ background: "red" }} />
              <Tab label={"products"} style={{ background: "red" }} />
            </Tabs>
            <div>
              <Button>Save</Button>
            </div>
        </PageAppBar>
        {this.state.currentTab == 0 && primaryComponent}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Category);
