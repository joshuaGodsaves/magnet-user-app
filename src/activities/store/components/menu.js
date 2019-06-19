import React, {Component} from "react";

import {Link} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BlogIcon from "@material-ui/icons/TextFormat";
import Divider from "@material-ui/core/Divider";
import {FaLayerGroup} from "react-icons/fa"
import { CategorySharp} from "@material-ui/icons";
import StoreContext from "../StoreContext"
import {
    ListSubheader,
    ListItem, ButtonBase,
    List
} from "@material-ui/core"
import {
    AddShoppingCartRounded as AddShoppingCart, Business, PeopleOutline
} from "@material-ui/icons"
let styles = theme => ({

});

class App extends Component {
    constructor(props) {
        super(props);
    }

    static contextType= StoreContext


    render() {
        return (
            <React.Fragment>
                <List style={{ paddingTop: 0 }}>
                    <List>
                        <ListSubheader style={{background: "ghostwhite"}}> Store </ListSubheader>
                        <Divider />
                        <ListItem component={Link} to={`/stores/${this.context.store.id}/Sections`}>
                            <ListItemIcon>
                                <FaLayerGroup/>
                            </ListItemIcon>
                            <ListItemText primary={"Section"} />
                        </ListItem>
                        <ListItem component={Link} to={`/stores/${this.context.store.id}/categories`}>
                            <ListItemIcon>
                                <CategorySharp/>
                            </ListItemIcon>
                            <ListItemText primary={"category"} />
                        </ListItem>
                        <ListItem component={Link} to={`/stores/${this.context.store.id}/products`}>
                            <ListItemIcon>
                                <AddShoppingCart/>
                            </ListItemIcon>
                            <ListItemText primary={"products"} />
                        </ListItem>
                        {/*<ListItem component={Link} to={"/services"}>*/}
                        {/*<ListItemIcon>*/}
                        {/*<RoomService/>*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText primary={"services"} />*/}
                        {/*</ListItem>*/}
                        <ListItem component={Link} to={`/stores/${this.context.store.id}/orders`}>
                            <ListItemIcon>
                                <Business/>
                            </ListItemIcon>
                            <ListItemText primary={"Sales"} />
                        </ListItem>
                        <ListItem component={Link} to={`/stores/${this.context.store.id}/customers`}>
                            <ListItemIcon>
                                <PeopleOutline/>
                            </ListItemIcon>
                            <ListItemText primary={"Customers"} />
                        </ListItem>
                    </List>
                    <ListSubheader>Store Theme</ListSubheader>
                    <Divider />
                    <ListItem  component={Link} to={`/stores/${this.context.store.id}/themes`}>
                        <ListItemIcon>
                            <BlogIcon />
                        </ListItemIcon>
                        <ListItemText primary={"theme"} />
                    </ListItem>
                    <ListSubheader component={ButtonBase}> Payments</ListSubheader>
                    <ListItem  component={Link} to={`/stores/${this.context.store.id}/themes`}>
                        <ListItemIcon>
                            <BlogIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Subscription"} />
                    </ListItem>
                    <ListSubheader> Utilities</ListSubheader>
                    <Divider />
                    <ListItem component={Link} to={`/stores/${this.context.store.id}/blog`} disabled>
                        <ListItemIcon>
                            <BlogIcon />
                        </ListItemIcon>
                        <ListItemText primary={"blog"} />
                    </ListItem>
                    <ListItem component={Link} to={`/stores/${this.context.store.id}/assets`}>
                        <ListItemIcon>
                            <BlogIcon />
                        </ListItemIcon>
                        <ListItemText primary={"assets"} />
                    </ListItem>
                    <ListItem component={Link} to={`/stores/${this.context.store.id}/Settings`}>
                        <ListItemIcon>
                            <BlogIcon />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </ListItem>
                </List>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


