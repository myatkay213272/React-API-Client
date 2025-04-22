// import React, { useEffect,useRef, useState } from 'react'
// import ReactDOM from 'react-dom/client'
// import ProductList from './components/ProductList';

// const App = () => {

//   const [category,setCategory] = useState('')

//   return (
//     <div>

//       <select className="form-select" onChange={(e)=>setCategory(e.target.value)}>
//             <option value=""></option>
//             <option value="Clothing">Clothing</option>
//             <option value="Household">Household</option>
//         </select>
//       <ProductList category={category}/>

//     </div>
//   )
// }

// export default App

import { AxiosError } from 'axios'
import { CanceledError } from './services/api-client'
import userService,{User} from './services/user-service'
import useUsers from './services/hooks/useUser'

const App = () => {

  const {users,error,isLoading,setUsers,setError} = useUsers()


  const deleteUser = (user)=>{
    const originalUsers = [...users]
    setUsers(users.filter(u=>u.id !== user.id))

    userService.delete(user.id)
      .catch(err =>{
        setError(err.message)
        setUsers(originalUsers)
      } )


  }


  const addUser = ()=>{
    const originalUsers = [...users]
    const newUser = {id:0,name:'Mosh'}
    setUsers([newUser,...users])

    userService.create(newUser)
      .then(({data : savedUser})=>setUsers([savedUser,...users]))
      .catch(err=>{
        setError(err.message)
        setUsers(originalUsers)
      })

  }


  const updateUser = (user)=>{
    const originalUsers = [...users]
    const updateUser = {...user,name:user.name + '!'}
    setUsers(users.map(u=>u.id === user.id ? updateUser : u))


    userService.update(updateUser)
      .catch(err=>{
        setError(err.message)
        setUsers(originalUsers)
      })
  }


  return (
    
   <>

   { error && <p className="text-danger">{error}</p>}
   
   {isLoading && <div className="spinner-border"></div>}

   <button className="btn btn-primary mb-3" onClick={addUser}>Add</button>

   <ul className='list-group'>

    {users.map((user)=>(
      
      <li key={user.id} className='list-group-item d-flex justify-content-between'>
        {user.name} 
      
      <div>
      <button className="btn btn-secondary mx-1"
              onClick={()=>updateUser(user)}>Update
      </button>

      <button className="btn btn-outline-danger" 
              onClick={()=>deleteUser(user)}>Delete
      </button>

      </div>

      </li>
    ))}
      
    </ul>


   </>

  )
}

export default App
