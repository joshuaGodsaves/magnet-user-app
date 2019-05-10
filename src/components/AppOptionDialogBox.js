import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import {
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItemText,
    ListItem
} from "@material-ui/core";
import {CloudUpload as UploadIcon, Link as LinkIcon, SelectAll as SelectIcon} from "@material-ui/icons";

let styles = {
    rootDialogContent: {
        padding: 0
    },
    rootDialogActions: {
        display: "flex",
        justifyContent: "space-between"
    }
}
class Component extends React.Component {

    state = {
        openSelectMainImageDrawer: false,
        selected: []
    }
    openSelectMainImageDrawer = () => {
        this.setState({openSelectMainImageDrawer: true})
    }
    selectSingle = () => {

    }
    selectMultiple = () => {

    }
    checkListener= (v)=>{
        if(this.props.single){

        }
        return (event, checked)=>{
            if(checked){
                this.setState(state=>{
                    this.props.single ? state.selected=[] : null
                    state.selected.push(v)
                    this.props.single ? this.save() : null
                })
            }else{
                this.setState(state=>{
                    //state.selected=[]
                    state.selected= state.selected.filter(v2=> v2!==1)
                })
            }
        }
    }

    save= ()=>{
        let selected= this.state.selected;
        this.setState({openDialog: false})

        this.props.onSave(selected)
    }
    componentDidMount(state, callback)
    {
        if(this.props.selected){
            this.setState({selected: this.props.selected})
        }
        this.setState({openDialog: true})
    }
    close= ()=>{
        this.save()
    }
    render() {
        let {options, selected, selectedListener, classes} = this.props
        return (
            <React.Fragment>
                <Dialog open={this.state.openDialog} onClose={this.close}>
                    <DialogActions className={classes.rootDialogActions}>
                        <Typography>{this.props.title? this.props.title: "Options"}</Typography>
                        <Button onClick={this.save}>Save</Button>
                    </DialogActions>
                    <Divider/>
                    <DialogContent className={classes.rootDialogContent}>
                        <List>
                            {options.map(v => {
                                    return (
                                        <ListItem>
                                            <CheckBox
                                                checked={selected.some(v2=> v==v2)}
                                                onChange={this.checkListener}/><ListItemText label={v}/>
                                        </ListItem>
                                    )
                                }
                            )}
                        </List>
                    </DialogContent>
                    <Divider/>
                    <DialogActions className={classes.rootDialogActions} style={{justifyContent:"flex-end"}}>
                        <Button onClick={this.close}>Close</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(Component)