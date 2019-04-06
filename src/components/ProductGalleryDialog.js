import React from "react"
import {
    AppBar,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    IconButton,
    InputBase,
    Tab,
    Tabs,
    Toolbar
} from "@material-ui/core";
import Button from "../activities/Product/Product";
import {SearchRounded} from "@material-ui/icons";

export default class ProductGalleryDialog extends  React.Component{
    render(){
        return (
        <React.Fragment>
            <Dialog open fullScreen fullWidth style={{zIndex:30000}}>
                <DialogActions>
                    <Button>Close</Button>
                </DialogActions>
                <Divider/>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={7}>
                            <AppBar position={"relative"}>
                                <Toolbar>
                                    <Tabs value={0}>
                                        <Tab label={"External"}/>
                                        <Tab label={"Uploads"}/>
                                    </Tabs>
                                </Toolbar>
                            </AppBar>
                            <div style={{position:'relative'}}>
                                <div style={{position:"absolute",background:"pink", left: 0, display:"flex", width:"100%", top:16, padding:8,
                                    boxSizing:"border-box"}}>
                                    <IconButton>
                                        <SearchRounded/>
                                    </IconButton><InputBase fullWidth/>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={5} style={{padding:"8px 8px"}}>
                            <Grid container>
                                <Grid item>
                                    <div style={{width:"200px", height:"200px", background:"red"}}></div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )

    }
}