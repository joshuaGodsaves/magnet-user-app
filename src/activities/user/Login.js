import React, {Component} from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {Grid, Typography, AppBar, Paper, Button, FormControl, FormLabel, FormHelperText, OutlinedInput} from "@material-ui/core"
import {VerifiedUserOutlined,  SupervisedUserCircle} from "@material-ui/icons";
import axios from "axios";

let drawerWidth = 220;
let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    }
});

class App extends Component {

    state={
        email : undefined,
        password: undefined,
        sentRequest: false,
        isLoggedIn: false
    }
    constructor(props) {
        super(props);
    }

    loginUser =async (event) => {

        alert("about to loginin")
        this.setState({sentRequest: true})
        let req= await axios.post("http://localhost:5000/api/user/login", {
            email: this.state.email,
            userName: this.state.email,
            password: this.state.password
        })
        this.setState({sentRequest: false})
        if(req.data.token){
            //Logged in
            console.log("user is loggedin")
            let user= {
                email: this.state.email,
                token: req.data.token
            }
            window.localStorage.setItem("magnet-client-active-user", JSON.stringify(user))
            window.location.replace(window.location.host)
        }
    };

    watch= (prop)=>{
        return (event)=>{
            event.persist()
            this.setState(state=>{
                state[prop]= event.target.value
                return state;
            })
        }
    }


    componentDidMount() {

    }
    render() {

        return (
            <React.Fragment>

                <Grid container justify={"center"}>
                    <Grid item sm={10} md={6} lg={4} style={{margin:"24px"}} >
                        <Typography align={"center"} style={{margin:"16px 0px"}}>Login User Account</Typography>
                        <Paper style={{padding:16}} elevation={1}>
                            <FormControl fullWidth onChange={this.watch("email")}  style={{margin:"16px 0px"}}>
                                <FormLabel>Email</FormLabel>
                                <OutlinedInput />
                            </FormControl>
                            <FormControl fullWidth style={{margin:"16px 0px"}}>
                                <FormLabel>Password</FormLabel>
                                <OutlinedInput onChange={this.watch("password")}/>
                            </FormControl>
                            <Button onClick={ this.loginUser} style={{width:"70%", margin:"8px 15%"}}> Login</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


