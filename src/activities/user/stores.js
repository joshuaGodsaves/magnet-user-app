import React, {Component} from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {
    Grid, Typography, AppBar, Toolbar, Drawer, ButtonBase, List,
    Button, Paper, Avatar, ExpansionPanel, ExpansionPanelSummary,
    Divider,
    ExpansionPanelActions, ExpansionPanelDetails, IconButton, Card, CardHeader, CardActions, CardContent
} from "@material-ui/core"
import {ArrowDownward, ArrowDropDown} from "@material-ui/icons"
import {Switch, Link, Route} from "react-router-dom";

let drawerWidth = 220;

let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    },
    yMargin:{
        margin:"16px 0px"
    }
});

class App extends Component {

    constructor(props) {
        super(props);
    }
    state={
        menuOpen: true
    }
    componentDidMount() {
    }
    render() {

        let {classes}= this.props
        return (
            <React.Fragment>
                <Grid container spacing={8}>
                    <Grid item md={6}>
                        <Card>
                            <CardContent style={{ padding: 0}}>
                                <div style={{padding:"16px 16px", background:"lightblue"}}>
                                    <Typography>Business Name</Typography>
                                </div>
                                <div style={{padding:"8px 16px", background:'white'}}>
                                    <Typography style={{margin:"8px 0px"}}> Store Id: {Date.now()}</Typography>
                                    <Typography style={{margin:"8px 0px"}}>  Created: {Date.now()}</Typography>
                                    <Typography style={{margin:"8px 0px"}}> isActive: {Date.now()}</Typography>
                                    <Typography style={{margin:"8px 0px"}}> last visit: {Date.now()}</Typography>
                                </div>
                            </CardContent>
                            <Divider/>
                            <CardActions>
                                <Button> Visit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


