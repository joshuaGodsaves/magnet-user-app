import React from "react"
import {
    Button,
    Divider,
    Drawer,
    FormControl,
    FormLabel,
    Grid,
    OutlinedInput,
    Paper,
    Typography
} from "@material-ui/core"
import DataSource from "../DataSource"
import AppContext from "../AppContext"
import withStyles from "@material-ui/core/styles/withStyles"


let styles = {
    root: {
        height: "100%",
        width: "100%",
        zIndex: 30000
    },
    inputSpacing:{
        margin:"16px 0px"
    },
    section: {
        padding: 24,
        margin:"16px 0",
        background:"ghostwhite"
    }
}

class NewCustomerComponent extends  React.Component{
    static  contextType= AppContext
    state= {
        firstName: undefined,
        lastName: undefined,
        userName: undefined,
        email: undefined
    }
    watch = (prop)=>{
        return (e)=>{
            e.persist()
            this.setState(state=>{
                state[prop]= e.target.value
                return state
            })
        }
    }
    componentWillMount() {
        this.dataSource= new DataSource(this.context.user.token, this.context.user.store._id)
    }
    save=async ()=>{
        // Validate before your send
        let data= this.state
        data.userName= `${data.firstName}${data.lastName}`
        data.password= "pass"
       let newEpUser= await  this.dataSource.createEPCustomer(data)
        if(newEpUser){
            console.log(newEpUser)
            let done = await this.dataSource.postStoreCustomer({customer: newEpUser.user})
            if(done){
                this.props.onFinish(true)
            }
        }
    }
    cancel= ()=>{
        this.props.onFinish(false)
    }
    render(){
        let {classes}= this.props
        return (
            <React.Fragment>
                <Drawer open={this.props.open} anchor={"bottom"} className={classes.root} classes={{ paper: classes.root }}>

                <Grid container justify={"center"}>
                    <Grid item style={{padding:24, background:"ghostwhite"}} xs={"12"}>
                        <Typography variant={"h6"} align={"center"}>New Customer</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item  md={4} sm={10} xs={12}>
                        <Grid container>
                            <Grid item xs={12} style={{paddingTop:12}}>
                                <Typography align={"center"}> If the user customer already has an account <a href={"#"}>add customer here</a></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.section}>
                                    <FormControl fullWidth className={classes.inputSpacing}>
                                        <FormLabel>First name</FormLabel>
                                        <OutlinedInput
                                        value={this.state.firstName}
                                        onChange={this.watch("firstName")}/>
                                    </FormControl>
                                    <FormControl fullWidth className={classes.inputSpacing}>
                                        <FormLabel>Last name</FormLabel>
                                        <OutlinedInput
                                        value={this.state.lastName}
                                        onChange={this.watch("lastName")}/>
                                    </FormControl>
                                    <FormControl fullWidth className={classes.inputSpacing}>
                                        <FormLabel>Email</FormLabel>
                                        <OutlinedInput
                                        value={this.state.email}
                                        onChange={this.watch("email")}/>
                                    </FormControl>
                                </Paper>
                            </Grid>
                            <Grid  item xs={12} className={classes.inputSpacing} style={{
                                display:'flex',
                                justifyContent:'space-between'
                            }}>
                                <Button variant={"contained"} onClick={this.save}>Save</Button>
                                <Button onClick={this.cancel}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </Drawer>
            </React.Fragment>
        )
    }
}





export default withStyles(styles)(NewCustomerComponent)