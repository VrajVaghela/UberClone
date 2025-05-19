import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
  const navigate = useNavigate()

  async function endRide(e) {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {   
        rideId: props.ride._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(response.status === 200){
        // props.setFinishRidePanel(false)
        // props.setRidePopupPanel(false)
        navigate('/captain-home')
      }
    } catch (error) {
      console.error('Error ending ride:', error)
    }
  }

  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[100%]' onClick={() => {
        // props.setRidePopupPanel(false)
        // props.setConfirmRidePopupPanel(false)
      }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Finish the ride</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center justify-between gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src="https://img.freepik.com/free-psd/close-up-kid-expression-portrait_23-2150193262.jpg" alt="" />
          <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>

      <div className='flex gap-2 justify-between flex-col items-start w-full'>

        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200 w-full'>
          <i className='text-lg ri-map-pin-user-fill'></i>
          <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200 w-full'>
          <i className='text-lg ri-map-pin-2-fill'></i>
          <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3'>
          <i className='text-lg ri-currency-line'></i>
          <div>
            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <button onClick={(e) => {
          endRide(e)
        }}  className='mt-10 w-full flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</button>
      </div>

    </div>
  )
}

export default FinishRide