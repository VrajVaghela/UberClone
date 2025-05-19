import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../components/LiveTracking'
import axios from 'axios'

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const ridePopupPanelref = useRef(null)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const confirmRidePopupPanelref = useRef(null)

  const [ride, setRide] = useState(null)
  const [captainLocation, setCaptainLocation] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
          setCaptainLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        }, error => {
          console.error("Error fetching location:", error);
        })
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

    const locationInterval = setInterval(updateLocation, 1000)
    updateLocation()

  })

  socket.on('new-ride', (data) => {
    setRide(data)
    setRidePopupPanel(true)
  })

  async function confirmRide() {
    try {
      if (!ride?._id) {
        console.error('No ride selected');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: ride._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data) {
        setRide(response.data);
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
      }
    } catch (error) {
      console.error('Error confirming ride:', error);
      alert(error.response?.data?.message || 'Failed to confirm ride');
    }
  }

  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelref.current, {
        transform: 'translateY(0)'
      })

    } else {
      gsap.to(ridePopupPanelref.current, {
        transform: 'translateY(100%)'
      })

    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelref.current, {
        transform: 'translateY(0)'
      })

    } else {
      gsap.to(confirmRidePopupPanelref.current, {
        transform: 'translateY(100%)'
      })

    }
  }, [confirmRidePopupPanel])

  return (
    <div className='h-screen'>
      <div className='flex items-center justify-between fixed p-3 top-0 w-full z-10 bg-white/80 backdrop-blur-sm'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-logout' className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md'>
          <i className='text-lg font-medium ri-logout-box-r-line' />
        </Link>
      </div>
      <div className='h-3/5'>
        {captainLocation && (
          <LiveTracking
            userLocation={null}
            captainLocation={captainLocation}
          />
        )}
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelref} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUp ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} confirmRide={confirmRide} />
      </div>
      <div ref={confirmRidePopupPanelref} className='h-screen fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome