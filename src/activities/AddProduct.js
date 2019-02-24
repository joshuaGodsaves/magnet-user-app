import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import {
    Button,
    Card,
    CardContent,
    Grid,
    Toolbar,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Divider,
    Input,
    IconButton,
    FormControl,
    OutlinedInput,
    FilledInput,
    InputLabel,
    FormHelperText,
    InputAdornment,
    Chip
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DeleteIcon from "@material-ui/icons/Delete"
import ArrowDropDown from "@material-ui/icons/ArrowDownward"
let styles = {
    root: {},
    productRoot: {
        background: "ghostwhite",
        padding: "16px 16px;"
    },
    detailsBox: {
        padding: "8px 16px",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        justifyItems: "space-between",
        alignContent: "center",
        alignItems: "center",
        boxSizing: "border-box"
    },
    rootToolBar: {
        background: "lightblue",
        display: "flex",
        width: "100%",
        justifyContent: 'space-between',
        justifyItems: "space-between",
        alignItems: "center"
    },
    imageBox: {},
    xmargin:{
        marginLeft:"16px",
        marginRight:"16px"
    }
}

class AddProduct  extends React.Component {
    constructor(props){
        super(props)
    }
    state = {
        newProduct: {
            productTitle: undefined,
            productDescription: undefined,
            productMainImage: undefined,
            productGallery: [],
            productCostPrice: undefined,
            productSellingPrice: undefined,
            productCategory: undefined,
            productTags: [],
            productStatus: undefined,
            productCount: undefined
        }
    }
    handleCategorySelect = (event) => {
        this.setState((state) => {
            state.newProduct.productCategory = event.target.value
            return state
        })
    }
    handleStatusSelect = (event) => {
        this.setState((state) => {
            state.newProduct.productStatus = event.target.value
            return state
        })
    }
    handleVarientAdd= ()=>{

    }
    handleVarientDelete= ()=>{

    }
    handleAddTag = () => {
        this.setState((state)=>{
            let temp= window.document.getElementById("tagInputText").value
            let tagText= temp? temp: undefined
            if(tagText){
                state.newProduct.productTags.push(tagText)
            }else{
                //alert
            }
            return state
        })
    }
    handleNewTagTextInput= (event)=>{
        this.setState({curretnTagText: event.target.value})
    }
    handleAddedTagDelete= (key)=>{
        return  (e)=>{
            this.setState(state=>{
                
                let tags= state.newProduct.productTags
                let newTags= tags.filter((v,i)=>{
                    if(i !== key){
                        return true
                    }
                    return false
                })
                state.newProduct.productTags= newTags
                return state
            })
        }
    }

    handleAddProduct= (event)=>{
    console.log(this.state.newProduct)
    }
    configureInputWatchForProductProps= (property)=>{
        return (event)=>{
            event.persist()
            this.setState((state)=>{
                state.newProduct[property]= event.target.value
                return state
            })
        }
    }
    render(){
        let {classes}= this.props
        return (
            <React.Fragment>
                
                <Grid container spacing={16} justify={"space-between"} style={{margin:"16px 0px"}}>
                    <Grid xs={12}><Typography className={classes.xmargin}>New product form</Typography></Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor={"product-title-input"}>
                                Product title
                            </InputLabel>
                            <FilledInput id={"product-title-input"} multiline={true} onChange={this.configureInputWatchForProductProps("productTitle")}/>
                            <FormHelperText>Use unique product title</FormHelperText>
                        </FormControl>
                        <div style={{margin: "16px 0px"}}>
                            <FormControl style={{width: "50%"}}>
                                <InputLabel htmlFor="adornment-amount">Cost price</InputLabel>
                                <Input
                                    id="adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    onChange={this.configureInputWatchForProductProps("productCostPrice")}
                                />
                            </FormControl>
                            <FormControl style={{width: "50%"}}>
                                <InputLabel htmlFor="adornment-amount">Selling price</InputLabel>
                                <Input
                                    id="adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    onChange={this.configureInputWatchForProductProps("productSellingPrice")}
                                />
                            </FormControl>

                        </div>
                        <div style={{margin: "16px 0px"}}>
                            <div style={{width: 200, height: 200, background: 'ghostwhite'}}>
                            <Typography>IMAGE</Typography>
                            </div>
                        </div>

                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor={"description-input"}>
                                Product description
                            </InputLabel>
                            <FilledInput id={"description-input"} multiline={true} onChange={this.configureInputWatchForProductProps("productDescription")}/>
                            <FormHelperText></FormHelperText>
                        </FormControl>
                        <div style={{margin: "16px 0px", display:"flex", alignContent:"center", justifyContent:"space-between"}}>
                            <FormControl fullWidth>
                                <InputLabel>Number of products</InputLabel>
                                <FilledInput name={"productCount"} onChange={this.configureInputWatchForProductProps("productCount")}/>
                            </FormControl>
                        </div>
                        <div style={{display: "flex"}}>
                        <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="filled-status-simple"> Product status </InputLabel>
                                <Select 
                                    value={this.state.newProduct.productStatus}
                                    input={<FilledInput name="category" id="filled-status-simple"
                                                        value={this.state.newProduct.productStatus}/>}
                                    onChange={this.handleStatusSelect}
                                >
                                    <MenuItem value={"public"}>Visible to public</MenuItem>
                                    <MenuItem value={"subscribers"}>Visible to subscribers</MenuItem>
                                    <MenuItem value={"private"}>Private</MenuItem>
                                </Select>
                                <FormHelperText>Useful for categorization</FormHelperText>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item lg={5} md={5} sm={6} xs={12}  >
                        <div style={{display: "flex"}}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="filled-age-simple"> Category </InputLabel>
                                <Select 
                                    value={this.state.newProduct.productCategory}
                                    input={<FilledInput name="category" id="filled-age-simple"
                                                        value={this.state.newProduct.productCategory}/>}
                                    onChange={this.handleCategorySelect}
                                >
                                    <MenuItem value="all">
                                        <em>All</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                <FormHelperText>Useful for categorization</FormHelperText>
                            </FormControl>
                        </div>
                        <div style={{display: "flex", alignItems: "flex-end", alignContent: "flex-send", margin:"16px 0px"}}>
                            <FormControl fullWidth>
                                <InputLabel>New tag</InputLabel>
                                <Input name={"newTagInput"} id={"tagInputText"}/>
                            </FormControl>
                            <Button style={{margin: "0px 16px", marginRight:"0px"}} onClick={this.handleAddTag}>Add</Button>
                        </div>
                        <div style={{margin:"16px 0px"}}>
                            {this.state.newProduct.productTags
                                .map((val,key) => (<Chip clickable  style={{margin:"4px"}} label={val} 
                                onDelete={this.handleAddedTagDelete(key)} deleteIcon={<DeleteIcon/>}/>))}
                        </div>
                        <div style={{margin:"16px 0px"}}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ArrowDropDown/>}>
                                    <Typography>Product Gallery</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container spacing={8}>
                                        {function(){
                                            let galleryItems=[]
                                            for(let i=0; i<=6; i++){
                                                galleryItems.push(
                                                    <Grid item xs={4} style={{padding:"10%", background:"orange", border:"1px solid black"}}>
                                                    </Grid>
                                                )
                                            }
                                            return galleryItems
                                        }()}
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>

                        <FormControl variant="filled" fullWidth>
                            <InputLabel htmlFor="filled-age-simple" >Varients </InputLabel>
                            <Input/>
                            <FormHelperText>Useful for categorization</FormHelperText>
                        </FormControl>
                        <div style={{margin:"16px 0px"}}>
                            <Button variant={'contained'} onClick={this.handleAddProduct}> Save Product </Button>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(AddProduct)