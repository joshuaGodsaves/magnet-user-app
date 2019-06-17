import React, {Component} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, IconButton, Menu, MenuItem, Button, Avatar} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {Menu as MenuIcon, ArrowDropDown as ArrowDropDownIcon, MoreHoriz} from "@material-ui/icons";
import AppContext from "../AppContext";
let styles = theme => ({

});

class App extends Component {
    constructor(props) {
        super(props);
    }

    static contextType= AppContext

    state={
        contextMenu:undefined,
        activeStore: "Store Name",
        storesInputLabelWidth: 0,
        stores: [],
        selectedStore: "Selected Store"
    }
    selectStoreTrigger= (e)=>{
        e.persist()
        this.setState({storeListElTrigger: e.target})
    }
    closeStoresListTrigger= (e)=>{
        e.persist()
        this.setState({storeListElTrigger: null})
    }

    selectStore= (storeId)=>{
        return ()=>{
            this.setState({selectedStore: storeId})
            this.closeStoresListTrigger()
        }
    }

    render() {
        let { classes } = this.props;
        let {storeListElTrigger}= this.state


        alert(this.context.email)
        return (
                    <AppBar style={{zIndex:2000}}>
                        <Toolbar style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                            <IconButton onClick={this.props.triggerMenuClick}>
                                <MenuIcon/>
                            </IconButton>

                            <div style={{display:"flex"}}>
                            <Button variant={"outlined"} onClick={this.selectStoreTrigger} style={{margin:"0px 8px"}}>
                                {this.state.selectedStore}
                                <ArrowDropDownIcon/>
                            </Button>
                            <Menu anchorEl={storeListElTrigger} id="simple-menu"
                                  style={{zIndex:2100}}
                                  open={Boolean(storeListElTrigger)}
                                  onClose={this.closeStoresListTrigger}>
                                {this.state.stores.length == 0 ?
                                    <MenuItem>Create Store</MenuItem> : null
                                }
                                {this.state.stores.map(v=>(
                                    <MenuItem> Item 3</MenuItem>
                                ))}
                            </Menu>
                                <Avatar style={{margin:"0px 8px"}}/>
                              <IconButton style={{margin:"0px 8px"}}>
                                  <MoreHoriz/>
                              </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>

        );
    }
}

export default withStyles(styles)(App);


