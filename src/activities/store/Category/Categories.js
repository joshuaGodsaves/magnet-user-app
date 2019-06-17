import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Add, Collections as Group, Delete, Edit, MoreHoriz, Refresh} from "@material-ui/icons";
import {Link} from "react-router-dom";
import AppContext from "../../AppContext"
import {
    Avatar,
    ButtonBase,
    Checkbox,
    IconButton,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import AppToolBar from "../../components/AppToolBar"
import DataSource from "../../DataSource"

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
    this.dataSource= new DataSource(this.context.user.token, this.context.user.store._id)

  }

  componentDidMount() {
    this.dataSource.getStoreCategories().then(v=>{
      console.log("receiving")
      console.log(v)
      let categories= v.data.items
      this.setState({categories:categories})
      this.setState({loaded: true})
      this.setState({loading:false})
    }).catch(v=> {console.log(v); })
    this.setState({loading: true})
  }

  static contextType= AppContext


  render() {
    let { classes } = this.props;
    let selectedCategoriesOptionToolBar = (
        <React.Fragment>
          <AppToolBar>
            <div>
              <IconButton><Delete/></IconButton>
              <IconButton><Edit/></IconButton>
              <IconButton><Group/></IconButton>
            </div>
            <div>
            </div>
          </AppToolBar>
        </React.Fragment>
    );

    let defaultToolbar = (
        <React.Fragment>
          <AppToolBar>
            <Typography>
              Store categories
            </Typography>
            <div style={{display:"flex"}}>
              <div style={{padding:"0px 8px"}}>
                <IconButton>
                  <Refresh/>
                </IconButton>
              </div>
              <div style={{padding:"0px 8px"}}>
                <ButtonBase style={{padding:"12px"}}
                            to={"/categories/new"}
                            component={Link}>
                  <Add/>
                  <Typography color={"inherit"}> CREATE</Typography>
                </ButtonBase>
              </div>
            </div>
          </AppToolBar>
        </React.Fragment>
    );

    let productsAvailable = (
        <React.Fragment>
            <Paper style={{overflow: "hidden", background: "ghostwhite"}}>
            {this.state.selected.length !== 0
                ? selectedCategoriesOptionToolBar
                : defaultToolbar}
                <div style={{overflow: "hidden", overflowX: "auto"}}>
                    <Table style={{padding: 16, overflowX: "scroll", minWidth: 300}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox onChange={this.selectAll}/>
                                </TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>title</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.categories.map((v, i) => (
                                <TableRow>
                                    <TableCell>
                                        <Checkbox
                                            checked={this.state.selected.some(v2 => v2 == v._id)}
                                            onChange={this.selectSingle(v._id)}
                                        />
                                    </TableCell>
                                    <TableCell>{new Date(v.created + "").getUTCDate()}</TableCell>
                                    <TableCell><Avatar
                                        src={"data:image/png;base64,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"}/></TableCell>
                                    <TableCell>{v.title}</TableCell>
                                    <TableCell><IconButton component={Link}
                                                           to={`/categories/${v._id}`}><MoreHoriz/></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
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
class Products extends React.Component {
  state = {
    ui: {
      create: {
        anchorEl: null
      }
    }
  };
  handleCreateButtonOpen = event => {
    event.persist();
    this.setState(state => {
      state.ui.create.anchorEl = event.currentTarget;
      return state;
    });
  };
  handleCreateButtonClose = () => {
    this.setState(state => {
      state.ui.create.anchorEl = null;
      return state;
    });
  };

  static contextType= AppContext
  render() {
    let anchorEl = this.state.ui.create.anchorEl;
    let open = Boolean(anchorEl);
    let { classes, theme } = this.props;
    return (
        <React.Fragment>
          <PageAppBar>
            <div>
              <Typography variant={"title"}>Categories</Typography>
            </div>
            <div>
              <ButtonBase style={{padding:"12px", color:"black"}}
                          to={"/categories/new"}
                          component={Link}>
                <Add/>
                <Typography color={""}> CREATE</Typography>
              </ButtonBase>
            </div>
          </PageAppBar>
          <div style={{ padding:"24px 24px" }}>
            <TableProductsView />
          </div>
        </React.Fragment>
    );
  }
}

export default withStyles(styles)(Products)
