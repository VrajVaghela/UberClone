import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainLogin = () => {
   const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {captain, setCaptain} = useContext(CaptainDataContext)
    const navigate = useNavigate()
  
    const submitHandler = async (e) => {
      e.preventDefault()
      const captain = {
        email : email,
        password : password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

      if(response.status === 200)
      {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }

      setEmail('')
      setPassword('')
    }
  

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <img className='w-16 mb-10' src="https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png" alt="" />
      <form onSubmit={submitHandler} >
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input type="email"
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email@example.com'/>
        <h3  className='text-lg font-medium mb-2'>Enter password</h3>
        <input type="password" 
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password' />
        <button
        className='bg-[#111] text-white mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        >Login</button> 
      </form>
      <p className='text-center'>Join a fleet?
      <Link to='/captain-signup' className='text-blue-600'> Register as a Captain</Link>
      </p>
      </div>
      <div>
        <Link to='/login'
        className='bg-[#ff5303] flex items-center justify-center text-white mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin