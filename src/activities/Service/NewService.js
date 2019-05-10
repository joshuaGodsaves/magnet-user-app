import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import FilledInput from "@material-ui/core/FilledInput";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  Button,

} from "@material-ui/core";
import PageAppBar from "../../components/ActivityPrimaryAppBar";

let styles = {
  primaryFormArea: {
    padding: "16px 32px"
  },
  rootFormControls: {
    margin: "8px 0"
  },
  toolbar: {
    width: "100%",
    background: "white",
    border: ".5px sold #404040",
    display: "flex",
    justifyContent: "space-between"
  },
  ymargin: {
    marginTop: 16,
    marginBottom: 16
  },
  hide: {
    display: "hidden"
  }
};

class Service extends React.Component {
  state = {
    newProduct: {
      tags: [],
      title: undefined,
      description: undefined,
      price: {
        upperBound: undefined,
        lowerBound: undefined
      }
    },
    ui: {
      createCategoryDialog: false
    }
  };
  handleSubmit = e => {
    let doc = document;

  };

  render() {
    let { classes } = this.props;
    return (
      <React.Fragment>
        <PageAppBar>
          <div>
            <Typography variant={"title"}>New Service</Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Button
              variant={"contained"}
              size={"medium"}
              style={{
                marginLeft: 8,
                marginRight: 8
              }}
              onClick={this.handleSubmit}
            >
              Save Service
            </Button>
          </div>
        </PageAppBar>

        <Grid container style={{ padding: "8px 8px" }} justify={"center"}>
          <Grid item md={8} xs={12} sm={12} lg={10}>
            <FormControl fullWidth style={{ margin: "16px 0px" }}>
              <InputLabel>Service Tile </InputLabel>
              <Input />
            </FormControl>
            <div
              style={{ background: "ghostwhite", height: "500px", padding: 16 }}
            >
              <CKEditor
                editor={ClassicEditor}
                onChange={() => {}}
                style={{ height: "100%" }}
              />
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Service);
