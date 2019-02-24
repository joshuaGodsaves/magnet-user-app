import React from 'react';
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    IconButton,
    FormControl,
    OutlinedInput,
    FilledInput,
    InputLabel,
    FormHelperText,
    InputAdornment,
    Chip,
    Menu,
    FormGroup
} from "@material-ui/core";
import RightArrow from "@material-ui/icons/ArrowRight"
import Plus from "@material-ui/icons/Add"
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/es/Paper";
import FormLabel from "@material-ui/core/es/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DeleteIcon from "@material-ui/icons/Delete"
import ArrowDownIcon from "@material-ui/icons/ArrowDownward"
import deepOrange from "@material-ui/core/es/colors/deepOrange";
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/es/Radio";


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
}

class Product extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {}

    handleCloseEdit = () => {
        this.setState({openEdit: false})
    }
    handleOpenEdit = () => {
        this.setState({openEdit: true})
    }

    render() {
        const {classes} = this.props
        //let edit = this.state.openEdit ?( <EditDialog/> ) : undefined;
        let component = (
            <Grid container xl={3} lg={4} md={4} sm={6} xs={12} className={classes.productRoot}>
                <Dialog open={this.state.openEdit} onClose={this.handleCloseEdit} maxWidth={"md"} fullWidth={true}>
                    <DialogTitle/>
                    <DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseEdit}>Close</Button>
                        <Button></Button>
                    </DialogActions>
                </Dialog>
                <Grid item md={12} md={12} sm={12} xs={12} className={classes.imageBox}>
                    <Paper style={{width: "100%", overflow: "hidden"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                            <img src={"http://localhost:3000/resource/shirts.jpg"} style={{width: "100%"}}/>
                        </div>
                        <Divider/>
                        <div className={classes.detailsBox} onClick={this.handleOpenEdit}>
                            <Typography paragraph style={{padding: "0px", margin: "0px", lineHeight: "0px"}}>Product
                                name</Typography>
                            <IconButton>
                                <RightArrow/>
                            </IconButton>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        )

        return component
    }
}

let WithStylesProduct = withStyles(styles)(Product)


class NewProduct extends React.Component {
    constructor(props){
        super(props)
    }
    state = {
        openAdd: true,
        newProduct: {
            productTitle: undefined,
            productDescription: undefined,
            productMainImage: undefined,
            productCostPrice: undefined,
            productSellingPrice: undefined,
            productCategory: undefined,
            tags: [],
        }
    }

    handleInputChange= ()=>{

    }

    handleCategorySelect = (event) => {
        this.setState((state) => {
            state.newProduct.productCategory = event.target.value
            return state
        })
    }
    handleAddTag = () => {
        this.setState((state)=>{
            let temp= window.document.getElementById("tagInputText").value
            let tagText= temp? temp: undefined
            if(tagText){
                state.newProduct.tags.push(tagText)
            }else{
                //alert
            }

            this.state.currentTagText= ""
            return state
        })
    }
    handleNewTagTextInput= (event)=>{
        this.setState({curretnTagText: event.target.value})
    }
    handleAddedTagDelete= ()=>{

    }

    handleAddProduct= (event)=>{

    }

    configureInputWatchForProductProps= (property)=>{
        return function(event){
            alert("started")
            this.setState((state)=>{
                state.newProduct[property]= event.target.value
                console.llog(state.newProduct[property])
                return state
            })
        }
    }

    render(){
        let {classes}= this.props
        return (
            <React.Fragment>
                <Grid container spacing={16} justify={"space-between"}>
                    <Grid item lg={6} md={6} sm={12} xm={12} className={classes.xmargin}>
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
                                />
                            </FormControl>
                            <FormControl style={{width: "50%"}}>
                                <InputLabel htmlFor="adornment-amount">Selling price</InputLabel>
                                <Input
                                    id="adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </FormControl>

                        </div>
                        <div style={{margin: "16px 0px"}}>
                            <div style={{width: 200, height: 200, background: 'ghostwhite'}}>
                            </div>
                        </div>

                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor={"title-input"}>
                                Product description
                            </InputLabel>
                            <FilledInput id={"title-input"} multiline={true}/>
                            <FormHelperText></FormHelperText>
                        </FormControl>
                        <div style={{margin: "16px 0px", display:"flex", alignContent:"center"}}>
                            <FormControl>
                                <InputLabel>Number of products</InputLabel>
                                <FilledInput name={"productCount"}/>
                            </FormControl>
                        </div>
                        <FormGroup>
                            <RadioGroup row>
                                <FormControlLabel
                                    value="bottom"
                                    control={<Radio color="primary" />}
                                    label="Bottom"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="bottom"
                                    control={<Radio color="primary" />}
                                    label="Bottom"
                                    labelPlacement="bottom"
                                />

                            </RadioGroup>
                        </FormGroup>
                    </Grid>
                    <Grid item lg={5} md={5} sm={12} xm={12} className={classes.xmargin} >
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
                            {this.state.newProduct.tags
                                .map((val) => (<Chip clickable  style={{margin:"4px"}} label={val} onDelete={this.handleAddedTagDelete} deleteIcon={<DeleteIcon/>}/>))}
                        </div>

                        <div style={{margin:"16px 0px"}}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ArrowDownIcon/>}>
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
                            <InputLabel htmlFor="filled-age-simple"> Varients </InputLabel>
                            <Input/>
                            <FormHelperText>Useful for categorization</FormHelperText>
                        </FormControl>
                        <div style={{margin:"16px 0px"}}>
                            <Button variant={'raised'}> Save Product </Button>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

let WithStylesNewProduct= withStyles(styles)(NewProduct)

class ProductList extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        openAdd: true,
        newProduct: {
            productTitle: undefined,
            productDescription: undefined,
            productMainImage: undefined,
            productCostPrice: undefined,
            productCategory: undefined,
            tags: [],
        }
    }
    handleOpenAdd = () => {
        this.setState({openAdd: true})
    }
    handleCloseAdd = () => {
        this.setState({openAdd: false})
    }

    render() {
        let {classes} = this.props
        let products = []
        for (let i = 0; i < 20; i++) {
            products.push(<WithStylesProduct/>)
        }
        return (
            <React.Fragment>
                <Dialog open={this.state.openAdd} onClose={this.handleCloseAdd} maxWidth={"md"} fullWidth={true}>
                    <DialogTitle>
                        <Typography variant={"title"}>
                            Add new product
                        </Typography>
                        <Divider/>
                    </DialogTitle>
                    <DialogContent>
                        <WithStylesNewProduct/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseAdd}>Close</Button>
                        <Button></Button>
                    </DialogActions>
                </Dialog>
                <Toolbar className={classes.rootToolBar}>
                    <div>
                        <Typography variant={"h4"}>Product</Typography>
                    </div>
                    <div>
                    </div>
                    <div>
                        <IconButton color={"primary"} onClick={this.handleOpenAdd}>
                            <Plus/>
                        </IconButton>
                    </div>
                </Toolbar>
                <Grid container alignItems={"stretch"} justify={"center"}>
                    {products}
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ProductList)