import React, {Component} from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {Grid, Typography, AppBar, Toolbar, Drawer, ButtonBase, List, Paper} from "@material-ui/core"
import {Switch, Link, Route} from "react-router-dom";
import StorePrimaryMenu from "./components/menu"
import PrimaryMenu from "../../components/AppPrimaryMenu"
import defaultStorePage from "./default"
import StoreContext from "./StoreContext"
import productIndex from "./Product/Index"
import orderIndex from "./Order/Index"
import sectionIndex from "./Section/Index"
import categoryIndex from "./Category/Index"
import customerIndex from "./Customer/Index"
import settings from "./Settings"

let drawerWidth = 220;

let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    }
});

class App extends Component {

    constructor(props) {
        super(props);
    }

    state={
        menuOpen: true,
        activateToggleMenuButton: false,
        activeStore: undefined

    }

    openUserMenu = ()=>{
        if(this.state.activateToggleMenuButton) {
            this.setState({menuOpen: !this.state.menuOpen, disablePermanentDrawer: true})
        }
    }

    componentWillMount() {
        let {match: {params}} = this.props
        this.setState({activeStore: params.store})
    }

    componentDidMount() {

        let  reset = ()=>{
            if(window.innerWidth < 800){
                this.setState({menuOpen: false, disablePermanentDrawer: false, activateToggleMenuButton: true})
            }else{
                this.setState({menuOpen: true, disablePermanentDrawer: true, activateToggleMenuButton: false})
            }
        }
        reset()
        window.addEventListener("resize", function (){
            reset()
        })
    }

    render() {
        let {classes}= this.props
        let marginLeft=`0px`
        let contentWidth= "100%"
        if(this.state.menuOpen){
            contentWidth= `calc(100% -${drawerWidth}px)`
            marginLeft= `${drawerWidth}px`
        }

        if(this.state.activateToggleMenuButton){
            contentWidth= "100%"
            marginLeft=`0px`
        }else{

        }
        return (
            <StoreContext.Provider value={{store: {id: this.state.activeStore, token:"undefined"}}}>
                <PrimaryMenu triggerMenuClick={ this.openUserMenu }/>
                <AppBar position={"relative"} style={{zIndex:0}}><Toolbar></Toolbar></AppBar>
                <Drawer open={this.state.menuOpen} style={{width:drawerWidth}} classes={{paper: classes.drawerPaper}}
                        variant={this.state.disablePermanentDrawer? "persistent": "temporary"}
                >
                    <Toolbar/>
                    <StorePrimaryMenu store={this.state.activeStore}>
                    </StorePrimaryMenu>
                </Drawer>
                    <div style={{width:contentWidth, marginLeft: marginLeft}}>
                        <Grid container justify={"center"} style={{marginTop:24}} wrap={"wrap"}>
                            <Grid item md={11}>
                                <Switch>
                                    <Route path={`/stores/${this.state.activeStore}` } exact  component={defaultStorePage}/>
                                    <Route path={`/stores/${this.state.activeStore}/products` }   component={productIndex}/>
                                    <Route path={`/stores/${this.state.activeStore}/orders` }   component={orderIndex}/>
                                    <Route path={`/stores/${this.state.activeStore}/categories` }   component={categoryIndex}/>
                                    <Route path={`/stores/${this.state.activeStore}/customers` }   component={customerIndex}/>
                                    <Route path={`/stores/${this.state.activeStore}/sections` }   component={sectionIndex}/>
                                    <Route path={`/stores/${this.state.activeStore}/settings` }   component={settings}/>
                                </Switch>
                            </Grid>
                        </Grid>
                    </div>
            </StoreContext.Provider>

        );
    }
}

export default withStyles(styles)(App);


