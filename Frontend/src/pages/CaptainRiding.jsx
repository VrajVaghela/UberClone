import { useGSAP } from '@gsap/react'
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import gsap from 'gsap'

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })

        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })

        }
    }, [finishRidePanel])
    return (
        <div className='h-screen'>
            <div className='flex items-center justify-between fixed p-3 top-0 w-full'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className='fixed h-10 w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-lg font-medium ri-logout-box-r-line' />
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div
                onClick={() => {
                    setFinishRidePanel(true)
                }}
                className='relative h-1/5 p-6 bg-yellow-400 flex items-center justify-between'>
                <h5 className='p-1 text-center absolute top-0 w-[93%]' ><i  className='text-3xl text-black-200 ri-arrow-up-wide-line'></i></h5>
                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button className='mt-1 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className=' fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
                <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding