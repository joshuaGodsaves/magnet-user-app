import React from "react";

import {ButtonBase, LinearProgress} from "@material-ui/core";
import axios from 'axios'
import AppContext from "../AppContext"

export default class Uploader extends React.Component {
    constructor(props){
        super(props)
    }
    static  contextType= AppContext
    state = {
        file: undefined,
        url: undefined,
        sent: false,
        finishedUpload: false
    };

    watchFileChange = event => {
        event.persist();
        //let reader= new FileReader()
        //console.log(event.target.files[0])
        //reader.readAsDataURL(event.target.files[0])
        // Upload immediatly here
        let formData= new FormData()
        formData.append("file",event.target.files[0])
        axios.post(`http://localhost:5000/api/store/${this.context.user.store}/upload`, formData).then(v=>{
            this.props.onUploadEnd()
            this.setState({finishedUpload: true});
        })
        this.setState({file: event.target.files[0], sent: true});
    };
    render() {
        let preview= (
            <div style={{width:"224px", height:240, background:"ghostwhite"}}>
            </div>
        )
        let compo = (
            <React.Fragment>
                <div style={{ display:"flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                    {this.props.noPreview ==true ? "" : preview}
                    <div
                        style={{
                            margin:"16px 0",
                            width: 200,
                            overflow: "hidden",
                            padding: "24px 24px",
                            border: "1px solid black",
                            position: "relative"
                        }}
                    >
                        <ButtonBase
                            style={{
                                width: "100%",
                                padding: "16px",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: "100%",
                                background: "white"
                            }}
                            onClick={() => {
                                document.getElementById("uploader-file").click();
                            }}
                        >
                            Upload Image
                        </ButtonBase>
                        <input
                            type={"file"}
                            id={"uploader-file"}
                            onChange={this.watchFileChange}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
        let onUploaded= (this.state.finishedUpload == true ? " " : <LinearProgress/>)

        let view=  this.state.sent? onUploaded : compo

        return view
    }
}
