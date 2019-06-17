import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Delete, Edit, MoreHoriz} from "@material-ui/icons";
import {Link} from "react-router-dom";
import AppContext from "../../AppContext"
import {
  Avatar,
  ButtonBase,
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
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import AppToolBar from "../../components/AppToolBar"
import DataSource from "../../DataSource"
import {MdGroup, MdCollections, MdRefresh} from "react-icons/md";
import {GiMeepleGroup} from "react-icons/gi"
import {FaMailBulk, FaProductHunt} from "react-icons/fa";

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

    this.dataSource = new DataSource(this.context.user.token, this.context.user.store._id)

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
                    component={Link} to={`/products/${activeProduct ? activeProduct._id : undefined}`}>View</MenuItem>
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
        <AppToolBar>
          <Grid container alignContent={"center"} alignItems={"center"}>
            <Typography>
              Products
            </Typography>
            <IconButton>
              <MdRefresh/>
            </IconButton>

          </Grid>
            <div style={{display:"flex"}}>
              <div style={{padding:"0px 8px"}}>
                <ButtonBase style={{padding:"12px"}}
                            to={"/products/product"}
                            component={Link}>
                  <Add/>
                  <Typography color={"inherit"}> CREATE</Typography>
                </ButtonBase>
                </div>
            </div>
        </AppToolBar>
      </React.Fragment>
    );

    let productsAvailable = (
      <React.Fragment>
        {productMenu}
        <Paper style={{ overflow: "hidden", background:"ghostwhite" }} >
          {this.state.selected.length !== 0
            ? selectedProductOptionToolBar
            : defaultToolbar}
          <div style={{overflow: "hidden:", overflowX: "auto"}}>
            <Table style={{padding: 16, overflowX: "scroll", minWidth: 300}}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox onChange={this.selectAll}/>
                  </TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>title</TableCell>
                  <TableCell>category</TableCell>
                  <TableCell>price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.products.map((product, i) => (
                    <TableRow>
                      <TableCell>
                        <Checkbox
                            checked={this.state.selected.some(v2 => v2 == product._id)}
                            onChange={this.selectSingle(product._id)}
                        />
                      </TableCell>
                      <TableCell>{new Date(product.created + "").getUTCDate()}</TableCell>
                      <TableCell>
                        <IconButton>
                          <FaProductHunt/>
                        </IconButton>
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>
                        <div>
                          <Chip label={product.categories[0]}/>
                        </div>
                      </TableCell>
                      <TableCell>{product.sellingPrice}</TableCell>
                      <TableCell><IconButton onClick={this.openMenu(product)}><MoreHoriz/></IconButton></TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
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
class Products extends React.Component {
  state = {
    ui: {
      create: {
        anchorEl: null
      }
    }
  };
  handleCreateButtonOpen = event => {
    event.persist();
    this.setState(state => {
      state.ui.create.anchorEl = event.currentTarget;
      return state;
    });
  };
  handleCreateButtonClose = () => {
    this.setState(state => {
      state.ui.create.anchorEl = null;
      return state;
    });
  };

  static contextType= AppContext
  render() {
    let anchorEl = this.state.ui.create.anchorEl;
    let open = Boolean(anchorEl);
    let { classes, theme } = this.props;
    console.log("from products")
    console.log( this.context)
    return (
      <React.Fragment>
                <PageAppBar>
                  <div>
                    <Typography variant={"title"}> Products</Typography>
                  </div>
                  <div>
                    <ButtonBase style={{padding:"12px", color:"black"}}
                                to={"/products/new"}
                                component={Link}>
                      <Add/>
                      <Typography color={""}> CREATE</Typography>
                    </ButtonBase>
                  </div>
                </PageAppBar>
                <div style={{ padding:"24px 24px" }}>
                  <TableProductsView />
                </div>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(Products)
