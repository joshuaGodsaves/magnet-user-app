import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Delete, Edit, MoreHoriz, SearchRounded} from "@material-ui/icons";
import {Link} from "react-router-dom";
import AppContext from "../StoreContext"
import {
  Avatar, Toolbar,
  Button,
  Checkbox,
  Chip,
  IconButton,
  InputBase,
    Grid,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import PageAppBar from "../../../components/ActivityPrimaryAppBar";
import AppToolBar from "../../../components/AppToolBar"
import DataSource from "../../../DataSource"

import {MdGroup, MdCollections, MdRefresh} from "react-icons/md";
import {FaMailBulk, FaProductHunt, FaDollarSign} from "react-icons/fa";

import Products from "../Category/Categories";

let styles = {
  ProductItemRoot: {
    padding: 8
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
};

class TableProductsView extends React.Component {
  dataSource;
  constructor(props){
    super(props)

  }
  state = {
    loading: false,
    loaded: false,
    selected: [],
    products: [],
    anchorEl: undefined,
    activeProduct: undefined
  };
  selectAll = (event, checked) => {
    if (checked) {
      this.setState(state => {
        state.selected= state.products.map(v=> v._id)
        return state;
      });
    } else {
      this.setState(state => {
        state.selected= []
        return state;
      });
    }
  };

  selectSingle = itemKey => {
    return (event, checked) => {
      this.setState(state => {
        if(checked){
          //push
          state.selected.push(itemKey)
        }else{
          //Pull out
          state.selected= state.selected.filter(v=> v!=itemKey)
        }
        return state;
      });
    };
  };

  loadProducts = () => {
    this.dataSource.getStoreProducts().then(v=>{
      this.setState({products: v.data.items, loading: false})
    }).catch(v=> console.log(v))
    this.setState({loading: true})
  }

  componentWillMount() {

    this.dataSource = new DataSource(this.context.store.token, this.context.store.id)
    this.loadProducts()
  }

  static contextType= AppContext

  openMenu = (product) => {
    return (event) => {
      this.setState({activeProduct: product})
      event.persist()
      this.setState({anchorEl: event.target, activeProduct: product})
    }
  }

  closeMenu = () => {
    this.setState({anchorEl: null})
  }

  deleteProduct = async () => {
    let {activeProduct} = this.state
    let result = await this.dataSource.deleteStoreProduct(activeProduct._id)
    this.closeMenu()
    this.loadProducts()
  }


  render() {
    let { classes } = this.props;
    let {anchorEl, activeProduct} = this.state
    let productMenu = (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} id="simple-menu" onClose={this.closeMenu}>
          <MenuItem onClick={this.closeMenu}
                    component={Link} to={`/stores/${this.context.store.id}/products/${activeProduct ? activeProduct._id : undefined}`}>View</MenuItem>
          <MenuItem onClick={this.deleteProduct}>Delete</MenuItem>
          <MenuItem>Mute</MenuItem>
        </Menu>
    )
    let selectedProductOptionToolBar = (
      <React.Fragment>
        <AppToolBar>
          <div>
          <IconButton><Delete/></IconButton>
          <IconButton><Edit/></IconButton>
        </div>
        <Typography>Bulk Action</Typography>

      </AppToolBar>
      </React.Fragment>
    );

    let defaultToolbar = (
      <React.Fragment>
          <Grid container alignContent={"center"} alignItems={"center"} justify={"space-between"}>
            <Grid item>
              <Grid container alignItems={"center"}>
                <Typography variant={"h6"}>
                  Products
                </Typography>
              </Grid>
            </Grid>

            <Grid item sm={6}>
              <Paper style={{overflow:"hidden", position:'relative', padding:"0px 0px", background:"rgba(0,0,0,.5)"}} elevation={0}>
                <InputBase style={{ padding:'4px 8px', position:'relative', width:"100%"}}
                startAdornment={<SearchRounded/>}/>
              </Paper>
            </Grid>

            <Grid item>
                <div>
                  <Button to={"/products/product"} component={Link} variant={"contained"} size={"large"}>
                    <Add/>
                    <Typography color={"inherit"}>CREATE</Typography>
                  </Button>
                </div>
            </Grid>
          </Grid>

      </React.Fragment>
    );

    let productsAvailable = (
      <React.Fragment>
          {productMenu}
        <Toolbar style={{marin:"16px 0px"}}>
          {defaultToolbar}
        </Toolbar>
        <Grid container justify={"center"}>
          <Grid item xs={11}>
            {this.state.products.map((product, i) => (
                <Paper style={{margin:"8px 0px", padding:12}} elevation={1}>
                  <Grid container alignItems={"center"} justify={"space-between"}>
                    <Grid item xs={12} md={6}>
                      <Grid container>
                        <Grid item>
                          <Checkbox
                              color={"primary"}
                              checked={this.state.selected.some(v2 => v2 == product._id)}
                              onChange={this.selectSingle(product._id)}
                          />
                        </Grid>
                        <Grid item>
                          <IconButton>
                            <FaProductHunt/>
                          </IconButton>
                          {"product.title product heere"}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container justify={"space-between"} alignItems={"center"}>
                        <Grid>
                          <Chip variant={"outlined"} label={"avail"} color={"primary"}/>
                        </Grid>
                        <Grid item>
                          {new Date().toDateString()}
                        </Grid>
                        <Grid item>
                          <div>
                            <Chip label={product.categories.length} color={"primary"}/>
                          </div>
                        </Grid>
                        <Grid item>
                          <Chip label={product.sellingPrice || "$00.00"} variant={"outlined"} icon={<FaDollarSign/>} color={"primary"}/>
                        </Grid>
                        <Grid item>
                          <IconButton color={"primary"}  onClick={this.openMenu(product)}><MoreHoriz/></IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
                ))}
          </Grid>
        </Grid>
      </React.Fragment>
    );

    let productsNotAvailable = (
      <div>
        <Typography align={"center"}>
          You dont have any products yet, click the button above to add some.
        </Typography>
      </div>
    );

    return (
      <React.Fragment>
        {this.state.loading? <LinearProgress/> :
            <div>
              {this.state.products.length == 0
                  ? productsNotAvailable
                  : productsAvailable}
            </div>
        }
      </React.Fragment>
    );
  }
}
let WithStylesTableProductsView = withStyles(styles)(TableProductsView);

export default withStyles(styles)(TableProductsView)
