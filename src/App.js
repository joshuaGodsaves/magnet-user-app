import React, { Component } from "react";
import AppMenu from "./components/Menu";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {
  AppBar,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  Input,
  Paper
} from "@material-ui/core";
import CategoryIndexPage from "./activities/Category/Index";
import ProductIndexPage from "./activities/Product/Index";
import AssetsIndexPage from "./activities/Asset/Index";
import StoreIndexPage from "./activities/Index/Index";
import ServiceIndexPage from "./activities/Service/Index";
import OrderIndexPage from "./activities/Order/Index";
import BlogIndexPage from "./activities/Blog/Index";
import withStyles from "@material-ui/core/styles/withStyles";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import NotificationIcon from "@material-ui/icons/Notifications";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/es/Button";
import AppContext from "./AppContext";
import Drawer from "@material-ui/core/Drawer";
import axios from "axios";
import { Menu } from "@material-ui/icons";
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
    ProductIndexPage.contextType = App.contextType;
    ServiceIndexPage.contextType = App.contextType;
    CategoryIndexPage.contextType= App.contextType
  }
  state = {
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

  render() {
    let { classes } = this.props;
    let mainApp = (
      <React.Fragment>
        <AppBar
            position={"fixed"}
            style={{
              background: "white",
              zIndex: 4000,
              display: "flex",
              justifyContent: "space-between"
            }}
        >
          <Toolbar
              style={{ justifyContent: "space-between" }}
          >
            <IconButton onClick={this.toggleDrawer}>
              <Menu />
            </IconButton>
            <IconButton>
              <NotificationIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ display: "flex", width: "100%" }}>
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
              <Route path={"/assets/"} component={AssetsIndexPage} />
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
