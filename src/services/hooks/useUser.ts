import { useState ,useEffect} from "react"
import { User }from "../services/user-service"
import {CanceledError} from '../services/api-client'
import userService from "../services/user-service"


const useUsers = () => {
 
const [users,setUsers] = useState<User[]>([])
  const [error,setError] = useState('')
  const [isLoading,setLoading] = useState(true)


  useEffect(()=>{

    const {request,cancel} =userService.getAll<User>()
    request.then(res=>{
      setUsers(res.data)
      setLoading(false)
    })
    .catch(err=>{
      if(err instanceof CanceledError) return
      setError(err.message)
      setLoading(false)
    })

    return ()=>cancel()

  },[])

  return {users,error,isLoading,setError,setUsers}

}

export default useUsers
