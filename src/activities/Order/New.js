import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppToolBar from "../../components/AppToolBar"
import User from "@material-ui/icons/SupervisedUserCircle"
import {
    Button,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    FormControl,
    Grid,
    List,
    ListItem,
    OutlinedInput,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import DataSource from "../../DataSource"
import AppContext from "../../AppContext"

let styles = {
    dialogActions: {
        display: "flex",
        margin: "0",
        padding: 12
    }, rootDialogContent: {
        margin: "0",
        padding: 0
    },
    searchInputRoot: {
        paddingLeft: 8
    }
};

class CreateTransaction extends React.Component {

    static contextType = AppContext
    state = {
        customers: [],
        customerDialog: false,
        customer: undefined,
        productDialog: undefined,
        products: [],
        selectedProducts: [],
        cart: []
    }

    async loadCategories() {

    }

    async loadCustomers() {

    }

    loadProductIntoState = async (filter) => {

    }

    selectProductHandler() {

    }

    openCustomerDialog = () => {
        this.setState({customerDialog: true})
    }

    closeCustomerDialog = () => {
        this.setState({customerDialog: false})
    }
    closeProductDialog = () => {
        this.setState({productDialog: false})
    }
    openProductDialog = () => {
        this.setState({productDialog: true})
    }

    addNewlySelectedProducts = () => {

        this.setState(state => {
            this.state.selectedProducts.forEach(v => {
                state.cart.push(v);
            })
            return state
        })

        this.closeProductDialog()
    }

    selectedProduct = (product) => {
        return () => {
            let check = this.checkIfProductIsSelected(product)
            if (check) {
                this.removeProductFromSelectedProducts(product)
            } else {
                this.addProductToSelectedProducts(product)
            }
        }
    }

    checkIfProductIsSelected = (product) => {
        return this.state.selectedProducts.some(item => item._id == product._id)
    }
    removeProductFromSelectedProducts = (product) => {
        let arr = this.state.selectedProducts.filter(v => {
            return v._id != product._id
        })
        this.setState({selectedProducts: arr})
    }

    addProductToSelectedProducts = (product) => {
        this.setState(state => {
            state.selectedProducts.push({
                _id: product._id,
                title: product.title,
                count: 1,
                price: product.sellingPrice
            });
            return state
        })
    }

    selectCustomer = (customer) => {

        return () => {
            this.setState({customer: {id: customer.customer, user: customer.user._id}})
            this.closeCustomerDialog()
        }
    }

    loadCustomers = () => {
        this.dataSource.getStoreCustomers().then(v => {
            this.setState({loading: false})
            let customers = v.data.items
            customers.forEach(async (v, i, a) => {
                let customer = v.customer
                let maguser = await this.dataSource.getUser(customer)
                a[i].user = maguser
            })
            this.setState({customers: customers})
        }).catch(v => {
            console.log(v);
            this.setState({loading: false})
        })
    }

    loadProducts = () => {

        this.dataSource.getStoreProducts().then(v => {
            let products = v.data.items
            this.setState({products: products})
        }).catch(v => console.log(v))

    }

    addTransaction = async () => {

        let {cart, customer} = this.state
        let items = cart.map(v => ({count: v.count, product: v._id, price: v.price, total: 100}))

        let total = 0;
        items.forEach(v => {
            total += v.total
        })
        let result = await this.dataSource.postStoreTransaction({
            user: customer.user,
            customer: customer.id,
            items: items,
            total: total
        })

        console.log(result)

    }

    componentDidMount() {
        this.dataSource = new DataSource(this.context.user.token, this.context.user.store._id)
        this.loadCustomers()
        this.loadProducts()
    }

    render() {
        let {classes} = this.props
        const {customer, products, customers} = this.state
        const customerList = (
            <List>
                {customers.map(v => (
                    <ListItem component={ButtonBase} onClick={this.selectCustomer(v)}>Customer</ListItem>
                ))}
            </List>
        )


        const customerDialog = (
            <React.Fragment>
                <Dialog open={this.state.customerDialog} maxWidth={"xs"} fullWidth style={{padding: "0"}}>
                    <DialogActions className={classes.dialogActions}>
                        <FormControl fullWidth>
                            <OutlinedInput startAdornment={<User/>} classes={{input: classes.searchInputRoot}}/>
                        </FormControl>
                        <span>
                        </span>
                    </DialogActions>
                    <Divider/>
                    <DialogContent className={classes.rootDialogContent} style={{margin: "0", height: 350}}>
                        {customerList}
                    </DialogContent>
                    <Divider/>
                    <DialogActions>
                        <Button onClick={this.closeCustomerDialog}>Cancel</Button>
                        <Button>Save</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )

        let productList = (
            <Grid container style={{padding: "0px 12px"}} spacing={8} justify={"center"}>
                {products.map(v => {
                    if (this.state.cart.some(item => item._id == v._id)) {
                        return;
                        console.log("cant add already selected item")
                    }
                    return <Grid item onClick={this.selectedProduct(v)} style={{
                        background: this.state.selectedProducts.some(v2 => v2._id == v._id) ? "purple" : "white"
                    }}>
                        <div style={{width: 180, height: 160, border: "1px solid black"}}>
                        </div>
                        <Typography> Product Name</Typography>
                    </Grid>
                })}
            </Grid>
        )
        const productDialog = (
            <React.Fragment>
                <Dialog open={this.state.productDialog} maxWidth={"md"} fullWidth style={{padding: "0"}}>
                    <DialogActions className={classes.dialogActions}>
                        <FormControl fullWidth>
                            <OutlinedInput startAdornment={<User/>}
                                           placeholder={"find Products"}
                                           classes={{input: classes.searchInputRoot}}/>
                        </FormControl>
                        <span style={{margin: "0px 12px"}}>
                            <CircularProgress/>
                        </span>
                    </DialogActions>
                    <Divider/>
                    <DialogContent style={{margin: "0", height: 350}}>
                        {productList}
                    </DialogContent>
                    <Divider/>
                    <DialogActions>
                        <Button onClick={this.closeProductDialog}>Cancel</Button>
                        <Button onClick={this.addNewlySelectedProducts}>Save</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )

        return (
            <React.Fragment>
                {customerDialog}
                {productDialog}
                <Grid container justify={"center"}>
                    <Grid item xs={10} style={{margin: "16px 0"}}>
                        <Paper style={{padding: 24, background: "#200", color: "ghostwhite"}}>
                            <Typography style={{color: "ghostwhite"}}> Transactions are normally sales you make to your
                                customers</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={10} style={{display: "flex", margin: "16px 0"}}>
                        <Card style={{minWidth: 200}}>
                            <CardContent>
                                <Typography> Customer: {customer ? customer.id : "customer name"}</Typography>
                            </CardContent>
                            <Divider/>
                            <CardActions><Button style={{float: "right"}} variant={"raised"}
                                                 onClick={this.openCustomerDialog}
                            >Customer</Button></CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={10} style={{position: 'relative', margin: "16px 0"}}>
                        <Paper style={{overflow: "hidden"}}>
                            <AppToolBar>
                                <Typography> Cart </Typography>
                                <div>
                                    <Button variant={"outlined"} onClick={this.openProductDialog}>Add Item[s]</Button>
                                    <Button onClick={this.addTransaction}>Save</Button>
                                </div>
                            </AppToolBar>
                            <div style={{height: 280, overflowY: 'auto'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Price per item</TableCell>
                                            <TableCell>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.cart.map((v, i) => (
                                            <TableRow>
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>Product</TableCell>
                                                <TableCell>Price per item</TableCell>
                                                <TableCell>Total</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CreateTransaction);
