import React, {useEffect,useState, useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const {captain, setCaptain} = useContext(CaptainDataContext)

    useEffect(() => {
      if(!token){
        navigate('/captain-login')
        return null
      }
    
      axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then(response=>{
          if(response.status === 200) {
              setCaptain(response.data.captain)
              setIsLoading(false)
          }
      })
      .catch(err=>{
          console.log(err)
          localStorage.removeItem('token')
          navigate('/captain-login')
      })
    
    }, [ token ])

    if (isLoading){
        return (
            <div>Loading...</div>
        )
    }

  return (
    <>{children}</>
  )
}

export default CaptainProtectedWrapper