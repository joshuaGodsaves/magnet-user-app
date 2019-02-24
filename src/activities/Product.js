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
import { Switch, Route } from 'react-router-dom';
import { stat } from 'fs';
import { Link } from 'react-router-dom';

import AddProductEx from './AddProduct'


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
                <Grid item  md={12} sm={12} xs={12} className={classes.imageBox}>
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

class ProductList extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        openAdd: true
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
                <Grid container alignItems={"stretch"} justify={"center"}>
                    {products}
                </Grid>
            </React.Fragment>
        )
    }
}
let WithStylesProductList = withStyles(styles)(ProductList)
class Page extends React.Component{
     constructor(props) {
       super(props)
     
       this.state = {
          
       }
     }

     render(){
         let {classes}= this.props
         return (
             <React.Fragment>
                 <Toolbar className={classes.rootToolBar}>
                    <div>
                        <Link to={"/products"}><Typography variant={"h4"}>Product</Typography></Link>
                    </div>
                    <div>
                    </div>
                    <div>
                        
                            <Link to={"/products/new-product"}  >Add Product</Link>
                        
                    </div>
                </Toolbar>

<Switch>
                    <Route path={"/products/"} exact component={WithStylesProductList}/>
                     <Route path={"/products/new-product"} exact component={AddProductEx}/>
                     
                     </Switch>             
                
             </React.Fragment>
         )
     }
     
}

export default withStyles(styles)(Page)