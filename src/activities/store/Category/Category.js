import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  FormLabel,
  FormHelperText,
  OutlinedInput as Input,
  InputBase,
  List,
  ListItemText,
  Tab, Divider,
  Tabs, IconButton
} from "@material-ui/core";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ListItem from "@material-ui/core/ListItem";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageSelectionComponent from "../../components/ImageSelectionComponent"
import {CloudUpload as UploadIcon, Link as LinkIcon, SelectAll as SelectIcon} from "@material-ui/icons";
import axios from "axios";
import AppContext from "../../AppContext";

let styles = {
  listItem: {

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
  static contextType = AppContext;
  state = {
    currentTab: 0,
    categoryDialogOpen: false,
    category: {
       title: undefined,
      caption: undefined,
      description: undefined,
      products: [],
      tags: []
    },
    selectMainImageDrawerOpen: false
  };
  toggleCategoryDialog = () => {
    this.setState(state => {
      state.categoryDialogOpen = !state.categoryDialogOpen;
      return state;
    });
  };

  tabChange = (e, v) => {
    this.setState({ currentTab: v });
  };
  watchInput = propName => {
    return event => {
      event.persist();
      this.setState(state => {
        state.category[propName] = event.target.value;
        return state;
      });
    };
  };

  update = () => {
    let {match: {params}} = this.props
    axios
        .put(
            `http://localhost:5000/api/store/${this.context.user.store._id}/category/${params.category}`,
            this.state.category,
            {
              headers: {
                "X-auth-license": this.context.user.token
              }
            }
        ).then(v => {
      console.log(v)
      this.setState({updated: true})
      setTimeout(() => {
        this.setState({updated: false})
      }, 2000)
      this.loadCategory(params.category)
    }).catch(v => console.log(v))

  };


  closeingMainImageDrawer= ()=>{
    this.setState({selectMainImageDrawerOpen: false})
  }
  selectMainImage = url=>{
    this.setState({category: {mainImageLink: url}})
  }

  openSelectMainImageDrawer=()=>{
    this.setState({selectMainImageDrawerOpen: true})
  }

  loadCategory = async (catID) => {
    let category;
      category = await axios.get(`http://localhost:5000/api/store/${this.context.user.store._id}/category/${catID}`)

    if(!category){
      console.log("error")
      return
    }
    if (category.data) {
      this.setState({category: category.data, mainCategoryObj:category.data})
      return true
    }
    return false
  }

  componentDidMount() {
    let {match: {params}} = this.props
    if (params.category == "new") {
      this.setState({isNewCategory: true})
      // Init new product
    } else {
      this.setState({isNewCategory: false})
      this.loadCategory(params.category).then(v => {
        if (v) {
          this.setState({categoryID: params.category})
        } else {
        }
      })
      this.setState({categoryID: params.category})
      //load product
    }
  }
  save =async  ()=>{
    let category = await axios.post(`http://localhost:5000/api/store/${this.context.user.store._id}/category`,
        this.state.category,
        {
          headers: {
            "X-auth-license": this.context.user.token
          }
        })}

  render() {
    let { classes } = this.props;


    let primaryComponent = (
      <React.Fragment>
        {this.state.selectMainImageDrawerOpen ?
            <ImageSelectionComponent
                open={this.state.selectMainImageDrawerOpen}
                selectSingle={this.selectMainImage}
                closeingDrawer={this.closeingMainImageDrawer}/> : ""}
        <Grid container>
          <Grid item sm={7} xs={12}>
            <div className={classes.primaryFormArea}>
              <FormControl fullWidth className={classes.rootFormControls}>
                <FormLabel>Category title</FormLabel>
                <Input
                    value={this.state.category.title}
                    onChange={this.watchInput("title")}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
              <FormControl fullWidth className={classes.rootFormControls}>
                <FormLabel>Category Caption</FormLabel>
                <Input
                    value={this.state.category.caption}
                    onChange={this.watchInput("caption")}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
              <Typography variant={"subtitle1"}> Category Description</Typography>
              <CKEditor
                  editor={ClassicEditor}
                  onChange={(editor, dataw, data) => {
                    console.log(data)
                    // this.setState({
                    // product: {description:data}
                    // })
                  }}
                  style={{ width:"100%",height:"100%"}}
              />
              <div />
            </div>
          </Grid>
          <Grid item sm={5} xs={12}
                style={{height: "500%", background: "ghostwhite"}}
          >
            <Grid container>
              <Grid item xs={12} style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", padding:"32px 0px"}}>
                <div style={{width:200, height:200, background: "grey"}}>
                </div>
                <div style={{padding:"0px 0px"}}>
                  <IconButton><UploadIcon/></IconButton>
                  <IconButton onClick={this.openSelectMainImageDrawer}><SelectIcon/></IconButton>
                  <IconButton><LinkIcon/></IconButton>
                </div>
              </Grid>
              <Grid item xs={12}><Divider/></Grid>
              <Grid item style={{padding:24}}  xs={12}>
                <Typography> Core Options</Typography>
                <FormControl fullWidth>
                  <InputBase
                      multiline
                      style={{ background: "white", padding: "16px" }}
                  />
                  <FormHelperText>
                    Enter product tags and seperate with spaces
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
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
              <Tab label={"Primary"} style={{ color: "black" }} />
              <Tab label={"products"} style={{  color: "black" }} />
            </Tabs>
            <div>
              <Button onClick={this.state.isNewCategory? this.save : this.update}> {this.state.isNewCategory? "Save" : "Update"}</Button>
            </div>
        </PageAppBar>
        <Grid container style={{padding: "24px 0"}} justify={"center"}>
          <Grid item xs={10}>
        {this.state.currentTab == 0 && primaryComponent}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Category);
