import React, {Component} from "react";
import StoreContext from "./StoreContext"
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios"
import {APIURL} from "../../DataSource";
import {
    Grid,
    Typography,
    AppBar,
    Toolbar,
    Drawer,
    ButtonBase,
    List,
    Button,
    Paper,
    Avatar,
    ExpansionPanel,
    ExpansionPanelSummary,
    InputLabel,
    FormControl,
    InputBase,
    Input,
    FilledInput,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    IconButton,
    Card,
    CardContent,
    Divider,
    CardActions,
    FormControlLabel,
    FormLabel
} from "@material-ui/core"

import {FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaTelegram,FaGooglePlusG} from "react-icons/fa";
import {ArrowDownward, ArrowDropDown, SupervisedUserCircle, NotificationImportantOutlined, NewReleasesOutlined} from "@material-ui/icons"

let drawerWidth = 220;

let styles = theme => ({
    drawerPaper: {
        width: drawerWidth
    }, inputRoot: {
        padding: "20px 8px 8px 8px"
    },yMargin: {
        margin: "12px 0px"
    }
});

function EditableInput (props){
     return   (
         <FormControl fullWidth>
             <FormLabel htmlFor={"business_name"}>{props.label}</FormLabel>
             <FilledInput id={"business_name"} classes={{input: props.classes.inputRoot}}  value={props.value}/>
         </FormControl>
     )

}

class App extends Component {

    constructor(props) {
        super(props);
    }

    state={

    }

    static contextType= StoreContext


    componentWillMount() {
        axios.get(`${APIURL}/store/${this.context.store.id}`).then(v=>{
            console.log(v.data)
            this.setState({...v.data})
        })
    }

    componentDidMount() {

    }

    render() {

        let {classes} = this.props
        return (
            <React.Fragment>
                <Grid container >
                    <Grid item xs={12} style={{padding:24, background:"white"}}>
                        <Toolbar style={{ display:"flex", justifyContent:"flex-end"}}>
                            <Button color={"primary"}>Save</Button>
                        </Toolbar>
                        <Grid container spacing={8} >
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={4}>

                                    </Grid>
                                    <Grid item xs={4}>

                                    </Grid>
                                    <Grid item xs={4}>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={7} >
                                <div style={{padding:18, background:"ghostwhite", margin:"12px 0px"}}>
                                <Typography>Primary Details</Typography>
                                <Grid container>
                                    <Grid item xs={12} className={classes.yMargin}>
                                        <EditableInput label={"Business name"} classes={classes}/>
                                    </Grid>
                                    <Grid item xs={12} className={classes.yMargin}>
                                        <EditableInput label={"Caption"} classes={classes}/>
                                    </Grid>
                                    <Grid item xs={12} className={classes.yMargin}>
                                        <EditableInput label={"phone"} classes={classes}/>
                                    </Grid>
                                </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={5}>
                                <div style={{padding:18, background:"ghostwhite", margin:"12px 0px"}}>
                                    <Typography> Social Media</Typography>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <FormControl>
                                            <InputBase startAdornment={<FaWhatsapp style={{margin:"0px 4px"}}/>} style={{padding:"8px 12px", borderRadius:40, background:"rgba(0,0,0,.12)"}}/>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl>
                                            <InputBase startAdornment={<FaInstagram style={{margin:"0px 4px"}}/>} style={{padding:"8px 12px", borderRadius:40, background:"rgba(0,0,0,.12)"}}/>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl>
                                            <InputBase startAdornment={<FaFacebook style={{margin:"0px 4px"}}/>} style={{padding:"8px 12px", borderRadius:40, background:"rgba(0,0,0,.12)"}}/>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={7}>
                                <div style={{padding:18, background:"ghostwhite", margin:"12px 0px"}}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ArrowDownward/>}>Location</ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <Grid item xs={12} className={classes.yMargin}>
                                                <EditableInput label={"Nationality"} classes={classes}/>
                                            </Grid>
                                            <Grid item xs={12} className={classes.yMargin}>
                                                <EditableInput label={"Country"} classes={classes}/>
                                            </Grid>
                                            <Grid item xs={12} className={classes.yMargin}>
                                                <EditableInput label={"City"} classes={classes}/>
                                            </Grid>
                                            <Grid item xs={12} className={classes.yMargin}>
                                                <EditableInput label={"zip code"} classes={classes}/>
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                </div>
                            </Grid>

                            <Grid item xs={7} style={{padding:18, background:"ghostwhite", margin:"12px 0px"}}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ArrowDownward/>}>UI</ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>

                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);


