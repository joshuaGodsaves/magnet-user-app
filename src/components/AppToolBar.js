import react from "react";
import {
    AppBar,
    Toolbar
} from "@material-ui/core";
import React from "react";

export default class Component extends  react.Component{

    render(){

       return  <AppBar position={"relative"} elevation={0}>
            <Toolbar
                style={{
                    widht:"100%",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems:"center"
                }}
            >
                {this.props.children}
            </Toolbar>
        </AppBar>
    }
}
