import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  Paper,
  ButtonBase,
  FormLabel,
  FormHelperText,
  OutlinedInput as Input,
  InputBase,
  List,
  ListItemText,
  Tab, Divider,
  Tabs, IconButton, ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, Checkbox, Chip
} from "@material-ui/core";
import PageAppBar from "../../../components/ActivityPrimaryAppBar";
import FormControl from "@material-ui/core/FormControl";
import {InfoComponentForSectionIcon} from "../../../components/InformativeComponents";
import ImageSelectionComponent from "../../../components/ImageSelectionComponent"
import {CloudUpload as UploadIcon, Link as LinkIcon, MoreHoriz, SelectAll as SelectIcon,AddToQueue} from "@material-ui/icons";
import {FaProductHunt, FaDollarSign, FaPlusCircle, FaPlus} from "react-icons/fa"
import axios from "axios";
import StoreContext from "../StoreContext";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ProductSelectionComponent from "../components/ProductSelectionComponent"

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

class Section extends React.Component {
  static contextType = StoreContext;
  state = {
    productsDialogOpen: false,
    currentTab: 0,
    categoryDialogOpen: false,
    selectMainImageDrawerOpen: false,
    isNewSection: false,
    section:{
      title: undefined,
      name: undefined,
      label: undefined,
      icon: undefined,
      description: undefined,
      available: undefined,
      items: []
    }
  };
  tabChange = (e, v) => {
    this.setState({ currentTab: v });
  };
  watchInput = propName => {
    return event => {
      event.persist();
      this.setState(state => {
        state.section[propName] = event.target.value;
        return state;
      });
    };
  };

  update = () => {
    let {match: {params}} = this.props
    axios
        .put(
            `http://localhost:5000/api/store/${this.context.store.id}/section/${params.section}`,
            this.state.section,
            {
              headers: {
                "X-auth-license": this.context.store.token
              }
            }
        ).then(v => {
      console.log(v)
      this.setState({updated: true})
      setTimeout(() => {
        this.setState({updated: false})
      }, 2000)
      this.loadSection(params.section)
    }).catch(v => console.log(v))
  };

  closeingMainImageDrawer= ()=>{
    this.setState({selectMainImageDrawerOpen: false})
  }

  selectMainImage = url=>{
    this.setState(state=>{
      state.section.icon= url;
      return url
    })
  }

  openSelectMainImageDrawer=()=>{
    this.setState({selectMainImageDrawerOpen: true})
  }

  loadSection = async (sectionID) => {
    let section;
        section= await axios.get(`http://localhost:5000/api/store/${this.context.store.id}/section/${sectionID}`)

    if(!section){
      console.log("error")
      return
    }
    if (section.data) {
      this.setState({section: section.data})
      return true
    }
    return false
  }

  componentDidMount() {
    let {match: {params}} = this.props
    if (params.section == "new") {
      this.setState({isNewSection: true})
      // Init new product
    } else {
      this.setState({isNewSection: false})
      this.loadSection(params.section).then(v => {
        if (v) {
          this.setState({sectionID: params.section})
        } else {
        }
      })
      this.setState({sectionID: params.section})
      //load product
    }
  }
  save =async  ()=>{
    let section = await axios.post(`http://localhost:5000/api/store/${this.context.store.id}/section`,
        this.state.section,
        {
          headers: {
            "X-auth-license": this.context.store.token
          }
        })
    let sectionid=section.data.items[section.data.items.length-1]._id

    window.location.replace(`http://localhost:3000/stores/${this.context.store.id}/sections/${sectionid}`)

  }

  openProductsDialog= ()=>{

    this.setState({productsDialogOpen: true})
  }

  addProduct = ()=>{
    this.setState({})
  }

  closeProductSelector =(arr)=>{
    this.setState(state=>{
      state.section.items = arr
      return  state
    })

    this.setState({productsDialogOpen: false})

  }

  render() {
    let { classes } = this.props;
    let primaryComponent = (
      <React.Fragment>
        {this.state.selectMainImageDrawerOpen ?
            <ImageSelectionComponent
                open={this.state.selectMainImageDrawerOpen}
                selectSingle={this.selectMainImage}
                closeingDrawer={this.closeingMainImageDrawer}/> : ""}

        <Grid container spacing={8}>
          <Grid item md={6}>
            <Paper style={{padding:24}}>
              <FormControl fullWidth style={{margin:"12px 0px"}}>
                <FormLabel>Section Label</FormLabel>
                <OutlinedInput onChange={this.watchInput("label")} value={this.state.section.label}/>
              </FormControl>
              <FormControl fullWidth style={{margin:"12px 0px"}}>
                <FormLabel>Description</FormLabel>
                <OutlinedInput multiline  onChange={this.watchInput("description")} value={this.state.section.description}/>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper  style={{padding:24}}>
              <Grid  container justify={"space-around"} style={{display:"flex"}}>
                <Grid item>
                  <Grid container direction={"column"} alignItems={"center"} justify={"center"}>
                    <Grid item style={{height: 70, width:70, border:"1px solid black", borderRadius:50}}>
                    </Grid>
                    <Grid item>
                      <ButtonBase  style={{padding: 8, margin:"8px 0px", borderRadius:12}} onClick={this.openSelectMainImageDrawer}>
                          Upload Icon <UploadIcon style={{margin:"0px 8px"}}/>
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item >
                  <Grid container direction={"column"} alignItems={"center"} justify={"center"}>
                    <Grid item style={{height: 70, width:70, border:"1px solid black", borderRadius:50}}>
                    </Grid>
                    <Grid item>
                      <ButtonBase style={{padding: 8, margin:"8px 0px", borderRadius:12}}  onClick={this.openSelectMainImageDrawer}>
                          Select Icon  <UploadIcon  style={{margin:"0px 8px"}}/>
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{margin:"8px 0px"}}>
                  <InfoComponentForSectionIcon/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );

    let productsComponent = (
          <Grid container   spacing={8}>
            {this.state.section.items.map(v=> (
                <Grid item xs={6}>
                  <Paper style={{margin:"16px 0px"}} elevation={1}>
                    <Grid container alignItems={"center"}>
                      <Grid item>
                        <Checkbox/>
                      </Grid>
                      <Grid item>
                        <FaProductHunt/>
                        <Typography> Product Name</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
            ))}
          </Grid>
    );

    return (
      <React.Fragment>
        {this.state.productsDialogOpen ? <ProductSelectionComponent open={this.state.productsDialogOpen} closeProductSelector={this.closeProductSelector}/>: "" }
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
              <IconButton onClick={this.openProductsDialog} style={{background:"ghostwhite"}}>
                <FaPlus/>
              </IconButton>
              <Button onClick={this.state.isNewSection? this.save : this.update}> {this.state.isNewSection? "Save" : "Update"}</Button>
            </div>
        </PageAppBar>
        <Grid container style={{padding: "24px 0"}} justify={"center"}>
          <Grid item xs={10}>
        {this.state.currentTab == 0 && primaryComponent}
            {this.state.currentTab == 1 && productsComponent}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Section);
