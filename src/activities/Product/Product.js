import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
    ButtonBase,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    InputBase,
    List,
    ListItem,
    ListItemText,
    OutlinedInput as Input,
    Tab,
    Tabs
} from "@material-ui/core";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import AppContext from "../../AppContext";
import axios from "axios";
import Uploader from "../../components/DynamicUploadHandler";

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
  primarySpacing: {
    padding: "16px 24px"
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

class Product extends React.Component {
  state = {
    currentTab: 0,
    storeCategories: [],
    categoryFormOpen: false,
    categoryDialogOpen: false, editGalleryItemSelectorDialogOpen: false,
      currentGalleryItemEditAction:{
        url: undefined,
          index: undefined
      },
    newCategoryName: undefined,
    product: {
      categories: [],
      gallery: [
        undefined
      ],
      tags: [],
      title: undefined,
      description: undefined,
      costPrice: undefined,
      sellingPrice: undefined,
      mainImage: undefined
    }
  };
  static contextType = AppContext;
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

  toggleCategoryForm = () => {
    this.setState(state => {
      state.categoryFormOpen = !state.categoryFormOpen;
      return state;
    });
  };
  loadCategories = () => {
    axios
      .get(
        `http://localhost:5000/api/store/${
          this.context.user.store._id
        }/category`,
        {
          headers: {
            "X-auth-license": this.context.user.token
          }
        }
      )
      .then(v => {
        console.log(v);
        let categories = v.data.items;
        this.setState({ storeCategories: categories });
      })
      .catch(v => console.log(v));
  };

  watchCatName = e => {
    e.persist();
    this.setState({ newCategoryName: e.target.value });
  };
  saveNewCategory = event => {
    event.persist();
    axios
      .post(
        `http://localhost:5000/api/store/${
          this.context.user.store._id
        }/category`,
        {
          title: this.state.newCategoryName
        },
        {}
      )
      .then(v => {
        console.log(v);
        this.loadCategories();
      })
      .catch(v => console.log(v));
  };

  selectedCategory= (id)=>{
      return (event, v)=>{
          console.log(v)
          this.setState(state=>{
              if(v){
                  state.product.categories.push(id)
              }else{
                  state.product.categories= state.product.categories.filter(v=> {return v!==id} )
              }

              console.log(state.product)
              return state;
          })
      }
  }

  watchTags = (event)=>{
      event.persist()
      let arr= event.target.value.split(" ")
      this.setState(state=>{
          state.product.tags= arr;
          return state
      })
  }
  saveProduct = event => {
    console.log(this.state.product);
  };

  componentDidMount() {
        this.loadCategories()
  }
  watchFileChange= (event)=>{
      event.persist()
      let reader= new FileReader()
      //console.log(event.target.files[0])
      reader.readAsDataURL(event.target.files[0])
      console.log(reader.result)

  }

    toggleGalleryItemSelectorDialogOpen =(url, index)=>{
      return ()=>{
          this.setState(state=>{
              state.currentGalleryItemEditAction.url= url
              state.currentGalleryItemEditAction.index= index
              state.editGalleryItemSelectorDialogOpen= true
              return state;
          })
      }
    }

    toggleGalleryItemSelectorDialogClose =(url, index)=>{
            this.setState(state=>{
                state.editGalleryItemSelectorDialogOpen= false
                return state;
            })
    }

  render() {
    let { classes } = this.props;

    let categorySelector = (
      <React.Fragment>
        <Dialog
          open={this.state.categoryDialogOpen}
          maxWidth={"xs"}
          fullWidth
          onClose={this.toggleCategoryDialog}
        >
          <DialogActions
            style={{ display: "flex", justifyContent: "space-between" }}
            className={classes.xPadding}
          >
            <Typography variant={"h6"}> Select category</Typography>
            <Button variant={"text"} onClick={this.toggleCategoryForm}>
              Add Category
            </Button>
          </DialogActions>
          <Divider />
          <DialogContent style={{ padding: 0 }}>
            <div
              style={{
                display: this.state.categoryFormOpen ? "block" : "none"
              }}
            >
              <FormControl
                fullWidth
                style={{ padding: "16px 24px", boxSizing: "border-box" }}
              >
                <FormLabel>Category title</FormLabel>
                <Input
                  size={"small"}
                  onChange={this.watchCatName}
                  value={this.state.newCategoryName}
                />
                <FormHelperText>Add category and edit later</FormHelperText>
              </FormControl>
              <div style={{ padding: "8px 24px", boxSizing: "border-box" }}>
                <Button
                  variant={"text"}
                  size={"small"}
                  onClick={this.saveNewCategory}
                >
                  Save
                </Button>{" "}
                <Button
                  variant={"text"}
                  size={"small"}
                  onClick={this.toggleCategoryForm}
                >
                  Cancel
                </Button>
              </div>
              <Divider />
            </div>
            <List color={"primary"}>
              {this.state.storeCategories.length == 0 ? (
                <Typography style={{ padding: 24 }} align={"center"}>
                  {" "}
                  You have'nt created any category for your store yet
                </Typography>
              ) : (
                this.state.storeCategories.map(v => (
                  <ListItem className={classes.listItem}>
                    <Checkbox
                        onChange={this.selectedCategory(v._id)}
                      checked={this.state.product.categories.some(
                        id => id == v._id)}
                    />{" "}
                    <ListItemText>{v.title}</ListItemText>
                  </ListItem>
                ))
              )}

            </List>
          </DialogContent>
          <DialogActions className={classes.xPadding} s>
            <Button onClick={this.toggleCategoryDialog}> Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
    let galleryItemSelector= (
        <React.Fragment>
            <Dialog
                open={this.state.editGalleryItemSelectorDialogOpen}
                fullScreen
                fullWidth
                style={{zIndex:30000}}
                onClose={this.toggleGalleryItemSelectorDialogClose}
            >
                <DialogActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                    className={classes.xPadding}
                >
                    <Typography variant={"h6"}> Select Image</Typography>
                    <Button variant={"text"} onClick={this.toggleGalleryItemSelectorDialog}>
                        Upload
                    </Button>
                </DialogActions>
                <Divider />
                <DialogContent style={{ padding: 0 }}>
                    <Uploader noPreview onUploadEnd={this.newFileUploadEnd} onUploadEnd={this.newFileUploadEnd} />
                    <Grid container>

                    </Grid>
                </DialogContent>
                <DialogActions className={classes.xPadding} s>
                    <Button onClick={this.toggleGalleryItemSelectorDialogClose}> Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
    let imageUploadComp= (
        <React.Fragment>
            <div style={{width:200, overflow:"hidden", padding:"24px 24px", border:"1px solid black", position:"relative"}}>
                <ButtonBase style={{width:"100%", padding:"16px", position: "absolute", top:0, left:0, height:"100%"}}
                onClick={()=>{
                    document.getElementById("file").click()
                }}>Upload Image</ButtonBase>
                <input type={"file"} id={"file"} onChange={this.watchFileChange}/>
            </div>
        </React.Fragment>
    )

    let primaryComponent = (
      <React.Fragment>
        {categorySelector}
        <Grid container>
          <Grid item sm={7} xs={12}>
            <div className={classes.primarySpacing}>
              <FormControl fullWidth className={classes.rootFormControls}>
                <FormLabel> Produc title</FormLabel>
                <Input
                  id="productTitle"
                  name="product-title"
                  onChange={this.watchInput("title")}
                />
              </FormControl>
              <FormControl fullWidth className={classes.rootFormControls}>
                <FormLabel>Product Description</FormLabel>
                <Input
                  id="productDescription"
                  name="product-description"
                  onChange={this.watchInput("description")}
                />
              </FormControl>
              <FormControl fullWidth className={classes.rootFormControls}>
                <FormLabel>Product cost Price</FormLabel>
                <Input onChange={this.watchInput("costPrice")} />
              </FormControl>
              <FormControl fullWidth className={classes.rootFormControls}>
                <FormLabel>Product selling price</FormLabel>
                <Input onChange={this.watchInput("sellingPrice")} />
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
              background: "pink",
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

                {imageUploadComp}

            </div>
            <Typography> Core Options</Typography>
            <div style={{ padding: 16, background: "white" }}>
              <Typography variant={"caption"}>Category</Typography>
              <Typography>
                {this.state.product.category
                  ? this.state.product.category
                  : "Select Category"}
              </Typography>
            </div>
            <div className={classes.ymargin}>
              <Button
                fullWidth
                variant={"contained"}
                onClick={this.toggleCategoryDialog}
              >
                {" "}
                Select category
              </Button>
            </div>
            <div>
                <div className={classes.ymargin}>
                    {this.state.product.tags.map(v=> (<Chip label={v} style={{margin:"8"}}/>))}
                </div>
              <FormControl fullWidth>
                <InputBase
                  multiline
                  style={{ background: "white", padding: "16px" }}
                  onChange={this.watchTags}
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


    let visualComponent= (
        <React.Fragment>
            {galleryItemSelector}
            <Grid container className={classes.primarySpacing}>
                <Grid item xs={12}>
                    <Typography variant={"h6"}>Gallery</Typography>
                    <Grid container spacing={8}>
                        {this.state.product.gallery.map((url,index)=>(
                            <Grid item onClick={this.toggleGalleryItemSelectorDialogOpen(index, url)}>
                                <div style={{width:"200px", height:"200px", background:"red"}}></div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>


            </Grid>
        </React.Fragment>
    )
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
              <Tab
                  label={"Visuals"}
                  style={{ background: "red" }}
              />
            <Tab label={"Advanced"} style={{ background: "red" }} />
          </Tabs>
          <div>
            <Button onClick={this.save}>Save</Button>
          </div>
        </PageAppBar>
        {this.state.currentTab == 0 && primaryComponent}
          {this.state.currentTab == 1 && visualComponent}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Product);
