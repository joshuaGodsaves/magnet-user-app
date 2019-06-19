import React, {Component} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, IconButton, Menu, MenuItem, Button, Avatar, Grid, InputBase,Paper} from "@material-ui/core";
import Link from "react-router-dom/Link"
import withStyles from "@material-ui/core/styles/withStyles";
import {Menu as MenuIcon, ArrowDropDown as ArrowDropDownIcon, MoreHoriz, Search, Notifications} from "@material-ui/icons";
import axios from "axios"
import AppContext from "../AppContext";
import Typography from "@material-ui/core/Typography";
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
        selectedStore: "Store"
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

    componentWillMount() {
        let email= this.context.user.email
        axios.get(`http://localhost:5000/api/user/${email}/stores`).then(v=>{
            this.setState({stores: v.data})
        }).catch(v=>{
            console.log(v)
        })
    }

    render() {
        let { classes } = this.props;
        let {storeListElTrigger}= this.state
        return (
                    <AppBar style={{zIndex:2000}}>
                        <Toolbar style={{display:"flex", alignItems:"center", justifyContent:"space-between", color:"white"}}>
                            <Grid container justify={"space-between"} alignItems={"center"}>
                                <Grid>
                                    <IconButton onClick={this.props.triggerMenuClick} color={"inherit"}>
                                        <MenuIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item md={5}>
                                    <Paper style={{padding:"4px 8px", background:"rgba(0,0,0,0.5)"}} elevation={0}>
                                        <InputBase style={{width:"100%", color:"white"}} startAdornment={<Search/>} color={"inherit"}/>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <div style={{display:"flex", alignItems:"center"}}>
                                        <IconButton color={"inherit"}>
                                            <Notifications/>
                                        </IconButton>
                                        <Button variant={"outlined"} onClick={this.selectStoreTrigger} style={{margin:"0px 8px"}} color={"inherit"}>
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
                                                <MenuItem component={Link} to={`/stores/${v._id}`}>{v._id}</MenuItem>
                                            ))}
                                        </Menu>
                                        <Typography color={"inherit"}>
                                            {this.context.user.email}
                                        </Typography>
                                        <Avatar style={{margin:"0px 8px"}}/>
                                    </div>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>

        );
    }
}

export default withStyles(styles)(App);


