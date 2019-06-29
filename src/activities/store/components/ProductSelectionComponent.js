import React from "react"
import {
    Dialog, Typography,
    DialogContent,
    Divider,
    DialogContentText,
    DialogTitle,
    DialogActions, Paper,
    Grid,
    Button,
    Checkbox, Chip,
    InputBase,
    Toolbar
} from "@material-ui/core"
import {SearchOutlined} from "@material-ui/icons";
import DataSource from "../../../DataSource";
import StoreContext from "../StoreContext"

export default class Component extends React.Component{

    static contextType= StoreContext

    state= {
        selected: [],
        products: []
    }

    onSelected= (id)=>{
        return ()=>{
            let check= this.state.selected.some(v=> v==id)
            if(check){
                let filtered= this.state.selected.filter(v=> v != id)
                this.setState({selected: filtered})
            }else{
                this.setState(state=>
                {
                    state.selected.push(id)
                    return state
                })
            }
        }
    }

    onFinish= ()=>{
        this.props.closeProductSelector(this.state.selected)
    }
    componentWillMount() {
       let open=  this.props.open
        this.setState({open: open})
    }


    componentDidMount() {
        this.dataSource = new DataSource(this.context.store.token, this.context.store.id)
        this.loadProducts()
    }


    loadProducts = () => {
        this.dataSource.getStoreProducts().then(v=>{
            this.setState({products: v.data.items, loading: false})
        }).catch(v=> console.log(v))
        this.setState({loading: true})
    }


    render(){
        return (
            <Dialog open={this.state.open} maxWidth={"sm"} fullWidth style={{zIndex:10000}}>
                <DialogActions style={{padding:"12px 4px",margin:0}}>
                   <Grid container alignItems={"center"} justify={"center"}>
                        <Grid item style={{margin:"0px 8px"}}>Product</Grid>
                        <Grid item md={8}>
                            <Paper style={{padding:4}}>
                                <InputBase startAdornment={<SearchOutlined/>} style={{width:"100%"}}/>
                            </Paper>
                        </Grid>
                   </Grid>
                </DialogActions>
                <Divider/>
                <DialogContent>
                    <Grid container justify={"center"} alignItems={"center"} spacing={8} style={{padding:"24px 24px"}}>
                        {this.state.products.map(v=>(
                            <Grid item onClick={this.onSelected(v._id)}>
                                <Paper elevation={1} style={{border:
                                    this.state.selected.some(siid=>siid==v._id) ? "1px solid black":"none"
                                }}>
                                    <div style={{width:150, height:150}}>
                                    </div>
                                    <div style={{fontSize:10, padding:12}}>
                                        {v.title}
                                    </div>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Chip label={this.state.selected.length}/>
                    <Button onClick={this.onFinish}>Close</Button>
                    <Button onClick={this.onFinish}>Finish</Button>
                </DialogActions>
            </Dialog>
        )

    }
}