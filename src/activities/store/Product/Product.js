import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {FaMailBulk, FaProductHunt, FaDollarSign, FaTextWidth} from "react-icons/fa";

import {CloudUpload as UploadIcon, Link as LinkIcon, SelectAll as SelectIcon } from "@material-ui/icons";
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
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemText,
    OutlinedInput as Input,
    Paper,
    Switch,
    Tab,
    Tabs
} from "@material-ui/core";


import  ImageSelectionComponent from "../../../components/ImageSelectionComponent"
import PageAppBar from "../../../components/ActivityPrimaryAppBar"
import StoreContext from "../StoreContext"
import axios from "axios";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
    rootFormControls: {
        margin: "8px 0"
    },
    flexCenter: {
        display: "flex",
        justifyContent: "center",
    }
};

class Product extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        updated: false,
        currentSelectedGalleryItem: undefined,
        isNewProduct: false,
        productId: undefined,
        selectMainImageDrawerOpen: false,
        currentTab: 0,
        storeCategories: [],
        categoryFormOpen: false,
        categoryDialogOpen: false, editGalleryItemSelectorDialogOpen: false,
        currentGalleryItemEditAction: {
            url: undefined,
            index: undefined
        },
        newCategoryName: undefined,
        product: {
            categories: [],
            gallery: [
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined
            ],
            count: undefined,
            tags: [],
            title: undefined,
            description: undefined,
            caption: undefined,
            costPrice: undefined,
            sellingPrice: undefined,
            mainImageLink: undefined,
            articleLink: undefined,
            variants: [],
            available: false
        },
        mainProductObj: {}
    };
    static contextType = StoreContext;
    toggleCategoryDialog = () => {
        this.setState(state => {
            state.categoryDialogOpen = !state.categoryDialogOpen;
            return state;
        });
    };

    updateProduct = () => {
        let {product, mainProductObj} = this.state
        let {match: {params}} = this.props
        axios
            .put(
                `http://localhost:5000/api/store/${this.context.store.id}/product/${params.product}`,
                this.state.product,
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
            this.loadProduct(params.product)

        }).catch(v => console.log(v))

    };

    tabChange = (e, v) => {
        this.setState({currentTab: v});
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
                `http://localhost:5000/api/store/${this.context.store.id}/category`,
                {
                    headers: {
                        "X-auth-license": this.context.store.token
                    }
                }
            )
            .then(v => {
                console.log(v);
                let categories = v.data.items;
                this.setState({storeCategories: categories});
            })
            .catch(v => console.log(v));
    };

    watchCatName = e => {
        e.persist();
        this.setState({newCategoryName: e.target.value});
    };
    saveNewCategory = event => {
        event.persist();
        axios
            .post(
                `http://localhost:5000/api/store/${
                    this.context.store.id
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

    selectedCategory = (id) => {
        return (event, v) => {
            console.log(v)
            this.setState(state => {
                if (v) {
                    state.product.categories.push(id)
                } else {
                    state.product.categories = state.product.categories.filter(v => {
                        return v !== id
                    })
                }

                console.log(state.product)
                return state;
            })
        }
    }

    watchTags = (event) => {
        event.persist()
        let arr = event.target.value.split(" ")
        this.setState(state => {
            state.product.tags = arr;
            return state
        })
    }

    save = event => {
        axios
            .post(
                `http://localhost:5000/api/store/${
                    this.context.store.id
                    }/product`,
                this.state.product,
                {
                    headers: {
                        "X-auth-license": this.context.store.token
                    }
                }
            ).then(v => {
            console.log(v.data)
        })
    };

    loadProduct = async (productID) => {
        let product = await axios.get(`http://localhost:5000/api/store/${this.context.store.id}/product/${productID}`)
        if (product.data) {
            this.setState({product: product.data, mainProductObj: product.data})
            return true
        }
        return false

    }

    componentDidMount() {
        this.loadCategories()
        let {match: {params}} = this.props
        if (params.product == "new") {
            this.setState({isNewProduct: true})
            // Init new product
        } else {
            this.loadProduct(params.product).then(v => {
                if (v) {
                    this.setState({productID: params.product})
                } else {
                    // could not load product and error occured somewhere maybe in the network.
                }
            })
            this.setState({productID: params.product})
            //load product
        }
    }

    toggleGalleryItemSelectorDialogOpen = (url, index) => {
        return () => {
            this.setState(state => {
                state.currentGalleryItemEditAction.url = url
                state.currentGalleryItemEditAction.index = index
                state.editGalleryItemSelectorDialogOpen = true
                return state;
            })
        }
    }

    toggleGalleryItemSelectorDialogClose = (url, index) => {
        this.setState(state => {
            state.editGalleryItemSelectorDialogOpen = false
            return state;
        })
    }
    selectMainImage = (url) => {
        this.setState(state => {
            state.product.mainImageLink = url
            state.selectMainImageDrawerOpen= false
            return state
        })
    }
    /*
    * @param index
    * It holds the reference index to the current gallery item
    * selected for edit in the image selection dialog.
    */
    openGalleryItemDrawer= (index)=>{
        return ()=>{
            this.setState({selectGalleryItemDrawer: true, currentSelectedGalleryItem:index })
        }
    }
    selectSingleGalleryItem= (url)=>{
        let index= this.state.currentSelectedGalleryItem

            this.setState(state => {
                state.product.gallery[index]= url
                state.selectGalleryItemDrawer= false
                return state
            })
    }

    openSelectMainImageDrawer = () => {
        this.setState({selectMainImageDrawerOpen :true})
    }
    closeingMainImageDrawer= ()=>{
        this.setState({selectMainImageDrawerOpen :false})
    }
    closeingGalleryImageDrawer= ()=>{
        this.setState({selectGalleryItemDrawer :false})
    }

    render() {
        let {classes} = this.props;
        let {product} = this.state
        let categorySelector = (
            <React.Fragment>
                <Dialog
                    open={this.state.categoryDialogOpen}
                    maxWidth={"xs"}
                    fullWidth
                    onClose={this.toggleCategoryDialog}
                >
                    <DialogActions
                        style={{display: "flex", justifyContent: "space-between"}}
                        className={classes.xPadding}
                    >
                        <Typography variant={"h6"}> Select category</Typography>
                        <Button variant={"text"} onClick={this.toggleCategoryForm}>
                            Add Category
                        </Button>
                    </DialogActions>
                    <Divider/>
                    <DialogContent style={{padding: 0}}>
                        <div
                            style={{
                                display: this.state.categoryFormOpen ? "block" : "none"
                            }}
                        >
                            <FormControl
                                fullWidth
                                style={{padding: "16px 24px", boxSizing: "border-box"}}
                            >
                                <FormLabel>Category title</FormLabel>
                                <Input
                                    size={"small"}
                                    onChange={this.watchCatName}
                                    value={this.state.newCategoryName}
                                />
                                <FormHelperText>Add category and edit later</FormHelperText>
                            </FormControl>
                            <div style={{padding: "8px 24px", boxSizing: "border-box"}}>
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
                            <Divider/>
                        </div>
                        <List color={"primary"}>
                            {this.state.storeCategories.length == 0 ? (
                                <Typography style={{padding: 24}} align={"center"}>
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
        let primaryComponent = (
            <React.Fragment>
                {this.state.selectMainImageDrawerOpen ?
                    <ImageSelectionComponent
                        open={this.state.selectMainImageDrawerOpen}
                        selectSingle={this.selectMainImage}
                        closeingDrawer={this.closeingMainImageDrawer}/> : ""}
                {this.state.categoryDialogOpen ? categorySelector : null}
                <Grid container spacing={24} style={{background:"rgba(0,0,0,.5)"}}>
                    <Grid item sm={12} xs={12} md={6}>
                            <Paper  style={{padding: 24}} elevation={1}>
                                <FormControl fullWidth className={classes.rootFormControls}>
                                    <FormLabel> Produc title</FormLabel>
                                    <Input
                                        value={product.title}
                                        onChange={this.watchInput("title")}
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.rootFormControls}>
                                    <FormLabel>Product caption</FormLabel>
                                    <Input
                                        value={product.caption}
                                        onChange={this.watchInput("caption")}
                                    />
                                </FormControl>
                            </Paper>
                            <Paper style={{display: "flex", justifyContent: "space-between", padding: 24}}
                                   elevation={1} className={classes.ymargin}>
                                <FormControl fullWidth className={classes.rootFormControls}
                                             style={{paddingRight: "16px"}}>
                                    <FormLabel>Product cost Price</FormLabel>
                                    <Input onChange={this.watchInput("costPrice")}
                                           startAdornment={<FaDollarSign/>}
                                           value={product.costPrice}/>
                                </FormControl>
                                <FormControl fullWidth className={classes.rootFormControls}
                                             style={{paddingLeft: "16px"}}>
                                    <FormLabel>Product selling price</FormLabel>
                                    <Input onChange={this.watchInput("sellingPrice")}
                                           startAdornment={<FaDollarSign/>}
                                           value={product.sellingPrice}/>
                                </FormControl>
                            </Paper>
                            <Paper style={{display: "flex", justifyContent: "flex-start", padding: 24}}
                                   elevation={1} className={classes.ymargin}>
                                <FormControl className={classes.rootFormControls} style={{paddingRight: 16}}>
                                    <FormLabel>Product Quantity</FormLabel>
                                    <Input onChange={this.watchInput("count")}
                                           value={product.count}/>
                                </FormControl>
                                <FormControl className={classes.rootFormControls} style={{paddingLeft: 16}}>
                                    <FormLabel>Available</FormLabel>
                                    <Switch checked={this.state.product.available} onChange={(e, checked) => {
                                        this.setState(state => {
                                            state.product.available = checked
                                            return state
                                        })
                                    }}/>
                                </FormControl>
                            </Paper>
                            <Paper style={{height: 300, padding: 24}}
                                   elevation={1}
                                   className={classes.ymargin}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    onChange={(editor, dataw, data) => {
                                        console.log(data)
                                        // this.setState({
                                        // product: {description:data}
                                        // })
                                    }}
                                    style={{height: "100%"}}
                                />
                            </Paper>
                    </Grid>
                    <Grid
                        item
                        sm={12} xs={12} md={6}
                    >
                        <Paper style={{padding: 24}}>
                            <Typography variant={"caption"}>Main Product Image</Typography>
                            <div style={{
                                width: 200, height: 200, background: "white", margin: "8px 0",
                                backgroundImage: 'url(file:///C:/Users/LUBI/Pictures/Screenshots/Screenshot%20(3).png)'
                            }}>
                            </div>
                            <div style={{}}>
                                <IconButton><UploadIcon/></IconButton>
                                <IconButton onClick={this.openSelectMainImageDrawer}><SelectIcon/></IconButton>
                                <IconButton><LinkIcon/></IconButton>
                            </div>
                        </Paper>
                        <Divider/>
                        <Typography className={classes.ymargin}> Core Options</Typography>
                        <Paper className={classes.ymargin} style={{padding: 24}}>
                            <div style={{margin:"16px 0px"}}>
                                <Typography variant={"caption"}>Category</Typography>
                                <Typography>
                                    {this.state.product.category
                                        ? this.state.product.category
                                        : "Select Category"}
                                </Typography>
                            </div>

                            <Button
                                fullWidth
                                variant={"contained"}
                                onClick={this.toggleCategoryDialog}
                            >
                                {" "}
                                Select category
                            </Button>
                        </Paper>
                        <Paper  style={{padding: 24}} className={classes.ymargin}>
                            <div className={classes.ymargin}>
                                {this.state.product.tags.map(v => (<Chip label={v} style={{margin: "8"}}/>))}
                            </div>
                            <FormControl fullWidth>
                                <InputBase
                                    multiline
                                    style={{background: "white", padding: "16px"}}
                                    onChange={this.watchTags}
                                />
                                <FormHelperText>
                                    Enter product tags and seperate with spaces
                                </FormHelperText>
                            </FormControl>
                        </Paper>

                    </Grid>
                </Grid>
            </React.Fragment>
        );

        let visualComponent = (
            <React.Fragment>
                {this.state.selectGalleryItemDrawer ?
                    <ImageSelectionComponent
                        open={this.state.selectGalleryItemDrawer}
                        selectSingle={this.selectSingleGalleryItem}
                        closeingDrawer={this.closeingGalleryImageDrawer}/> : null}
                <Grid container className={classes.primarySpacing} spacing={12}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"}>Gallery</Typography>
                        <Grid container spacing={8}>
                            {this.state.product.gallery.map((url, index) => (
                                <Grid item >
                                    <ButtonBase onClick={this.openGalleryItemDrawer(index)} style={{width: "200px", height: "200px", background: "red"}}></ButtonBase>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h6"}>Video </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <PageAppBar nospacing>
                    <Tabs
                        style={{padding: 0}}
                        variant={"scrollable"}
                        value={this.state.currentTab}
                        onChange={this.tabChange}
                    >
                        <Tab label={"Primary"} style={{color: '#404040'}}/>
                        <Tab
                            label={"Visuals"}
                            style={{color: '#404040'}}
                        />
                        <Tab label={"Advanced"} style={{color: '#404040'}}/>
                    </Tabs>
                    <div>
                        <Button
                            variant={"contained"}
                            onClick={this.state.isNewProduct ? this.save : this.updateProduct}>{this.state.isNewProduct ? "Save" : "Update"}</Button>
                    </div>
                </PageAppBar>
                <Grid container style={{padding: "12px 12px"}} justify={"center"}>
                    <Grid item xs={12}  sm={10} md={12} >
                    {this.state.currentTab == 0 && primaryComponent}
                    {this.state.currentTab == 1 && visualComponent}
                    </Grid>
                </Grid>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Product);
