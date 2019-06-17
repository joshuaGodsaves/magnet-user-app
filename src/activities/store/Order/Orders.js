import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Delete, Edit, MoreHoriz, Refresh} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppContext from "../../AppContext"
import {
  ButtonBase,
  Checkbox,
  Chip, Grid,
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
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import AppToolBar from "../../components/AppToolBar"
import DataSource from "../../DataSource"
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
    this.dataSource= new DataSource(this.context.user.token, this.context.user.store._id)
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
    this.dataSource = new DataSource(this.context.user.token, this.context.user.store._id)
    this.loadTransactions()
  }

  deleteTransaction = () => {
    let {activeTransaction} = this.state
    this.dataSource.deleteStoreTransaction(activeTransaction._id).then(v => {
    })
    this.closeMenu()
    this.loadTransactions()

  }
  static contextType= AppContext

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
        <React.Fragment>
          <AppToolBar>
            <div>
              <IconButton><Delete/></IconButton>
              <IconButton><Edit/></IconButton>
              <IconButton><MdGroup/></IconButton>
              <IconButton><FaMailBulk/></IconButton>
            </div>
            <Typography>Bulk Action</Typography>
          </AppToolBar>
        </React.Fragment>
    );

    let defaultToolbar = (
        <React.Fragment>
          <AppToolBar>
            <Typography>
              Transactions
            </Typography>
            <div style={{display:"flex"}}>
              <div style={{padding:"0px 8px"}}>
                <IconButton>
                  <Refresh/>
                </IconButton>
              </div>
              <div style={{padding:"0px 8px"}}>
                <ButtonBase style={{padding:"12px"}}
                            to={"/customer/new"}
                            component={Link}>
                  <Add/>
                  <Typography color={"inherit"}> CREATE</Typography>
                </ButtonBase>
              </div>
            </div>
          </AppToolBar>
        </React.Fragment>
    );

    let ordersAvailable = (
        <React.Fragment>
          {transactionMenu}
          <Paper style={{overflow: "hidden"}}>
            {this.state.selected.length !== 0
                ? selectedCategoriesOptionToolBar
                : defaultToolbar}
            <div style={{overflow: "hidden", overflowX: "auto"}}>
              <Table style={{ padding: 16, overflowX: "scroll", minWidth: 300 }}>
                <TableHead>
                  <TableRow>
                    <TableCell >
                      <Checkbox onChange={this.selectAll} />
                    </TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>items</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell>total</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orders.map((v, i) => (
                      <TableRow>
                        <TableCell>
                          <Checkbox
                              checked={this.state.selected.some(v2=> v2 == v._id)}
                              onChange={this.selectSingle(v._id)}
                          />
                        </TableCell>
                        <TableCell style={{ }}>
                            <IconButton>
                              <FaUserCircle/>
                            </IconButton>
                          <span>{v.customer}</span>
                        </TableCell>
                        <TableCell>{new Date(v.created+"").getUTCDate()}</TableCell>
                        <TableCell>
                          <Chip label={v.items.length}/>
                        </TableCell>
                        <TableCell align={"center"}>
                          <Chip label={"pending"}/>
                        </TableCell>
                        <TableCell>
                          <Chip label={v.total}/>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={this.openMenu(v)}><MoreHoriz/></IconButton>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
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
class Orders extends React.Component {
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
    return (
        <React.Fragment>
          <PageAppBar>
            <div>
              <Typography variant={"title"}>Sales</Typography>
            </div>
            <div>
              <ButtonBase style={{padding:"12px", color:"black"}}
                          to={"/orders/new-transaction"}
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

export default withStyles(styles)(Orders)
