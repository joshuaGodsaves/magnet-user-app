import axios from "axios"

const API_URL= `localhost:5000/api/store`

export default class DataSource{
    constructor(accessToken, storeId){
        this.API_URL= `http://localhost:5000/api/store`
        this.storeId=storeId
        this.axios= axios.create({
            headers:{
                "X-auth-license": accessToken
            }
        })
    }
    async getStoreCategories(){
        let categories =await  this.axios.get(`${this.API_URL}/${this.storeId}/category`)
        return categories;
    }

    async getStoreCategory(id){
        let category =await  this.axios.get(`${this.API_URL}/${this.storeId}/category/${id}`)
        return category;
    }

    async postStoreCategory(data){
        let result=  await this.axios.post(`${this.API_URL}/${this.storeId}/category`,data)
        if(result){
            return true
        }else{
            return false
        }
    }

    async updateStoreCategory(id, data){
        let result=  await this.axios.put(`${this.API_URL}/${this.storeId}/category/${id}`,data)
        if(result){
            return true
        }else{
            return false
        }
    }
    async getStoreProducts(){
        let categories =await this.axios.get(`${this.API_URL}/${this.storeId}/product`)

        return categories;
    }

    async postStoreProduct(data){
        let result=  await this.axios.post(`${this.API_URL}/${this.storeId}/product`,data)
        if(result){
            return true
        }else{
            return false
        }
    }

    async updateStoreProduct(id, data){
        let result=  await this.axios.put(`${this.API_URL}/${this.storeId}/product/${id}`,data)
        if(result){
            return true
        }else{
            return false
        }
    }

    async getStoreCustomers(){
        let customers = await  this.axios.get(`${this.API_URL}/${this.storeId}/customer`)
        console.log(customers)
        return customers;
    }

    async createEPCustomer(data){
        let result=  await this.axios.post(`http://localhost:5000/api/user`,data)
        if(result){
            return result.data
        }else{
            return false
        }
    }

    async getUser(id){
        let result=  await this.axios.get(`http://localhost:5000/api/user/${id}`)
        if(result){
            return result.data
        }else{
            return false
        }
    }

    async postStoreCustomer(data){
        let result=  await this.axios.post(`${this.API_URL}/${this.storeId}/customer`,data)
        console.log(result)
        if(result){
            return result.data
        }else{
            return false
        }
    }
    async postStoreTransaction(data){
        let result=  await this.axios.post(`${this.API_URL}/${this.storeId}/transaction`,data)
        if(result){
            return result.data
        }else{
            return false
        }
    }

    async getStoreTransactions(){
        let customers =await  this.axios.get(`${this.API_URL}/${this.storeId}/transaction`)
        return customers;
    }

}