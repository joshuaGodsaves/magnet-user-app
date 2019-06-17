import React from "react";
import {
  GridListTileBar,
  GridListTile,
  GridList,
  Tabs,
  Tab,
  Grid,
  Toolbar,
  InputBase
} from "@material-ui/core";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import PageAppBar from "../../components/ActivityPrimaryAppBar";
import Typography from "@material-ui/core/Typography";

function AssetContent() {
  return <React.Fragment />;
}

function UploadsContent() {
  return <React.Fragment />;
}

class Asset extends React.Component {
  state = {
    externalImages: [],
    query: "Search for images"
  };
  getResources = () => {
    axios
      .get("https://api.pexels.com/v1/search", {
        params: {
          query: this.state.query
        },
        headers: {
          Authorization:
            "563492ad6f91700001000001a98eefa89e00425daa33c7549ea0553f"
        }
      })
      .then(val => {
        console.log(val);
        this.setState(state => {
          console.log("about to set state");
          state.externalImages = val.data.photos;
          return state;
        });
      })
      .catch(v => {
        if (v) {
          //alert(v)
        }
      });
  };
  componentDidMount() {
    this.getResources();
  }
  handleQueryChange = event => {
    event.persist();
    this.setState({ query: event.currentTarget.value });
    this.getResources();
  };
  loadExternalPexelImages = () => {
    let components = this.state.externalImages.map(v => {
      return (
        <GridListTile cols={1}>
          <img src={v.src.medium} style={{ width: "100%" }} />
        </GridListTile>
      );
    });
    return components;
  };

  render() {
    let externalImages = this.loadExternalPexelImages();

    let currentTabIndex;
    return (
      <React.Fragment>
        <PageAppBar>
          <Typography variant={"title"}>Assets</Typography>
          <Tabs value={currentTabIndex} style={{ padding: 0 }}>
            <Tab label={"External Assets"} />
            <Tab label={"Uploads"} />
          </Tabs>
        </PageAppBar>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "sticky"
          }}
        >
          <Paper style={{ width: "auto", padding: "8px 32px" }}>
            <InputBase
              value={this.state.query}
              onChange={this.handleQueryChange}
              style={{ width: "300px" }}
            />
          </Paper>
        </Toolbar>
        <GridList cols={4} cellHeight={"auto"}>
          {externalImages}
        </GridList>
      </React.Fragment>
    );
  }
}

export default Asset;
