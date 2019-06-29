import React, {Component} from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {
    Grid, Typography, AppBar, Toolbar, Drawer, ButtonBase, List,
    Button, Paper, Avatar, ExpansionPanel, ExpansionPanelSummary,
    ExpansionPanelActions, ExpansionPanelDetails, IconButton, Card, CardContent, Divider, CardActions
} from "@material-ui/core"
import rechart, {LineChart, Tooltip, CartesianGrid,Line, XAxis} from "recharts"


import {ArrowDownward, ArrowDropDown, SupervisedUserCircle, NotificationImportantOutlined, NewReleasesOutlined} from "@material-ui/icons"

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
                        <Paper style={{padding: 24}}>
                            <LineChart
                                width={400}
                                height={400}
                                data={{uv:100, px:20}}
                                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                            >
                                <XAxis dataKey="name" />
                                <Tooltip />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                                <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={10} />
                            </LineChart>
                        </Paper>
                    </Grid>
                    <Grid item md={6}>
                        <Card>
                            <CardContent style={{ padding: 0}}>
                                <div style={{padding:"16px 16px", background:"lightblue"}}>
                                    <Typography>Visits Analytics</Typography>
                                </div>
                                <div>

                                </div>
                            </CardContent>
                            <Divider/>
                            <CardActions>
                                <Button> Visit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Card>
                            <CardContent style={{ padding: 0}}>
                                <div style={{padding:"16px 16px", background:"lightblue"}}>
                                    <Typography>Customer Engagement</Typography>
                                </div>
                                <div>
                                </div>
                            </CardContent>
                            <Divider/>
                            <CardActions>
                                <Button> Visit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <ExpansionPanel >
                            <ExpansionPanelSummary expandIcon={<ArrowDownward/>}>
                                <NotificationImportantOutlined  style={{marginRight:12}}/>
                                <Typography> Orders </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>New orders</Typography>
                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                <Button>Create</Button>
                                <Button>Visit</Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item md={6}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ArrowDownward/> }>
                                <NotificationImportantOutlined style={{marginRight:12}}/>
                                <Typography> New customers</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography> No customers yet</Typography>
                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                <Button>Add Customer</Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Grid>

                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


