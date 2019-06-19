import React, {Component} from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {
    Grid, Typography, AppBar, Toolbar, Drawer, ButtonBase, List,
    Button,Paper, Avatar, ExpansionPanel, ExpansionPanelSummary,
    ExpansionPanelActions, ExpansionPanelDetails, IconButton
} from "@material-ui/core"
import {ArrowDownward, ArrowDropDown, MessageOutlined, Store} from "@material-ui/icons"
import {Switch, Link, Route} from "react-router-dom";

let drawerWidth = 220;

let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
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

        return (
            <React.Fragment>
                <Grid container spacing={8}>
                    <Grid item md={12}>
                        <Paper style={{padding: 24, height: 300, display:"flex", alignItems:"flex-end"}}>
                            <div>
                                <Avatar/>
                                <Typography> User Name</Typography>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item sm={11} md={6}>
                        <ExpansionPanel >
                            <ExpansionPanelSummary expandIcon={<ArrowDownward/>}  style={{background:"ghostwhite"}}>
                                <Store style={{marginRight:"12px", color:"grey"}}/>
                                <Typography> Stores </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography> No Messages available</Typography>

                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                <Button>Create</Button>
                                <Button>Visit</Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item  sm={11}  md={6}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ArrowDownward/> } style={{background:"ghostwhite"}}>
                                <MessageOutlined  style={{marginRight:"12px", color:"grey"}}/>
                                <Typography> Messages </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography> No Messages available</Typography>
                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                <Button>Open</Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Grid>

                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


