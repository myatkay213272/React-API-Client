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



import userService,{User} from './services/user-service'
import useUsers from './hooks/useUsers'

const App = () => {

  const {users,error,isLoading,setError,setUsers} = useUsers()


const deleteUser = (user:User)=>{
  const originalUsers = [...users]
  setUsers(users.filter(u=>u.id !== user.id))

  userService.delete(user.id)
  .catch(err=>{
    setError(err.message)
    setUsers(originalUsers)
  })
}


const addUser = ()=>{
  const originalUsers = [...users]
  const newUser = {
    id:0,
    name:'kk'
  }
  setUsers([newUser,...users])

    userService.create(newUser)
    // .then(res=>{
      // Replace the fake newUser with the one returned from server
      // const finalUsers = [res.data,...users]
      // setUsers(finalUsers)}

      .then(({data:savedUser})=>setUsers([savedUser,...users]))
      .catch(err=>{
        setError(err.message)
        setUsers(originalUsers)
      })
}



const updateUser = (user: User)=>{
  const originalUsers = [...users]
  const updatedUser = {...user,name:user.name + '!'}
  setUsers(users.map(u=>u.id === user.id ? updatedUser : u))

 
  userService.update(updatedUser)
    .catch(err=>{
      setError(err.message)
      setUsers(originalUsers)
    })

}


  return (

    <>

    { isLoading && <div className="spinner-border"></div>}
   {error && <p className="text-danger">{error}</p>}

   <button 
    className="btn btn-primary mb-3"
    onClick={addUser}
  >Add</button>

    <ul className='list-group'>
      {users.map((user)=>(
        <li className='list-group-item d-flex justify-content-between' key={user.id}>
          {user.name}

        
        <div>
          <button 
            className="btn btn-outline-secondary mx-1"
            onClick={()=>updateUser(user)}
          >Update</button>
          
          <button 
            className="btn btn-outline-danger"
            onClick={()=>deleteUser(user)}
          >Delete</button>
        </div>
        
        </li>
      ))}
    </ul>
    </>

  )
}

export default App
