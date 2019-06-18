import React from "react"
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import {CloudUpload as UploadIcon, Link as LinkIcon, SelectAll as SelectIcon, ArrowDropDown} from "@material-ui/icons";
import ArrowDownward from "@material-ui/core/es/internal/svg-icons/ArrowDownward";

export function  InfoComponentForSectionIcon(){
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ArrowDownward/>}>
                <Typography>Important note</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Setting sections icons is import for easy accessibility of your section in your site.
                    it is used to represent graphically on your site what the section is all about
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}