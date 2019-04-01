import axios from "axios"

const API_URL= `localhost:5000/api/store`

class DataSource{


    constructor(accessToken, storeId){
        this.storeId=storeId
        this.axios= axios.create({
            headers:{
                "X-auth-token": accessToken
            }
        })
    }
    getStoreProductCategories(){
        this.axios.get(`${API_URL}/${this.storeId}/product?categories=true`)
    }

    postStoreProductCategory(){

    }

    updateStoreProductCategory(){

    }
}