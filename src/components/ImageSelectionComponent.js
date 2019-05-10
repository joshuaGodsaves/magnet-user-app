import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    Snackbar,
    SnackbarContent,
    Divider,
  Drawer,
  Tabs,
  Tab,
  Toolbar,
  InputBase,
  Paper,
  IconButton,
  Typography,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  ButtonBase
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { CloudUpload, CloudUploadSharp, Cancel } from "@material-ui/icons";
import GridList from "@material-ui/core/GridList";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Uploader from "./DynamicUploadHandler";
import AppContext from '../AppContext'

let styles = {
  root: {
    height: "100%",
    zIndex:30000
  },
  appRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  toolbar: {
    width: "100%"
  }
};

class UploadImageDialog extends React.Component {
    static contextType = AppContext
  state = {
      open: true,
      url: "",
      file: undefined,
      uploading: false,
      uploaded: false
  };
  uploadTracker = () => {
    let uploadElement = window.document.getElementById("uploadElement");
    uploadElement.click();
  };
  handleUploadElementChange = e => {
    e.persist();
    this.setState({ file: e.currentTarget.files[0] });
    this.handleUpload()
  };
  handleUpload = async () => {
    let data = new FormData();
    data.append("file",this.state.file);
    let result=axios.post(`http://localhost:5000/api/store/${this.context.user.store}/upload`, data, {
      headers:{
        "X-auth-license": this.context.user.token
      }
    })

      this.setState({uploading: true, open:false})
    result.then(val=>{
      console.log( val.data )
        this.setState({uploading: false, uploaded: true})
        setTimeout(()=>{
            this.props.closingDialog()
        }, 3000)
    })
  };
  close= ()=>{
      this.props.closingDialog()
  }
  render() {

      let uploadingMessage= (
          <Snackbar open autoHideDuration={3000} resumeHideDuration >
              <SnackbarContent message={"Image is uploading"}>
              </SnackbarContent>
          </Snackbar>
      )
      let uploadedMessage= (
          <Snackbar open  autoHideDuration={3000} resumeHideDuration>
              <SnackbarContent message={"Image has been uploaded successfully"}>
              </SnackbarContent>
          </Snackbar>
      )
    return (
      <React.Fragment>
        <Dialog open={this.state.open} maxWidth={"sm"} fullWidth style={{zIndex:40000}}>
            <DialogTitle>
                <Typography variant={"h6"}> Upload Image</Typography>
            </DialogTitle>
            <Divider/>
           <DialogContent>
               <Typography variant={"caption"} style={{ textAlign: "center" }}>
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
           </DialogContent>
            <DialogActions style={{display:"flex", justifyContent:"flex-end"}}>
                <Button  onClick={this.close}>Cancel</Button>
            </DialogActions>
        </Dialog>
          {this.state.uploading?  uploadingMessage : ""}
          {this.state.uploaded?  uploadedMessage : ""}
      </React.Fragment>
    );
  }
}

class Component extends React.Component {
 static contextType = AppContext;
  state = {
    uploadAsset: false,
    currentTab: 0,
    open: this.props.open,
    query: "Search for images",
    externalResources: [1, 2],
    selectedImages: [1,2,3],
    storeResources: [
        1,23,4
    ]
  };

  constructor(props) {
    super(props);
  }

  uploadAsset = () => {
    this.setState(state => {
      state.uploadAsset = true
      return state;
    });
  };

  closeDrawer = () => {
      this.props.closeingDrawer()
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
          state.externalResources= val.data.photos;
          return state;
        });
      })
      .catch(v => {
        if (v) {
        }
      });
  };

  getStoreResources= ()=>{
    console.log("getting resources")
    axios
        .get(`http://localhost:/api/store/${this.context.user.store}/upload`, {
          params: {
            query: this.state.query
          },
          headers: {
            "X-auth-license": this.context.user.token
          }
        })
        .then(val => {
          console.log(val);
          this.setState(state => {
            state.storeResources = val.data.photos;
            return state;
          });
        })
        .catch(v => {
          if (v) {
            console.log(v)
          }
        });
  }
  handleSelect = url => {
    return (event, checked) => {
      if(this.props.selectSingle){
        this.props.selectSingle(url)
        this.closeDrawer()
        return
      }
      if (checked) {
        this.setState(state => {
          state.selectedImages.push(url);
          return state;
        });
        return;
      }else {
        this.setState(state => {
          let filered = state.selectedImages.filter(v => {
            return v !== url;
          });
          state.selectedImages = filered;
          return state;
        });
        return;
      }
    };
  };
  componentWillMount() {

    this.getStoreResources();
  }
  componentDidMount() {
      this.setState({open: this.props.open})
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
  closingUploadDialog= ()=>{
      this.setState({uploadAsset: false})
  }
  render() {
    let { open, itemSelectListener, classes, selectSingle } = this.props;
    let { uploadAsset } = this.state;
    let externalComponentView = (
      <React.Fragment>
        <div style={{ position: "relative" }}>
          <Paper
              elevation={5}
            style={{
              width: "70%",
              padding: 8,
              margin: "16px auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div  style={{width:"calc(100% - 100px)"}}>
              <InputBase style={{width:"100%"}}
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
              <Grid container  spacing={8}>
                {this.state.externalResources.map(v => (
                  <Grid
                    item
                    style={{
                      width: 200,
                      height: 180,
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
          <Grid container justify={"flex-start"} spacing={8}>
            {this.state.storeResources.map(v => (
              <Grid item>
                  <div style={{ width: 200, height: 180, border:".5px solid black"}}>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute" }}>
                        <Checkbox onChange={this.handleSelect(v)} />
                      </div>
                    </div>
                  </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
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
              <Tabs value={0} variant={"scrollable"}>
                <Tab label={"Uploads"}  style={{color:'#404040'}}/>
                <Tab label={"External"}   style={{color:'#404040'}} disabled/>
                <Tab label={"Selected"}   style={{color:'#404040'}} disabled/>
              </Tabs>
            </div>
            <div>
              <IconButton
                variant={"contained"}
                onClick={this.uploadAsset}
              >
                <CloudUpload/>
              </IconButton>
              <IconButton
                variant={"contained"}
                onClick={this.closeDrawer}
              >
                <Cancel/>
              </IconButton>
            </div>
          </Toolbar>
          {this.state.uploadAsset ? <UploadImageDialog closingDialog={ this.closingUploadDialog }/>: ""}
          {this.state.currentTab == 1 && externalComponentView}
          {this.state.currentTab == 0 && uploadsComponentView}
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Component);
