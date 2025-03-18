import React, {useEffect, useState, useContext} from 'react'
import UserContext, { UserDataContext } from '../context/UserContext' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const {user,setUser} = useContext(UserDataContext)

    useEffect(() => {
      if(!token){
        navigate('/login')
        return null
      }

      axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization : `Bearer ${token}`
        }
      }).then(response => {
        if(response.status === 200) {
          setIsLoading(false)
          setUser(response.data.user)
        }
      }).catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        navigate('/login')
      })

    }, [ token ])


    if(isLoading) {
      return (
        <div>Loading...</div>
      )
    }

  return (
    <>{children}</>
  )
}

export default UserProtectedWrapper