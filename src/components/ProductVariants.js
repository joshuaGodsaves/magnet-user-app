import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  AppBar,
  Drawer,
  Tabs,
  Tab,
  Toolbar,
  GridListTile,
  InputBase,
  Paper,
  IconButton,
  Typography,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  FormControl,
  ButtonBase
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { CloudUpload, CloudUploadSharp } from "@material-ui/icons";
import GridList from "@material-ui/core/GridList";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

let styles = {
  root: {
    width: "80%"
  },
  appRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "ghostwhite"
  },
  toolbar: {
    width: "100%"
  }
};

class Component extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    uploadAsset: false,
    currentTab: 0,
    open: this.props.open
  };
  closeDrawer = () => {
    this.setState({ open: false });
  };
  handleSelect = url => {
    return (event, checked) => {
      if (checked) {
        this.setState(state => {
          state.externalCheckedImagesUrl.push(url);
          return state;
        });
        return;
      } else {
        this.setState(state => {
          let filered = state.externalCheckedImagesUrl.filter(v => {
            return v !== url;
          });
          state.externalCheckedImagesUrl = filered;
          return state;
        });
        return;
      }
    };
  };

  render() {
    let { open, itemSelectListener, classes } = this.props;

    return (
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={this.state.open}
          className={classes.root}
          classes={{ paper: classes.root }}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Component);
