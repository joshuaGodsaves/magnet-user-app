import React, {Component} from 'react';
import './App.css';
import AppMenu from "./components/Menu"
import Grid from  "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import {AppBar, Paper} from "@material-ui/core"
import IndexPage from "./activities/Index"
import ProductPage from "./activities/Product"
import withStyles from "@material-ui/core/styles/withStyles"
import {BrowserRouter,Link, Switch, Route} from "react-router-dom"


let styles={
    root:{
        width:240
    },
    contentContainer:{
        padding:"85px 32px"
    },
    outLine:{
        border:"1px solid black"
    }
}
class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        let {classes}= this.props
        return (
            <BrowserRouter>
            <React.Fragment>
                <AppMenu/>
                <Grid container  className={classes.contentContainer}>
                <Switch>
                    <Route path={"/products"} component={ProductPage}/>
                </Switch>
                        
                </Grid>
            </React.Fragment>
            </BrowserRouter>
        )
    }
}



export default withStyles(styles)(App);
