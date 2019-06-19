import React, {Component} from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {Grid, Typography, AppBar, Toolbar, Drawer, ButtonBase, List, Paper} from "@material-ui/core"
import defaultUserActivity from "./default"
import storeActivity from "./stores"
import {Switch, Link, Route} from "react-router-dom";
import UserMenuList from "./components/menu"
import PrimaryMenu from "../../components/AppPrimaryMenu"
import {VerifiedUserOutlined,  SupervisedUserCircle} from "@material-ui/icons";

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
        activateToggleMenuButton: false
    }

    openUserMenu = ()=>{
        if(this.state.activateToggleMenuButton) {
            this.setState({menuOpen: !this.state.menuOpen, disablePermanentDrawer: true})
        }
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
            <React.Fragment>
                <PrimaryMenu triggerMenuClick={ this.openUserMenu }/>
                <AppBar position={"relative"} style={{zIndex:0}}><Toolbar></Toolbar></AppBar>
                <Drawer open={this.state.menuOpen} style={{width:drawerWidth}} classes={{paper: classes.drawerPaper}}
                        variant={this.state.disablePermanentDrawer? "persistent": "temporary"}
                >
                    <Toolbar/>
                    <UserMenuList>
                    </UserMenuList>
                </Drawer>
                <div style={{width:contentWidth, marginLeft: marginLeft}}>
                    <Grid container justify={"center"} style={{marginTop:24}} wrap={"wrap"}>
                        <Grid item md={11}>
                            <Switch>
                                <Route path={"/" }  exact component={defaultUserActivity}/>
                                <Route path={"/list-stores" } exact component={storeActivity}/>
                            </Switch>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


