import apiClient from "./api-client";
// import { AxiosRequestConfig, CanceledError } from "axios";//extra

interface Entity {
    id:number
}

class HttpService{

    constructor(endpoint:string){
        this.endpoint = endpoint
    }

    getAll<T>(){
       
        const controller = new AbortController()

        const request= apiClient.get<T[]>(this.endpoint, {
            signal : controller.signal,
            // ...config
        })  
        
        return { request,cancel:()=>controller.abort()} }


     delete(id){
        return  apiClient.delete(this.endpoint + "/" + id)
     }

     create<T>(entity:T){
        return apiClient.post(this.endpoint,entity)
     }

     update<T extends Entity>(entity:T){
       return apiClient.patch(this.endpoint + "/" + entity.id,entity)
     }


    }

const Create = (endpoint : string)=> new HttpService(endpoint)

export default Create