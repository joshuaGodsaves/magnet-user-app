import React, {Component} from "react";
import AppMenu from "./components/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, IconButton, MenuItem, Menu} from "@material-ui/core";
import CategoryIndexPage from "./activities/Category/Index";
import ProductIndexPage from "./activities/Product/Index";
import CustomersIndexPage from "./activities/Customer/Index";
import StoreIndexPage from "./activities/Index/Index";
import ServiceIndexPage from "./activities/Service/Index";
import OrderIndexPage from "./activities/Order/Index";
import More from "@material-ui/icons/MoreVert"
import BlogIndexPage from "./activities/Blog/Index";
import withStyles from "@material-ui/core/styles/withStyles";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NotificationIcon from "@material-ui/icons/Notifications";
import AppContext from "./AppContext";
import Drawer from "@material-ui/core/Drawer";
import {Menu as MenuIcon} from "@material-ui/icons";
import SignupLogin from "./SignupSignin"

let drawerWidth = 220;
let styles = theme => ({
  contentContainer: {
    paddingTop: 0,
    borderTop: "5px solid blue",
    position: "absolute",
    top: 0,
    left: 0
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  mainArea: {
    flexGrow: 1
  },
  drawerPaper: {
    width: drawerWidth,
    background: "ghostwhite"
  },
  drawerOut: {
    width: 0
  }
});


class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    anchoEl: null,
    appBar: {
      height: undefined
    },
    drawerOpen: true,
    user: {
      token: undefined,
      userName: undefined,
      loggedIn: false,
      store: undefined
    }
  };
  static contextType = AppContext;

  logOutUser= ()=>{
    window.localStorage.setItem(
        "user",
        JSON.stringify({
          userName: undefined,
          userToken:undefined,
          store: undefined
        })
    );
    this.setState(state=>{
      state.user= {
        userName: undefined,
        token: undefined,
        loggedIn: false,
        store:false
      }
      return state
    });
  }
  loggedInUser = (userName, token, store) => {
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        userName: userName,
        userToken: token,
        store: store
      })
    );

    this.setState(state=>{
      state.user= {
        userName: userName,
        token: token,
        loggedIn: true,
        store: store
      }
      return state
    });
  };

  checkIfUserIsLoggedInAndLogin = () => {
    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user && user.userName) {
      //use is loggedIn, authomatically log in user with details.
      this.loggedInUser(user.userName, user.userToken, user.store)
      return;
    }
    return false
  };

  componentWillMount() {
    this.checkIfUserIsLoggedInAndLogin();
  }

  toggleDrawer = () => {
    this.setState(state => {
      state.drawerOpen = !state.drawerOpen;
      return state;
    });
  };

  componentDidMount() {
    let getWidth = () => {
      let clientWidth = document.body.clientWidth;
      if (clientWidth <= 750) {
        this.setState({ drawerOpen: false });
      } else {
        this.setState({ drawerOpen: true });
      }
    };
    getWidth();
    window.addEventListener("resize", () => {
      getWidth();
    });
  }

  handleMenuDropDown= (e)=>{
    e.persist()
    this.setState({ anchorEl: e.currentTarget });
  }
  handleCloseDropDown = event => {
    this.setState({ anchorEl: null });
  };

  handleLogout= e=>{
    this.logOutUser()
    this.handleCloseDropDown()
  }
  handleProfile= e=>{
    this.handleCloseDropDown()
  }
  render() {
    let { classes } = this.props;

    let {anchorEl} = this.state

    let menuItems=(
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleCloseDropDown}
        style={{zIndex:50000}}
        >
      <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
      <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
    </Menu>
  )
    let mainApp = (
      <React.Fragment>
        <AppBar
            elevation={0}
            color={"primary"}
            position={"fixed"}
            style={{
              zIndex: 4000,
              width: this.state.drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
              marginLeft:this.state.drawerOpen ? drawerWidth : 0,
              display: "flex",
              justifyContent: "space-between"
            }}
        >
          <Toolbar
              style={{ justifyContent: "space-between" , color:"white"}}
          >

            <IconButton onClick={this.toggleDrawer} color={"inherit"}>
              <MenuIcon />
            </IconButton>
            <div>
            <IconButton onClick={this.handleMenuDropDown}>
              <More aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}/>
            </IconButton>
              {menuItems}
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ display: "flex", width: "100%" , flexWrap:"nowrap"}}>
          <div
            className={
              this.state.drawerOpen ? classes.drawer : classes.drawerOut
            }
          >
            <Drawer
              variant={"persistent"}
              open={this.state.drawerOpen}
              classes={{
                paper: this.state.drawerOpen
                  ? classes.drawerPaper
                  : classes.drawerOut
              }}
            >
              <AppMenu />
            </Drawer>
          </div>
          <div
            style={{ width: "100%", marginTop: 64 }}
            className={classes.mainArea}
          >
            <Switch>
              <Route path={"/"} exact component={StoreIndexPage} />
              <Route path={"/categories"} component={CategoryIndexPage} />
              <Route path={"/products"} component={ProductIndexPage} />
              <Route path={"/customers/"} component={CustomersIndexPage} />
              <Route path={"/services/"} component={ServiceIndexPage} />
              <Route path={"/blog/"} component={BlogIndexPage} />
              <Route path={"/orders/"} component={OrderIndexPage} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
    return (
      <BrowserRouter>
        <React.Fragment>
            <AppContext.Provider value={{user:this.state.user}}>
              {this.state.user.loggedIn ? (
                mainApp
              ) : (
                  <SignupLogin loggedInUser={this.loggedInUser}/>
              )}
            </AppContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);


