import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Delete, Edit, MoreHoriz, Refresh} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {FaProductHunt, FaDollarSign} from "react-icons/fa"
import Button from "@material-ui/core/Button";
import StoreContext from "../StoreContext"
import {
  ButtonBase,
  Checkbox,
  Chip, Grid, Toolbar,
  IconButton,
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
import {MdGroup} from "react-icons/md";
import {FaMailBulk, FaUserCircle} from "react-icons/fa";

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
    anchorEl: undefined,
    loading: true,
    loaded: false,
    selected: [],
    orders: [
    ]
  };
  selectAll = (event, checked) => {
    if (checked) {
      this.setState(state => {
        state.selected= state.orders.map(v=> v._id)
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

  loadTransactions = () => {
    this.dataSource= new DataSource(this.context.token, this.context.store.id)
    this.dataSource.getStoreTransactions().then(v => {
      this.setState({loading: false})
      let orders= v.data.items
      this.setState({orders: orders})
    }).catch(v=> { this.setState({loading: false})})
  }

  openMenu = (transaction) => {
    return (event) => {
      this.setState({activeTransaction: transaction})
      event.persist()
      this.setState({anchorEl: event.target})
    }
  }

  closeMenu = (event) => {
    event.persist()
    this.setState({anchorEl: null})
  }


  componentWillMount() {
    this.dataSource = new DataSource(this.context.store.token, this.context.store.id)
    this.loadTransactions()
  }

  deleteTransaction = () => {
    let {activeTransaction} = this.state
    this.dataSource.deleteStoreTransaction(activeTransaction._id).then(v => {
    })
    this.closeMenu()
    this.loadTransactions()

  }
  static contextType= StoreContext

  render() {
    let { classes } = this.props;

    let {anchorEl} = this.state
    let transactionMenu = (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} id="simple-menu" onClose={this.closeMenu}>
          <MenuItem onClick={this.closeMenu}>View</MenuItem>
          <MenuItem onClick={this.deleteTransaction}>Delete</MenuItem>
          <MenuItem onClick={this.closeMenu}>Processing</MenuItem>
          <MenuItem onClick={this.closeMenu}>Cancel</MenuItem>
          <MenuItem onClick={this.closeMenu}>Complete</MenuItem>
        </Menu>
    )


    let selectedCategoriesOptionToolBar = (
        <Paper>
          <Toolbar>
            <div>
              <IconButton><Delete/></IconButton>
              <IconButton><Edit/></IconButton>
              <IconButton><MdGroup/></IconButton>
              <IconButton><FaMailBulk/></IconButton>
            </div>
          </Toolbar>
        </Paper>
    );

    let defaultToolbar = (
        <Paper style={{background:"rgba(0,0,0,.5)"}}>
          <Toolbar style={{ display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <Typography variant={"h6"}>
              Transactions
            </Typography>
            <div>

                <IconButton>
                  <Refresh/>
                </IconButton>
                <Button
                        variant={"contained"}
                            to={`/stores/${this.context.store.id}/orders/new-transaction`}
                            component={Link}>
                  <Add/>
                  CREATE
                </Button>
            </div>
          </Toolbar>
        </Paper>
    );

    let ordersAvailable = (
        <React.Fragment>
          {transactionMenu}
          <div>
            {this.state.selected.length !== 0
                ? selectedCategoriesOptionToolBar
                : defaultToolbar}
            <Grid container>
              <Grid item xs={12}>
                {this.state.orders.map((v, i) => (
                    <Paper style={{margin:"16px 0px"}} elevation={1}>
                      <Grid container alignItems={"center"} justify={"space-between"}>
                        <Grid item md={6}>
                          <Grid container>
                            <Grid item>
                              <Checkbox
                                  checked={this.state.selected.some(v2=> v2 == v._id)}
                                  onChange={this.selectSingle(v._id)}
                              />
                            </Grid>
                            <Grid item>
                              <IconButton>
                                <FaUserCircle/>
                              </IconButton>
                              <span>{v.customer}</span>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={6}>
                          <Grid container justify={"space-between"} alignItems={"center"}>
                            <Grid>
                              <Chip variant={"outlined"} label={"status"} color={"primary"}/>
                            </Grid>
                            <Grid item>
                              {new Date().toDateString()}
                            </Grid>

                            <Grid item>
                              <Chip label={v.items.length} variant={"outlined"} color={"primary"}/>
                            </Grid>
                            <Grid item>
                              <Chip label={v.total} variant={"outlined"} icon={<FaDollarSign/>} color={"primary"}/>
                            </Grid>
                            <Grid item>
                              <IconButton color={"primary"}  onClick={this.openMenu(v)}><MoreHoriz/></IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                ))}
              </Grid>
            </Grid>
          </div>
        </React.Fragment>
    );
    let ordersNotAvailable = (
        <div>
          <Typography>
            You dont have any products yet, click the button above to add some.
          </Typography>
        </div>
    );
    return (
        <React.Fragment>
          {this.state.loading? <LinearProgress/> :
              <div>
                {this.state.orders.length == 0
                    ? ordersNotAvailable
                    : ordersAvailable}
              </div>
          }
        </React.Fragment>
    );
  }
}

let WithStylesTableProductsView = withStyles(styles)(TableProductsView);


export default withStyles(styles)(TableProductsView)
