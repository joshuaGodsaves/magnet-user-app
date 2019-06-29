import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {FaMailBulk, FaProductHunt, FaDollarSign, FaTextWidth} from "react-icons/fa";
import ExternalImages from "../../../components/ExternalImages"
import FileUploader from "../components/FileUpload"
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
import CategoryLite from '../components/CategoryLite'


import  ImageSelectionComponent from "../../../components/ImageSelectionComponent"
import PageAppBar from "../../../components/ActivityPrimaryAppBar"
import StoreContext from "../StoreContext"
import axios from "axios";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {APIURL} from "../../../DataSource";

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
        uploadFile: false,
        externalImages: false,
        updated: false,
        currentSelectedGalleryItem: undefined,
        isNewProduct: false,
        productId: undefined,
        selectMainImageDrawerOpen: false,
        currentTab: 0, editGalleryItemSelectorDialogOpen: false,
        currentGalleryItemEditAction: {
            url: undefined,
            index: undefined
        },
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
        let product = await axios.get(`${APIURL}/store/${this.context.store.id}/product/${productID}`)
        if (product.data) {
            this.setState({product: product.data, mainProductObj: product.data})
            return true
        }
        return false

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

    openExternalImages = ()=>{
        this.setState({externalImages: true})
    }
    closeingMainImageDrawer= ()=>{
        this.setState({selectMainImageDrawerOpen :false})
    }
    closeingGalleryImageDrawer= ()=>{
        this.setState({selectGalleryItemDrawer :false})
    }

    externalAssetSelectFinishProcess = (selected)=>{
        this.setState({externalImages: false})
        let url= selected[0]
    }
    externalAssetSelectCancelProcess = ()=>{
        this.setState({externalImages: false})
    }



    // Category Component functions
    saveCategory= (categories)=>{
        this.setState(state=>{state.product.categories= categories; state.openCategory= false; return state})
    }

    openCategory= ()=>{
        this.setState({openCategory: true})
    }

    componentDidMount() {
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
    render() {
        let {classes} = this.props;
        let {product, openCategory, selectMainImageDrawerOpen} = this.state


        let categoryLite= <CategoryLite open={openCategory}
                                        categories={this.state.product.categories.length? this.state.product.categories: []}
                                        closeCategorySelector={this.saveCategory}/>
        let primaryComponent = (
            <React.Fragment>
                {openCategory? categoryLite : ""}
                {selectMainImageDrawerOpen ?
                    <ImageSelectionComponent
                        open={selectMainImageDrawerOpen}
                        selectSingle={this.selectMainImage}
                        closeingDrawer={this.closeingMainImageDrawer}/> : ""}

                {this.state.externalImages ? <ExternalImages open={this.state.externalImages} finishProcess={this.externalAssetSelectFinishProcess} cancelProcess={this.externalAssetSelectCancelProcess}/> : null}
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
                                           type={"number"}
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

                            <Grid container direction={'column'} justify={"center"} alignItems={"center"}>
                                <Typography variant={"caption"}>Main Product Image</Typography>
                                <Grid style={{
                                    width: 200, height: 200, background: "grey", margin: "8px 0", borderRadius:10,
                                    backgroundImage: 'url(file:///C:/Users/LUBI/Pictures/Screenshots/Screenshot%20(3).png)'
                                }}>
                                </Grid>
                                <Grid item style={{}}>
                                    <FileUploader triggerSelectFile={true} onError={()=>{}} onFinish={this.selectMainImage}/>
                                    <IconButton onClick={()=>{document.getElementById("fileSelectorElement").click()}}>
                                        <UploadIcon>

                                        </UploadIcon>
                                    </IconButton>
                                    <IconButton onClick={this.openSelectMainImageDrawer}><SelectIcon/></IconButton>
                                    <IconButton onClick={this.openExternalImages}><LinkIcon/></IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Divider/>
                        <Typography className={classes.ymargin}> Core Options</Typography>
                        <Paper className={classes.ymargin} style={{padding: 24}}>
                            <div style={{margin:"16px 0px"}}>
                                <Typography variant={"caption"}>Category</Typography>
                                <div>
                                    {product.categories.map(v=> <Chip variant={"outlined"} label={v} style={{margin: 4}}/>)}
                                </div>
                            </div>

                            <Button
                                fullWidth
                                variant={"contained"}
                                onClick={this.openCategory}
                            >
                                {" "}
                                Select category
                            </Button>
                        </Paper>
                        <Paper  style={{padding: 24}} className={classes.ymargin}>
                            <div className={classes.ymargin}>
                                {this.state.product.tags.map(v => (<Chip label={v} style={{margin: 4}}  variant={"outlined"} color={"secondary"}/>))}
                            </div>
                            <FormControl fullWidth>
                                <InputBase
                                    multiline
                                    style={{background: "rgba(1,1,1,.5)", borderRadius:4, padding: "8px"}}
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
