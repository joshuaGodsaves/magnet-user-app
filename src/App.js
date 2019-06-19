import React, {Component} from "react";
import userIndex from "./activities/user/index"
import storeIndex from "./activities/store/index"
import loginPage from "./activities/user/Login"

import withStyles from "@material-ui/core/styles/withStyles";
import AppContext from "./AppContext"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css"
let styles = theme => ({

});
class App extends Component {
  constructor(props) {
    super(props);
  }
  state={


  }

componentWillMount() {
   let user= JSON.parse(window.localStorage.getItem("magnet-client-active-user"))
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
        <AppContext.Provider value={{user:{email: this.state.user, user: this.state.user,  token: this.state.token}}}>
          <Switch>
            <Route path={"/login"} exact  component={loginPage} />
            <Route path={"/stores/:store"}   component={storeIndex} />
            <Route path={"/"}   component={userIndex} />
            {/*<Route path={"/store/:store"} exact component={storeIndexPage}/>*/}
            {/*<Route path={"/store/:store"} exact component={storeIndexPage}/>*/}
          </Switch>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);


