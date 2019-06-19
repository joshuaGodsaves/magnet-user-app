import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Collections as Group, Delete, Edit, MoreHoriz} from "@material-ui/icons";
import {Link} from "react-router-dom";
import StoreContext from "../StoreContext"
import {FaUserCircle,FaMailBulk} from "react-icons/fa"
import {MdNotifications, MdDelete, MdGroupAdd, MdGroup} from "react-icons/md"
import { Toolbar,
  Avatar,
    Card, CardActions, CardHeader, CardContent, Divider, CardActionArea,
  ButtonBase,
  Checkbox,
  IconButton,
  LinearProgress,
  Menu,
    Grid,
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
import NewCustomer from "../../../components/NewCustomer"

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
    createCustomerDrawer: false,
    anchorEl: undefined,
    loading: true,
    loaded: false,
    selected: [],
    customers: [],
    activeCustomer: undefined,
    addedCustomer: false,
    ui: {
      create: {
        anchorEl: null
      }
    }
  };
  selectAll = (event, checked) => {
    if (checked) {
      this.setState(state => {
        state.selected= state.customers.map(v=> v._id)
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

  loadCustomers(){
    this.dataSource.getStoreCustomers().then(v=>{
      this.setState({loading: false})
      let customers= v.data.items
      customers.forEach(async (v, i , a)=>{
        let customer= v.customer
       let maguser= await this.dataSource.getUser(customer)
        a[i].user= maguser
      })
      this.setState({customers: customers})
    }).catch(v=> {console.log(v); this.setState({loading: false})})

  }

  componentWillMount(){
    this.dataSource= new DataSource(this.context.store.token, this.context.store.id)
    this.loadCustomers()
  }
  static contextType= StoreContext


  openMenu = (customer) => {
    return (event) => {
      this.setState({activeCustomer: customer})
      event.persist()
      this.setState({anchorEl: event.target})
    }
  }

  closeMenu = (event) => {
    event.persist()
    this.setState({anchorEl: null})
  }

  finishNewCustomer= (check)=>{
    if(check){
      this.setState({addedCustomer: true})
    }else{
    }
    this.setState({createCustomerDrawer: false})

  }
  openCreateCustomer= ()=>{
    this.setState({createCustomerDrawer: true})
  }

  render() {
    let { classes } = this.props;

    let {anchorEl, activeCustomer} = this.state

    let customerMenu = (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} id="simple-menu" onClose={this.closeMenu}>
          <MenuItem onClick={this.closeMenu} component={Link}
                    to={`/stores/${this.context.store.id}/customers/${activeCustomer ? activeCustomer._id : "undefined"}`}>View</MenuItem>
          <MenuItem onClick={this.closeMenu}>Delete</MenuItem>
          <MenuItem onClick={this.closeMenu}>Reach</MenuItem>
        </Menu>
    )

    let selectedCategoriesOptionToolBar = (
        <React.Fragment>
          <Toolbar>
            <div>
              <IconButton><Delete/></IconButton>
              <IconButton><Edit/></IconButton>
              <IconButton><MdGroup/></IconButton>
              <IconButton><FaMailBulk/></IconButton>
            </div>
            <Typography>Bulk Action</Typography>

          </Toolbar>
        </React.Fragment>
    );

    let defaultToolbar = (
        <React.Fragment>
          <PageAppBar>
            <div>
              <Typography variant={"title"}>Customers</Typography>
            </div>
            <div>
              <ButtonBase style={{padding:"12px", color:"black"}} onClick={this.openCreateCustomer}>
                <Add/>
                <Typography color={""}> CREATE</Typography>
              </ButtonBase>
            </div>
          </PageAppBar>
        </React.Fragment>
    );

    let customersAvailable = (
        <React.Fragment>
            <Paper style={{overflow:"hidden"}}>
            {this.state.selected.length !== 0
                ? selectedCategoriesOptionToolBar
                : defaultToolbar}
            </Paper>
          {/*<Checkbox onChange={this.selectAll} />*/}
                <Grid container style={{margin:"24px 0"}} spacing={16} justify={"flex-start"}>
                  {this.state.customers.map((customer, i) => (
                  <Grid item>
                    <Card style={{width:230, background:"ghostwhite", minHeight:100}}>
                      <Grid container justify={"space-between"}   alignContent={"center"}  alignItems={"center"}>
                          <Checkbox
                              checked={this.state.selected.some(v2 => v2 == customer._id)}
                              onChange={this.selectSingle(customer._id)}
                          />
                          <IconButton>
                            <MdNotifications  style={{fontSize:"inherit"}}/>
                          </IconButton>
                          <IconButton onClick={this.openMenu(customer)}><MoreHoriz/></IconButton>
                      </Grid>
                      <Divider/>
                      <CardActionArea>
                        <Grid container justify={"space-around"} style={{padding:16, fontSize:24}} alignContent={"center"}>
                          <FaUserCircle style={{fontSize:"inherit"}}/> <Typography>{customer.customer}</Typography>
                        </Grid>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  ))}
                </Grid>
        </React.Fragment>
    );

    let customersNotAvailable = (
        <div>
          <Typography>
            You dont have any customers yet, click the button above to add some.
          </Typography>
        </div>
    );

    return (
        <React.Fragment>
          {customerMenu}
          {this.state.createCustomerDrawer? <NewCustomer open= {this.state.createCustomerDrawer} onFinish={this.finishNewCustomer}/>: null}

          {this.state.loading? <LinearProgress/> :
              <div>
            {this.state.customers.length == 0
                ? customersNotAvailable
                : customersAvailable}
          </div>
          }
        </React.Fragment>
    );
  }
}

let WithStylesTableProductsView = withStyles(styles)(TableProductsView);

export default withStyles(styles)(TableProductsView)
