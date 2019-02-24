import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles"
import AppBar from '@material-ui/core/AppBar'
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import HomeIcon from "@material-ui/icons/Home"
import ProductIcon from "@material-ui/icons/"
import ListItemText from "@material-ui/core/ListItemText"
import BlogIcon from "@material-ui/icons/Block"
import {Link} from "react-router-dom"
let styles = {
    root: {},
    menuBucket:{
        width:250
    },
    appBarRoot: {
        display: "flex",
        justifyContent: "flex-between"
    }
}
class Menu extends React.Component {

    state = {
        primaryMenuOpen: false
    }
    toggleMenu = () => {
        this.setState(function (state) {
            state.primaryMenuOpen = (!state.primaryMenuOpen)
            return state
        })
    }

    render() {
        let {primaryMenuOpen} = this.state
        let {classes} = this.props

        let menuList = (
            <div className={""}>
                <List className={classes.menuBucket}>
                    <ListItem divider={true}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            <Link to={""}>Home</Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <BlogIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            <Link to={"/products"}>Products</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <BlogIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Services
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <BlogIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Blog
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <BlogIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Order
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <BlogIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Settings
                        </ListItemText>
                    </ListItem>


                </List>
            </div>
        )
        let component = (
            <React.Fragment>
                <AppBar position={"fixed"} className={classes.appBarRoot} elevation={10}>
                    <Toolbar>
                        <IconButton onClick={this.toggleMenu}>
                            <MenuIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer anchor={"left"} open={primaryMenuOpen} onClose={this.toggleMenu}>
                    {menuList}
                </Drawer>
            </React.Fragment>
        )


        return component


    }
}


export default withStyles(styles)(Menu)