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

let drawerWidth = 210;
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

function LogIn(props) {
  let collectUserData = loginUser => {
    return e => {
      let userName = document.getElementById("userName").value;
      let userPassword = document.getElementById("userPassword").value;
      loginUser(userName, userPassword);
    };
  };
  return (
    <React.Fragment>
      <Grid container justifyContent={"center"} justify={"center"}>
        <Grid item style={{ margin: "60px 0" }} xs={"11"} sm={7} md={4}>
          <Paper style={{ padding: "32px 32px" }}>
            <div style={{ margin: "16px 0px" }}>
              <FormControl fullWidth>
                <InputLabel>User name</InputLabel>
                <Input id={"userName"} />
              </FormControl>
            </div>
            <div style={{ margin: "16px 0px" }}>
              <FormControl fullWidth>
                <InputLabel>User password</InputLabel>
                <Input id={"userPassword"} />
              </FormControl>
            </div>
            <Button
              variant={"contained"}
              onClick={collectUserData(props.loginCb)}
              style={{ margin: "16px 0px" }}
            >
              Log in
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    ProductIndexPage.contextType = App.contextTypes;
    ServiceIndexPage.contextType = App.contextType;
  }
  state = {
    appBar: {
      height: undefined
    },
    drawerOpen: true,
    user: {
      userToken: "token",
      userName: undefined,
      password: undefined,
      loggedIn: false
    },
    store: {
      storeToken: undefined
    }
  };

  static contextType = AppContext;

  loginUser = (userName, userPassword) => {
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        userName: "userName",
        password: "userPassord",
        userToken: "token"
      })
    );
    this.setState({
      userName: userName,
      userPassword: userPassword,
      loggedIn: true
    });
  };

  checkIfUserIsLoggedInAndLogin = () => {
    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user.userName) {
      //use is loggedIn, authomatically log in user with details.
      this.loginUser(user.userName, user.password);
      return;
    }
    return false;
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
          <AppContext.Provider value={this.state.user}>
            {this.state.loggedIn ? (
              mainApp
            ) : (
              <LogIn show loginCb={this.loginUser} />
            )}
          </AppContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
