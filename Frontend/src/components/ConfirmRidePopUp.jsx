import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const submithandler = async (e) => {
        e.preventDefault();
        try {
            if (!props.ride?._id || !otp) {
                alert('Invalid ride or OTP');
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
                {
                    rideId: props.ride._id,
                    otp: otp
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.status === 200) {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
                navigate('/captain-riding', {state: {ride: props.ride}});
            }
        } catch (error) {
            console.error('Error starting ride:', error);
            alert(error.response?.data?.message || 'Failed to start ride');
        }
    }

    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[100%]' onClick={() => {
                props.setRidePopupPanel(false)
                props.setConfirmRidePopupPanel(false)
            }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center justify-between gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://img.freepik.com/free-psd/close-up-kid-expression-portrait_23-2150193262.jpg" alt="" />
                    <h2 className='text-xl font-medium capitalize'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
                <form onSubmit={(e) => {
                    submithandler(e)
                }
                }>
                    <input onChange={(e) => {
                        setOtp(e.target.value)
                    }}
                    value={otp}
                    type="number" className='w-full rounded-lg font-mono text-xl bg-[#eee] px-6 py-3 mb-3' placeholder='Enter OTP'/>
                    <button  className='mt-5 w-full flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm </button>
                    <button
                        onClick={() => {
                            props.setRidePopupPanel(false)
                            props.setConfirmRidePopupPanel(false)
                        }}
                        className='mt-2 w-full bg-red-600 text-white-700 font-semibold p-3 rounded-lg'>Cancel</button>
                </form>
            </div>

        </div>
    )
}

export default ConfirmRidePopUp