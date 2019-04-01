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
    height: "85%"
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

class NewImage extends React.Component {
  state = {
    tempImg: ""
  };
  uploadTracker = () => {
    let uploadElement = window.document.getElementById("uploadElement");
    uploadElement.click();
  };
  handleUploadElementChange = e => {
    e.persist();
    this.setState({ tempImg: e.currentTarget.files[0] });

    let data = new FormData();
    data.append("file", e.currentTarget.file[0]);

    axios.post("http://localhost:5000", data, {
      headers: {
        enctype: "multipart/formdata"
      }
    });
  };

  handleUpload = () => {
    axios.post(
      "",
      {
        assetData: undefined
      },
      {
        headers: {
          "X-auth-license": "userLicence"
        }
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <Paper
            square
            elevation={10}
            style={{
              padding: 16
            }}
          >
            <Typography variant={"caption"} style={{ textAlign: "center" }}>
              {" "}
              Simple details about image upload{" "}
            </Typography>
            <div
              style={{
                width: "200px",
                height: 200,
                background: "rgba(10,10,10,.5)",
                margin: "16px auto",
                padding: 16
              }}
            />

            <div
              style={{
                padding: 16,
                position: "relative",
                width: "200px",
                margin: "32px auto"
              }}
            >
              <ButtonBase
                onClick={this.uploadTracker}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  zIndex: 300000,
                  background: "pink",
                  top: 0,
                  left: 0
                }}
              >
                <CloudUploadSharp style={{ margin: "0px 16px" }} />
                <div style={{ margin: "0px 16px" }}>Upload</div>
              </ButtonBase>
              <input
                type={"file"}
                id={"uploadElement"}
                onChange={this.handleUploadElementChange}
              />
            </div>
          </Paper>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

class Component extends React.Component {
  constructor(props) {
    super(props);
  }

  uploadAsset = () => {
    this.setState(state => {
      state.uploadAsset = !state.uploadAsset;
      return state;
    });
  };
  state = {
    uploadAsset: false,
    currentTab: 0,
    open: this.props.open,
    query: "Search for images",
    externalImages: [1, 2, 3, 4, 5],
    externalCheckedImagesUrl: [],
    uploadedImages: [
      {
        data: undefined
      }
    ]
  };
  closeDrawer = () => {
    this.setState({ open: false });
  };

  getResources = () => {
    axios
      .get("https://api.pexels.com/v1/search", {
        params: {
          query: this.state.query
        },
        headers: {
          Authorization:
            "563492ad6f91700001000001a98eefa89e00425daa33c7549ea0553f"
        }
      })
      .then(val => {
        console.log(val);
        this.setState(state => {
          console.log("about to set state");
          state.externalImages = val.data.photos;
          return state;
        });
      })
      .catch(v => {
        if (v) {
          alert(v);
        }
      });
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

  componentDidMount() {
    this.getResources();
  }

  handleQueryChange = event => {
    event.persist();
    this.setState({ query: event.currentTarget.value });
    this.getResources();
  };

  previousPageExternal = () => {};

  nextPageExternal = () => {};

  tabSelected = (event, value) => {
    this.setState({ currentTab: value });
  };

  render() {
    let { open, itemSelectListener, classes } = this.props;

    let { uploadAsset } = this.state;

    let externalComponentView = (
      <React.Fragment>
        <div style={{ position: "relative" }}>
          <Paper
            style={{
              width: "70%",
              padding: 8,
              margin: "16px auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <InputBase
                onChange={this.handleQueryChange}
                value={this.state.query}
              />
            </div>
            <div>
              <IconButton
                style={{ margin: 0, padding: 6 }}
                innerRef={{
                  onClick: this.previousPageExternal
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                style={{ margin: 0, padding: 6 }}
                innerRef={{
                  onClick: this.nextPageExternal
                }}
              >
                <ChevronRight />
              </IconButton>
            </div>
          </Paper>
          <div style={{ position: "relative", margin: 8 }}>
            <div
              style={{ position: "absolute", width: "100%", left: 0, top: 0 }}
            >
              <Grid container justify={""} spacing={8}>
                {this.state.externalImages.map(v => (
                  <Grid
                    item
                    style={{
                      width: 200,
                      height: 180,
                      background: "red",
                      marginTop: 8
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute" }}>
                        <Checkbox onChange={this.handleSelect(v)} />
                      </div>
                    </div>
                    <Typography variant={"h2"}>Image</Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

    let uploadsComponentView = (
      <div style={{ position: "relative", margin: 8 }}>
        <div style={{ position: "absolute", width: "100%", left: 0, top: 0 }}>
          <Grid container justify={"space-around"} spacing={8}>
            {this.state.uploadedImages.map(v => (
              <Grid item style={{ width: 200, height: 180, background: "red" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute" }}>
                    <Checkbox onChange={this.handleSelect(v)} />
                  </div>
                </div>
                <Typography variant={"h2"}>Image</Typography>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );

    let newAssetComponent = <NewImage />;

    return (
      <React.Fragment>
        <Drawer
          anchor={"bottom"}
          open={this.state.open}
          className={classes.root}
          classes={{ paper: classes.root }}
        >
          <Toolbar position={"relative"} className={classes.appRoot}>
            <div>
              <Tabs onChange={this.tabSelected}>
                <Tab label={"External"} />
                <Tab label={"Uploads"} />
              </Tabs>
            </div>
            <div>
              <Button
                style={{ width: "auto", margin: "0px 16px" }}
                variant={"contained"}
                onClick={this.uploadAsset}
              >
                Upload Asset
              </Button>
              <Button
                style={{ width: "auto", margin: "0px 16px" }}
                variant={"contained"}
                onClick={this.closeDrawer}
              >
                Close
              </Button>
            </div>
          </Toolbar>
          <div>{this.state.uploadAsset ? newAssetComponent : ""}</div>
          {this.state.currentTab == 0 && externalComponentView}
          {this.state.currentTab == 1 && uploadsComponentView}
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Component);
