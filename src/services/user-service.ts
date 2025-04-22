import apiClient from "./api-client";
import Create from "./http-service";

export interface User{
    id:number;
    name:string
}


export default  Create('/users')
