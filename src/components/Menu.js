import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import UserIcon from "@material-ui/icons/VerifiedUser";
import ListItemText from "@material-ui/core/ListItemText";
import ProductIcon from "@material-ui/icons/AddBoxRounded";
import BlogIcon from "@material-ui/icons/TextFormat";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ButtonBase from "@material-ui/core/ButtonBase";
import ListSubheader from "@material-ui/core/es/ListSubheader";
let styles = {
  root: {},
  menuBucket: {
    width: "100%"
  },
  menuList: {
    width: "100%"
  },
  appBarRoot: {},
  listItemRoot: {
    display: "flex",
    flexDirection: "column"
  }
};
class Menu extends React.Component {
  state = theme => ({
    primaryMenuOpen: false
  });
  toggleMenu = () => {
    this.setState(function(state) {
      state.primaryMenuOpen = !state.primaryMenuOpen;
      return state;
    });
  };

  render() {
    let { primaryMenuOpen } = this.state;
    let { classes } = this.props;
    let menuList = (
      <div>
        <Toolbar position={"relative"}>
          <Typography variant={"title"}> Primary Menu</Typography>
        </Toolbar>
        <Divider/>
        <List style={{ paddingTop: 0 }}>
          <ListItem component={Link} to={"/"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"home"} />
          </ListItem>
          <List>
            <ListSubheader> Store </ListSubheader>
            <Divider />
            <ListItem component={Link} to={"/category"}>
              <ListItemIcon>
                <ProductIcon />
              </ListItemIcon>
              <ListItemText primary={"category"} />
            </ListItem>
            <ListItem component={Link} to={"/products"}>
              <ListItemIcon>
                <ProductIcon />
              </ListItemIcon>
              <ListItemText primary={"products"} />
            </ListItem>
            <ListItem component={Link} to={"/services"}>
              <ListItemIcon>
                <BlogIcon />
              </ListItemIcon>
              <ListItemText primary={"services"} />
            </ListItem>
            <ListItem component={Link} to={"/orders"}>
              <ListItemIcon>
                <BlogIcon />
              </ListItemIcon>
              <ListItemText primary={"Sales"} />
            </ListItem>
          </List>

          <ListSubheader> Utilities</ListSubheader>
          <Divider />
          <ListItem component={Link} to={"/blog"}>
            <ListItemIcon>
              <BlogIcon />
            </ListItemIcon>
            <ListItemText primary={"blog"} />
          </ListItem>
          <ListItem component={Link} to={"/assets"}>
            <ListItemIcon>
              <BlogIcon />
            </ListItemIcon>
            <ListItemText primary={"assets"} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BlogIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItem>
        </List>
      </div>
    );
    let component = <React.Fragment>{menuList}</React.Fragment>;

    return component;
  }
}

export default withStyles(styles)(Menu);
