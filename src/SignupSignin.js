import React, { Component } from "react";
import AppMenu from "./components/Menu";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {
    List, ListItem,ListItemIcon,
    FormControl, FormLabel, FormHelperText, OutlinedInput,
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
import { ButtonBase } from '@material-ui/core/ButtonBase';

let styles = theme => ({
    contentContainer: {
        paddingTop: 0,
        borderTop: "5px solid blue",
        position: "absolute",
        top: 0,
        left: 0
    }
});


class Page extends Component {
    state;
    constructor(props) {
        super(props);
        this.state={
            userName: "joshuaGodsaves19@gmail.com",
            password:"password",
            loggedIn: undefined,
            token: undefined,
            stores: [

            ]
        };
    }
    static contextType = AppContext;
    loginUser = (event) => {
        axios.post("http://localhost:5000/login", {
            userName: this.state.userName,
            password: this.state.password
        }).then(async v=>{
            console.log(v)
            if(!v.data.userAccesstoken){
                return
            }
            this.setState({token: v.data.userAccesstoken})
            let user= await axios.get(`http://localhost:5000/api/user/${this.state.userName}`)
            if(!user.data.error){}
            if(user.data){
               this.setState({ stores: user.data.stores, loggedIn: true})
            }
            // set up stores 
            console.log(this.state)
        })
    };
    watchInput= (prop)=>{
        return (event)=>{
            event.persist()
            this.setState(state=>{
                state[prop]= event.target.value
                return state;
            })
        }
    }
    componentWillMount() {
    }
    componentDidMount() {

    }
    selectedStore= (index)=>{
        return (event)=>{
        let storeID= this.state.stores[index]
        let {userName, token} = this.state
        console.log(this.state)
        this.props.loggedInUser(userName, token, storeID )
        // console.log("loading app")
        //let token= await axios.get(`http://localhost:5000/api/user/${this.state.userName}`)
        }
    }
    render() {
        let { classes } = this.props;
        let generatedStoreList= (
            <React.Fragment>
                <List>
                {this.state.stores.map((store, index)=>{
                    return (
                    <ListItem component={ButtonBase} onClick= {this.selectedStore(index)}>
                        <ListItemIcon></ListItemIcon> <Typography>{store._id}</Typography>
                    </ListItem>
                    )
                })}
                </List>
            </React.Fragment>
        )
        let selectActiveStoreComponent=(
            <React.Fragment>
               {this.state.stores.length === 0 ? "Generate sotre" : generatedStoreList }
            </React.Fragment>
        )

        let loginForm= (
            <React.Fragment>
                <Typography variant={"h6"} align={"center"}> Sigin in to access your store.</Typography>
                            <Typography align={"center"} style={{marginBottom:"24px"}}> Create an acc if you don't have one yet.</Typography>
                            <FormControl fullWidth style={{margin:"8px 0"}}>
                                <FormLabel>User Name</FormLabel>
                                <OutlinedInput onChange={this.watchInput("userName")} value={"temp"} inputProps={{
                                 value:this.state.userName
                                }}/>
                                <FormHelperText>Use the email you used to create your account</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth style={{margin:"8px 0"}}>
                                <FormLabel> Password </FormLabel>
                                <OutlinedInput onChange={this.watchInput("password")} inputProps={{
                                 value:this.state.password
                                }}/>
                            </FormControl>
                            <Button variant={"contained"}style={{margin:"24px 0"}} onClick={this.loginUser}>Log in</Button>
            </React.Fragment>
        )
        let signIn = (
            <React.Fragment>
                <Grid container justify={"center"}>
                    <Grid item xs={10} sm={6} md={5} lg={3} style={{margin:"48px"}}>
                        <Paper style={{padding:24, background:"ghostwhite"}}>
                            {!this.state.loggedIn? loginForm : selectActiveStoreComponent }
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );

        let signUp= (
            <React.Fragment>

            </React.Fragment>
        )

        return (
            <React.Fragment>
                {signIn}
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Page);
