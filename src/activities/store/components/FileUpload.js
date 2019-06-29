import React from "react"
import axios from "axios"
import { APIURL } from './../../../DataSource';
import StoreContext from "../StoreContext"

export default class Component extends React.Component{

    static contextType= StoreContext
    state= {
        file: undefined,
        selectFile: false,
        link: undefined
    }
    onSelectFile=async  (e)=>{
        e.persist()
        alert("selected")
        this.setState({file: e.target.files[0]})
        let formdata= new FormData()
        formdata.append("file", this.state.file)
        try{
            this.onUpload()
            let result =await axios.post(`${APIURL}/store/${this.context.store.id}/upload`, formdata, {data:"multipath/formdata"})
            if(result.data){
                this.setState({link: result.data})
                this.onFinish()
            }
        }catch (e) {
            this.onError()
        }
    }

    onUpload = ()=> {
        this.props.onUpload(this.state.link)
    }
    onFinish = ()=>{
        this.props.onFinish(this.state.link)
    }
    onError= ()=>{
        this.props.onError()
    }

    componentWillMount() {
        this.setState({selectFile: this.props.triggerSelectFile})
    }
    componentDidMount() {
        document.getElementById("fileSelectorElement").addEventListener('onclick',function () {
            alert("clicked me")
        })

        console.log( document.getElementById("fileSelectorElement"))

        if(this.state.selectFile){
            document.getElementById("fileSelectorElement").click()
        }
    }

    render(){
        return <input  type="file" name=""  onChange={this.onSelectFile}  id={"fileSelectorElement"} hidden/>
    }
}