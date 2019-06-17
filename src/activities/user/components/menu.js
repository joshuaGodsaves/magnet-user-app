import React, {Component} from "react";

import {Switch, Link} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    Grid,
    Typography,
    AppBar,
    Toolbar,
    ListSubheader,
    ListItem,
    List,
    ButtonBase, Avatar,
    ListItemIcon, ListItemText
} from "@material-ui/core"
import { Message, Settings, Shop, Favorite, VerifiedUserOutlined} from "@material-ui/icons"
let styles = theme => ({

});

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <React.Fragment>
                <List>

                    <ListItem component={Link} to={"/stores"} >
                        <ListItemIcon><Shop/> </ListItemIcon>
                        <ListItemText> Stores</ListItemText>
                    </ListItem>
                    <ListItem component={Link} to={"/"}>
                        <ListItemIcon><Message/></ListItemIcon>
                        <ListItemText> Messages</ListItemText>
                    </ListItem>
                    <ListItem component={Link} to={"/"}>
                        <ListItemIcon><Favorite/></ListItemIcon>
                        <ListItemText> Favourites</ListItemText>
                    </ListItem>
                    <ListItem component={Link} to={"/"}>
                        <ListItemIcon> <Settings/></ListItemIcon>
                        <ListItemText> Settings</ListItemText>
                    </ListItem>
                </List>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


