import React from "react"
import {
    Dialog, Divider,
    DialogContent,Button,
    DialogActions,Grid, Typography, InputBase, Paper
} from "@material-ui/core"
import {Search, ArrowRight} from "@material-ui/icons";
import axios from "axios"


export  default  class Component extends React.Component{
    state= {
        items:[],
        query: "ecommerce",
        selected: []
    }
    closeDialog = ()=>{
        this.setState({open:false});
    }

    finishProcess= ()=>{
        this.props.finishProcess(this.state.items)
        this.closeDialog()
    }

    onSelect= (id)=>{
        return ()=>{
            let check= this.state.selected.some(v=> v==id)
            if(check){
                let filtered= this.state.selected.filter(v=> v != id)
                this.setState({selected: filtered})
            }else{
                if(false){
                    // If select one
                    this.setState({selected: [id]})
                }
                this.setState(state=>
                {
                    state.selected.push(id)
                    return state
                })
            }
        }
    }
    loadResources= async ()=>{
        try{    
            let resources= await  axios.get("https://api.pexels.com/v1/search", {
                params: {
                    query: this.state.query
                },
                headers: {
                    Authorization:
                        "563492ad6f91700001000001a98eefa89e00425daa33c7549ea0553f"
                }
            })
        if(resources.data){
            console.log(resources.data.photos)
            // Received data, from pixels for now
            this.setState({items: resources.data.photos})
        }
        }catch(e){
            console.log(e)
        }
      
    }

    onSearchTrigger = ()=>{

        this.loadResources()
    }

    cancelProcess= ()=>{
        this.props.cancelProcess(this.state.items)
        this.closeDialog()
    }

    watchSearch = (e)=>{
        e.persist();
        this.setState({query: e.target.value})
    }
    componentWillMount() {
        let open= this.props.open;
        this.setState({open: open});

        this.loadResources()
    }

    render(){
        let {state}= this
        return (
            <Dialog open={ state.open} fullWidth maxWidth={"md"}>
                <DialogActions>
                    <Grid container justify={"center"}>
                        <Grid item sm={10} md={8}>
                            <Paper style={{padding: 4, width:"100%"}}>
                                <InputBase style={{width:"100%"}}
                                           value={this.state.query}
                                           onChange={this.watchSearch}
                                           startAdornment={<Search/>}
                                           endAdornment={<ArrowRight
                                               onClick={this.onSearchTrigger}/>}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </DialogActions>
                <Divider/>
                <DialogContent>
                    <Grid container justify={"center"} style={{padding:"24px 0px"}}>
                                {this.state.items.map(v =>(
                                <Grid item style={{height:200, width:200,margin:8, border:"1px solid black",
                                    borderColor:state.selected.some(url=> url==v)>=1? "red": ""}} onClick={this.onSelect(v)}>
                                    <img src={`${v.src.original}`} style={{width:"100%"}}/>
                                </Grid>
                                ))}
                    </Grid>
                </DialogContent>
                <Divider/>
                <DialogActions style={{padding:"4px 24px"}}>
                    <Button variant={"contained"} style={{margin:"0px 16px"}} onClick={this.cancelProcess}>Close</Button>
                    <Button variant={"contained"}
                            style={{background: state.selected.length==0? "" : "red", color: state.selected.length==0? "" : ""}}
                            onClick={state.selected.length==0? "" : this.finishProcess}>Save</Button>
                </DialogActions>
            </Dialog>
        )
    }
}