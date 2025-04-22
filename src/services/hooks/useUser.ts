import { useState,useEffect } from "react"
import userService,{User} from "../user-service"
import { CanceledError } from "../api-client";
import { AxiosError } from "axios";


const useUsers = ()=>{

      const [users,setUsers] = useState<User[]>([])
      const [error,setError] = useState('')
      const [isLoading,setIsLoading] = useState(true)
    
      useEffect(()=>{
    
            setIsLoading(true)
    
            const {request,cancel} =  userService.getAll<User>()
            request
            .then((res)=>{
              setUsers(res.data)
              setIsLoading(false)
            })
          
          .catch((err)=>{
    
            if(err instanceof CanceledError) return
    
            setError((err as AxiosError).message)
            setIsLoading(false)
          })
        
        return ()=> cancel()
    
        //get-> await promis -> res/err
    
      },[])

      return {users,error,isLoading,setUsers,setError}

}

export default useUsers