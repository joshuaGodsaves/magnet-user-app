import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {MoreHoriz} from "@material-ui/icons";
import {
  Chip,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs
} from "@material-ui/core";
import axios from "axios";
import AppContext from "../../AppContext";
import DataSource from "../../DataSource"

let styles = {
  listItem: {

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
  primaryFormArea: {
    padding: "16px 32px"
  },
  rootFormControls: {
    margin: "8px 0"
  },
  flexRow:{
    display:"flex", flexDirection:"column"
  },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    justifyItems: "space-between"
  }
};

function CustomerPrimaryDetails (props){
  return (
      <React.Fragment>
          <Grid container style={{background:"grey", height:"300px",alignItems:"flex-end", padding:"24px 24px"}}
                justify={"center"}
                spacing={12}>
            <Grid item>
              <div style={{height: 150, width: 150, background: "ghostwhite", margin: "0 auto"}}></div>
              <Typography align={"center"}>Customer name</Typography>
              <Typography align={"center"} variant={"h6"}>{props.firstName} {props.lastName}</Typography>
            </Grid>
          </Grid>
      </React.Fragment>
  )
}

class CustomerTransactionsComponent extends React.Component {

  state = {
    anchorEl: undefined

  }

  openMenu = () => {
    return (event) => {
      event.persist()
      this.setState({anchorEl: event.target})
    }
  }

  closeMenu = (event) => {
    event.persist()
    this.setState({anchorEl: null})
  }

  render() {

    let {transactions} = this.props
    let {anchorEl} = this.state
    let menuComponent = (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} id="simple-menu" onClose={this.closeMenu}>
          <MenuItem onClick={this.closeMenu}>View</MenuItem>
          <MenuItem onClick={this.closeMenu}>Delete</MenuItem>
          <MenuItem onClick={this.closeMenu}>Processing</MenuItem>
          <MenuItem onClick={this.closeMenu}>Complete</MenuItem>
        </Menu>
    )
    return (
        <Grid item xs={8}>
          {menuComponent}
          <div style={{overflow: "hidden", background: "ghostwhite"}}>
            <Table style={{padding: 16, overflowX: "scroll", minWidth: 300}}>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell> Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map(v => (
                    <TableRow>
                      <TableCell>{v._id}</TableCell>
                      <TableCell>{v.total}</TableCell>
                      <TableCell><Chip label={v.items.length}/></TableCell>
                      <TableCell> <Chip label={v.pending}/></TableCell>
                      <TableCell><IconButton onClick={this.openMenu()}><MoreHoriz/></IconButton></TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
    )


  }
}

function CustomerPrimary(){
  return (
      <Grid item xs={8} style={{margin: "16px 0"}}>
        <Typography> User Activities</Typography>
      </Grid>
  )
}
function CustomerLocation(){
  return (
      <Grid item xs={8}>
        <Typography>Customer11</Typography>
      </Grid>
  )
}

class Customer extends React.Component {
  static contextType = AppContext;

  state = {
    currentTab: 1,
    categoryDialogOpen: false,
    customer: {
      customer: undefined,
    },
    user:{},
    transactions: []
  };

  tabChange = (e, v) => {
    this.setState({ currentTab: v });
  };

  componentWillMount() {

    this.dataSource= new DataSource(this.context.user.token, this.context.user.store)
    let {match: {params}} = this.props
    if (params.customer == "new") {
      this.setState({isNewCustomer: true})
    } else {
      this.setState({isNewCustomer: false})
      this.loadCustomer(params.customer).then(v => {

        this.setState({user: v.data.customer, customer: v.data.customer})
        this.loadTransactions(v.data.customer)

      })
    }

  }

  loadCustomer = async (customerId) => {
    let customer;
      customer = await axios.get(`http://localhost:5000/api/store/${this.context.user.store._id}/customer/${customerId}`)
    if(!customer){
      return
    }
    return customer
  }

  loadTransactions = (customerName) => {
    this.dataSource = new DataSource(this.context.user.token, this.context.user.store._id)

    this.dataSource.getStoreTransactions({customer: customerName}).then(v => {
      let data = v.data
      console.log("logging data")
      console.log(v)
      let orders = data.items
      this.setState({transactions: orders})
    }).catch(v => {
      this.setState({loading: false})
    })
  }

  componentDidMount() {

  }
  save =async  ()=>{
    let customer= await this.dataSource.postStoreCustomer(this.state.customer)

}
  render() {
    let { classes } = this.props;
    let {user}= this.state
    return (
      <React.Fragment>
        <CustomerPrimaryDetails firstName={"user.firstName"} lastName={"user.lastName"} profilePic={"user.profilePic"}
                                classes={classes}/>

        <Grid container style={{ padding:"24px 24px"}} justify={"center"}>
          <Grid item xs={8}>
            <Tabs
                style={{ padding: 0 }}
                variant={"scrollable"}
                value={this.state.currentTab}
                onChange={this.tabChange}
            >
              <Tab label={"Primary"} style={{ color: "black" }} />
              <Tab label={"Transaction"} style={{ color: "black" }} />
              <Tab label={"Location"} style={{  color: "black" }} />
            </Tabs>
            <Divider/>
          </Grid>
          {this.state.currentTab== 0 &&  <CustomerPrimary/> }
          {this.state.currentTab == 1 && <CustomerTransactionsComponent transactions={this.state.transactions}/>}
          {this.state.currentTab== 2 &&  <CustomerLocation/> }
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Customer);
