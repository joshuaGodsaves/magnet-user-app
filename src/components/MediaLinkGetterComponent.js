import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {IconButton, Typography} from "@material-ui/core";
import {CloudUpload as UploadIcon, Link as LinkIcon, SelectAll as SelectIcon} from "@material-ui/icons";
import ImageSelectionComponent from "../../components/ImageSelectionComponent"

let styles = {}


class Component extends React.Component {

    state = {
        openSelectMainImageDrawer: false
    }
    openSelectMainImageDrawer = () => {
        this.setState({openSelectMainImageDrawer: true})
    }
    selectSingle = () => {

    }
    selectMultiple = () => {

    }
    render() {
        return <div style={{margin: "16px 0"}}>
            {this.state.openSelectMainImageDrawer ?
                <ImageSelectionComponent
                    open={this.state.openSelectMainImageDrawer}
                    select={this.props.single ? this.selectSingle : (this.multiple ? this.selectMultiple : this.selectSingle)}
                    onClose={{}}/> : ""}
            <Typography variant={"caption"}>this.props.label</Typography>
            <div style={{
                width: 200, height: 200, background: "white", margin: "8px 0",
                backgroundImage: 'url(file:///C:/Users/LUBI/Pictures/Screenshots/Screenshot%20(3).png)'
            }}>
            </div>
            <div style={{padding:"16px 16px"}}>
                <IconButton><UploadIcon/></IconButton>
                <IconButton onClick={this.openSelectMainImageDrawer}><SelectIcon/></IconButton>
                <IconButton><LinkIcon/></IconButton>
            </div>
        </div>
    }
}


export default withStyles(styles)(Component)