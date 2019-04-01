import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import {
  FormControlLabel,
  Button,
  Toolbar,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  AppBar,
  MenuItem,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
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

class NewProduct extends React.Component {
  state = {};
  handleCategoryChange = event => {};
  handleTagInput = e => {
    e.persist();
    let string = e.currentTarget.value;
    console.log(string.split(" "));
  };
  handleSubmit = e => {};
  render() {
    let { classes } = this.props;
    return (
      <React.Fragment>
        <PageAppBar>
          <div>
            <Typography variant={"title"}>Post Page</Typography>
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
              Save Post
            </Button>
          </div>
        </PageAppBar>

        <Grid container style={{ padding: "8px 8px" }} justify={"center"}>
          <Grid item md={8} xs={12} sm={12} lg={10}>
            <FormControl fullWidth style={{ margin: "16px 0px" }}>
              <InputLabel> Post title </InputLabel>
              <Input />
            </FormControl>
            <Toolbar style={{ background: "orange" }} />
            <div
              style={{ background: "ghostwhite", height: "500px", padding: 16 }}
              contentEditable
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NewProduct);
