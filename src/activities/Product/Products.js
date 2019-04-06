import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AppContext from "../../AppContext"
import {Checkbox, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import axios from 'axios';

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
  state = {
    selectedProducts: [],
    products: [
      {
        title: "product title",
        category: "product category",
        price: "100$",
        count: "20",
        varients: "10",
        checked: false
      }
    ]
  };
  selectAll = (event, checked) => {
    if (checked) {
      this.setState(state => {
        state.products.forEach(v => {
          v.checked = true;
        });
        return state;
      });
    } else {
      this.setState(state => {
        state.products.forEach(v => {
          v.checked = false;
        });
        return state;
      });
    }
  };

  selectSingle = itemKey => {
    return event => {
      this.setState(state => {
        let currentState = state.products[itemKey].checked;
        state.products[itemKey].checked = !currentState;
        return state;
      });
    };
  };

  componentWillMount(){
    axios.get(`http://localhost:5000/api/store/${this.context.user.store._id}/product`, {
      headers:{
        "X-auth-license": this.context.user.token
      }
    }).then(v=>{
      let products= v.data.items
      this.setState({products: products})
    }).catch(v=> console.log(v))
  }
  static contextType= AppContext

  render() {
    let { classes } = this.props;
    let selectedProductOptionToolBar = (
      <React.Fragment>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant={"subheading1"}>Products</Typography>
          <div>
            <Button variant={"flat"}>Delete</Button>
            <Button variant={"flat"}> Edit</Button>
          </div>
        </Toolbar>
      </React.Fragment>
    );
    let defaultToolbar = (
      <React.Fragment>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "blue"
          }}
        />
      </React.Fragment>
    );

    let productsAvailable = (
      <React.Fragment>
        <div style={{ overflow: "hidden", background:"ghostwhite" }} >
          {this.state.products.some(v => v.checked)
            ? selectedProductOptionToolBar
            : defaultToolbar}
          <Table style={{ padding: 16, overflowX: "scroll", minWidth: 300 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox onChange={this.selectAll} />
                </TableCell>
                <TableCell>title</TableCell>
                <TableCell>category</TableCell>
                <TableCell>price</TableCell>
                <TableCell>Product option</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products.map((v, i) => (
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={v.checked}
                      onChange={this.selectSingle(i)}
                    />
                  </TableCell>
                  <TableCell>{v.title}</TableCell>
                  <TableCell>{v.category}</TableCell>
                  <TableCell>{v.price}</TableCell>
                  <TableCell>{v.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </React.Fragment>
    );
    let productsNotAvailable = (
      <div>
        <Typography>
          You dont have any products yet, click the button above to add some.
        </Typography>
      </div>
    );
    return (
      <React.Fragment>
        <div style={{ padding: "16px 24px" }}>
          {this.state.products.length == 0
            ? productsNotAvailable
            : productsAvailable}
        </div>
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
  handleCreateButttonOpen = event => {
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
                  <div style={{ display: "flex" }}>
                    <Button
                      variant={"contained"}
                      size={"medium"}
                      style={{ marginLeft: 8, marginRight: 8 }}
                      to={"/products/product"}
                      component={Link}
                    >
                      Add product
                    </Button>
                    <Button
                      variant={"contained"}
                      size={"medium"}
                      style={{ marginLeft: 8, marginRight: 8 }}
                      component={Link}
                      to={"/categories/category"}
                    >
                      Create category
                    </Button>
                  </div>
                </PageAppBar>
                <div style={{ padding: "8px 8px" }}>
                  <TableProductsView />
                </div>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(Products)
