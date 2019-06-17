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
        menuOpen: true
    }

    openUserMenu = ()=>{
        this.setState({menuOpen: !this.state.menuOpen, disablePermanentDrawer: true})
    }

    componentDidMount() {

        let  reset = ()=>{
            if(window.innerWidth < 800){
                this.setState({menuOpen: false, disablePermanentDrawer: false})
            }else{
                this.setState({menuOpen: true, disablePermanentDrawer: true})
            }
        }

        reset()

        window.addEventListener("resize", function (){
            reset()
        })
    }

    render() {
        let {classes}= this.props
        let menuWidth= "100%"
        let marginLeft=`0px`
        if(this.state.menuOpen){
            menuWidth= `calc(100% -${drawerWidth}px)`
            marginLeft= `${drawerWidth}px`
        }
        return (
            <React.Fragment>
                <PrimaryMenu triggerMenuClick={ this.openUserMenu }/>
                <AppBar position={"relative"} style={{zIndex:0}}><Toolbar></Toolbar></AppBar>
                <Drawer open={this.state.menuOpen} style={{width:drawerWidth}} classes={{paper: classes.drawerPaper}}
                        variant={this.state.disablePermanentDrawer? "permanent": "temporary"}
                >
                    <Toolbar/>
                    <UserMenuList>
                    </UserMenuList>
                </Drawer>
                <div style={{width:menuWidth, marginLeft: marginLeft}}>
                    <Grid container justify={"center"} style={{marginTop:24}}>
                        <Grid item md={10}>
                            <Switch>
                                <Route path={"/" }  exact component={defaultUserActivity}/>
                                <Route path={"/stores" } exact component={storeActivity}/>
                            </Switch>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


