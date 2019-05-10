import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  ButtonBase,
  Grid,
  Tab, Divider,
  Tabs, IconButton, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, Avatar
} from "@material-ui/core";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import {CloudUpload as UploadIcon, Link as LinkIcon, MoreHoriz, SelectAll as SelectIcon} from "@material-ui/icons";
import axios from "axios";
import AppContext from "../../AppContext";
import DataSource from "../../DataSource"
import {Link} from "react-router-dom";
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
          spacing={12}>
            <Grid item>
              <div style={{height: 150, width:150, background: "ghostwhite"}}></div>
            </Grid>
            <Grid item>
              <Typography>Customer name</Typography>
              <Typography variant={"h6"}>{props.firstName} {props.lastName}</Typography>
            </Grid>
          </Grid>
      </React.Fragment>
  )
}

function CustomerTransactions(){

  return  (
      <Grid item xs={8}>
        <div style={{ overflow: "hidden", background:"ghostwhite" }} >
          <Table style={{ padding: 16, overflowX: "scroll", minWidth: 300 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Items</TableCell>
                <TableCell> Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            </TableBody>
          </Table>
        </div>
      </Grid>
  )
}

function CustomerPrimary(){
  return (
      <Grid item xs={8}>
          <Typography>Custoqqqmer</Typography>
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
    currentTab: 0,
    categoryDialogOpen: false,
    customer: {
      customer: undefined,
    },
    user:{

    }
  };

  tabChange = (e, v) => {
    this.setState({ currentTab: v });
  };

  componentWillMount() {
    this.dataSource= new DataSource(this.context.user.token, this.context.user.store)
  }
  loadCustomer = async (customerId) => {
    let customer;
      customer = await axios.get(`http://localhost:5000/api/store/${this.context.user.store._id}/customer/${customerId}`)
    if(!customer){
      return
    }
    return customer
  }
  componentDidMount() {
    let {match: {params}} = this.props
    if (params.customer == "new") {
      this.setState({isNewCustomer: true})
    } else {
      this.setState({isNewCustomer: false})
      this.loadCustomer(params.customer).then(v => {
        axios.get(`http://localhost:5000/api/user/${v.data.customer}`).then(v2=>{
          console.log(v2)
          console.log(v)
          this.setState({user: v2.data, customer: v.data})
        })
      })
    }
  }
  save =async  ()=>{

    let customer= await this.dataSource.postStoreCustomer(this.state.customer)
    console.log(customer.data)

}
  render() {
    let { classes } = this.props;
    let {user}= this.state
    return (
      <React.Fragment>
        <CustomerPrimaryDetails firstName={user.firstName} lastName={user.lastName} profilePic={user.profilePic} classes={classes}/>

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
          {this.state.currentTab== 1 &&  <CustomerTransactions/> }
          {this.state.currentTab== 2 &&  <CustomerLocation/> }
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Customer);
