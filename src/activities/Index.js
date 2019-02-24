import  React from 'react';
import {
    Grid, Card, CardHeader, CardContent, Typography, Toolbar,
    Button, CardMedia
} from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"
import pic from "../pic.png"



let styles={
    root:{

    }
}

 class Index extends React.Component{




    render(){
        return (
            <React.Fragment>
                <Grid container spacing={8}>

                    <Grid item lg={3} md={4} sm={6}>
                        <Card>
                            <Typography paragraph>
                                You could describe more in your micro blog about your products
                            </Typography>

                            <Button>
                                Edit Product
                            </Button>
                            <Button>
                                Add Product
                            </Button>
                        </Card>
                    </Grid>

                    <Grid item  lg={3} md={4} sm={6}>
                        <Card>
                            <Typography variant={"h3"}>
                                Services
                            </Typography>
                        </Card>
                    </Grid>

                    <Grid item  lg={3} md={4} sm={6}>
                        <Card>
                            <Typography variant={"h4"}>

                            </Typography>
                            <CardContent>
                                <Button>Open Products</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default  withStyles(styles)(Index)