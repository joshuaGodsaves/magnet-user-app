import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Collections as Group, Delete, Edit, MoreHoriz, Refresh} from "@material-ui/icons";
import {FaProductHunt} from "react-icons/fa"
import {Link} from "react-router-dom";
import StoreContext from "../StoreContext"
import {
    Avatar,
    ButtonBase,
    Checkbox,
    IconButton,
    LinearProgress,
    Paper, Button,
    Table, Toolbar,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Grid, Chip
} from "@material-ui/core";
import AppToolBar from "../../../components/AppToolBar"
import DataSource from "../../../DataSource"

let styles = {
  ProductItemRoot: {
    padding: 8
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
};

class TableProductsView extends React.Component {
  dataSource;
  constructor(props){
    super(props)

  }
  state = {
    loading: false,
    loaded: false,
    selected: [],
    categories: [
    ]
  };
  selectAll = (event, checked) => {
    if (checked) {
      this.setState(state => {
        state.selected= state.products.map(v=> v._id)
        return state;
      });
    } else {
      this.setState(state => {
        state.selected= []
        return state;
      });
    }
  };

  selectSingle = itemKey => {
    return (event, checked) => {
      this.setState(state => {
        if(checked){
          //push
          state.selected.push(itemKey)
        }else{
          //Pull out
          state.selected= state.selected.filter(v=> v!=itemKey)
        }
        return state;
      });
    };
  };

  componentWillMount(){
    this.dataSource= new DataSource(this.context.store.token, this.context.store.id)

  }

  componentDidMount() {
    this.dataSource.getStoreCategories().then(v=>{
      let categories= v.data.items
      this.setState({categories:categories})
      this.setState({loaded: true})
      this.setState({loading:false})
    }).catch(v=> {console.log(v); })
    this.setState({loading: true})
  }

  static contextType= StoreContext

  render() {
    let { classes } = this.props;
    let selectedCategoriesOptionToolBar = (
        <Paper>
          <Toolbar>
              <Typography variant={"h6"}> Bulk Action</Typography>
            <div>
              <IconButton><Delete/></IconButton>
              <IconButton><Edit/></IconButton>
            </div>
            <div>
            </div>
          </Toolbar>
        </Paper>
    );

    let defaultToolbar = (
        <Paper>
          <Toolbar style={{display:'flex', justifyContent:"space-between"}}>
            <Typography variant={"h6"}>
              Store categories
            </Typography>
            <div>
                <IconButton>
                  <Refresh/>
                </IconButton>
                <Button
                    variant={"contained"}
                            to={"/stores/${this.context.store.id}/categories/new"}
                            component={Link}>
                  <Add/>
                  CREATE
                </Button>
            </div>
          </Toolbar>
        </Paper>
    );

    let productsAvailable = (
        <React.Fragment>
            {this.state.selected.length !== 0
                ? selectedCategoriesOptionToolBar
                : defaultToolbar}

            <Grid container spacing={8}>
                {this.state.categories.map((category, i) => (
                <Grid item xs={6}>
                        <Paper style={{margin:"16px 0px"}} elevation={1}>
                            <Grid container alignItems={"center"} justify={"space-between"}>
                                <Grid item>
                                    <Checkbox
                                        color={"primary"}
                                        checked={this.state.selected.some(v2 => v2 == category._id)}
                                        onChange={this.selectSingle(category._id)}
                                    />
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <FaProductHunt/>
                                    </IconButton>
                                    {"product.title product heere"}
                                </Grid>
                                <Grid item>
                                    <IconButton component={Link}
                                                to={`/stores/${this.context.store.id}/categories/${category._id}`}><MoreHoriz/></IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
    let productsNotAvailable = (
        <div>
          <Typography  align={"center"}>
            You dont have any products yet, click the button above to add some.
          </Typography>
        </div>
    );
    return (
        <React.Fragment>
          {this.state.loading? <LinearProgress/> :
              <div>
            {this.state.categories.length == 0
                ? productsNotAvailable
                : productsAvailable}
          </div>
          }

        </React.Fragment>
    );
  }
}
let WithStylesTableProductsView = withStyles(styles)(TableProductsView);


export default withStyles(styles)(TableProductsView)
