import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [captainData, setCaptainData] = useState({})


  const { captain, setCaptain } = useContext(CaptainDataContext)
  const [vehicleColor, setVehicleColor] = useState('')
  const [vechiclePlate, setVechiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vechiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVechiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

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
              value={firstName}
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


          <h3 className='text-lg font-medium mb-7'>Vehicle Information</h3>
          <div className='flex gap-4 mb-5'>
            <input type="text"
              className='bg-[#eeeeee]  rounded px-4 py-2 w-1/2 text-lg placeholder:text-base'
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder='Vehicle Color'
            />
            <input type="text"
              className='bg-[#eeeeee]  rounded px-4 py-2 w-1/2 text-lg placeholder:text-base'
              required
              value={vechiclePlate}
              onChange={(e) => setVechiclePlate(e.target.value)}
              placeholder='Vehicle Plate'
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input type="number"
              className='bg-[#eeeeee]  rounded px-4 py-2 w-1/2 text-lg placeholder:text-base'
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder='Vehicle Capacity'
            />

            <select
              className='bg-[#eeeeee]  rounded px-4 py-2 w-1/2 text-lg placeholder:text-base'
              required
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Vehicle Type</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="car">Car</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
          >Create Account</button>
        </form>
        <p className='text-center'>Already have a account?
          <Link to='/captain-login' className='text-blue-600'>Login here</Link>
        </p>
      </div>
      {/* <div>
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, whatsapp or SMS messages, including by automated means, from Uber and its affiliates to the number provided</p>
      </div> */}
    </div>
  )
}

export default CaptainSignup