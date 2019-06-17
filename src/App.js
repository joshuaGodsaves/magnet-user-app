import React, {Component} from "react";

import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, IconButton, Menu, MenuItem, Button} from "@material-ui/core";

import userIndex from "./activities/user/index"
import loginPage from "./activities/user/Login"
import withStyles from "@material-ui/core/styles/withStyles";
import AppContext from "./AppContext"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Menu as MenuIcon, ArrowDropDown as ArrowDropDownIcon} from "@material-ui/icons";
import PrimaryMenu from "./components/AppPrimaryMenu"

let drawerWidth = 220;

let styles = theme => ({

});
class App extends Component {
  constructor(props) {
    super(props);
  }
componentDidMount() {

   let user= JSON.parse(window.localStorage.getItem("magnet-client-active-user"))

  console.log(user)
  if(user && user.email) {
    //User is loggedIn Set token and email
    this.setState({user: user.email, token: user.token})
  }else{
    if(window.location.pathname !== "/login") {
      window.location.replace("/login")
    }
  }
}
  render() {

    return (
      <BrowserRouter>
        <AppC>
          <Switch>
            <Route path={"/login"} exact  component={loginPage} />
            <Route path={"/"}  component={userIndex} />
            {/*<Route path={"/store/:store"} exact component={storeIndexPage}/>*/}
            {/*<Route path={"/store/:store"} exact component={storeIndexPage}/>*/}
          </Switch>
        </AppC>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);


