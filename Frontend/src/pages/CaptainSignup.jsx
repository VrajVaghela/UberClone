import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [captainData, setCaptainData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      fullName:{
        firstName,
        lastName
      },
      email,
      password
    })
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')

  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-10' src="https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png" alt="" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }} >

          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-5' >
            <input type="text"
              className='bg-[#eeeeee]  rounded px-4 py-2  w-1/2 text-lg placeholder:text-base'
              required
              value = {firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First name' />
            <input type="text"
              className='bg-[#eeeeee]  rounded px-4 py-2  w-1/2 text-lg placeholder:text-base'
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last name' />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input type="email"
            className='bg-[#eeeeee] mb-5  rounded px-4 py-2  w-full text-lg placeholder:text-base'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Enter password</h3>
          <input type="password"
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password' />
          <button
            className='bg-[#111] text-white mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>
        </form>
        <p className='text-center'>Already have a account?
          <Link to='/captain-login' className='text-blue-600'>Login here</Link>
        </p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, whatsapp or SMS messages, including by automated means, from Uber and its affiliates to the number provided</p>
      </div>
    </div>
  )
}

export default CaptainSignup