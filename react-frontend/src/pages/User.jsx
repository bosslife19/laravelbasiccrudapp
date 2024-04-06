import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
function User() {

  const [users, setUsers] = useState()

  const [loading, setLoading] = useState(false)

  const{setNotification} = useStateContext();
  const getUsers = async ()=>{
    setLoading(true);
    try {
      const {data} = await axiosClient.get('/users')

      console.log(data)
      setLoading(false)
      setUsers(data.data);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(()=>{
    getUsers();
  }, [])

  const handleDelete = (user)=>{
    if(!window.confirm('Are you sure you want to delete this user?')){
      return
    }

    axiosClient.delete(`/users/${user.id}`).then(()=>{
      // todo show notification

      setNotification("User was successfully deleted")
      

      setUsers((prev)=>prev.filter(item=>item.id !== user.id));
    })
  }
  return (
    <div>
      <div style={{display:'flex', justifyContent:"space-between", alignItems:"center"}}>
        <h1>Users</h1>
        <Link to='/users/new' className='btn-add'>Add new</Link>
      </div>

      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {
            loading &&
            <tbody>

            <tr>
              <td colSpan='5' className='text-center'>
                Loading
              </td>
            </tr>
          </tbody>
          } 
          
          <tbody>
            {
             users && users?.map(user=>(
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.create_at}</td>
                  <td>
                    <Link to={'/users/'+user.id} className='btn-edit'>Edit</Link>
                    &nbsp;
                    <button onClick={(e)=>handleDelete(user)} className='btn-delete'>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User