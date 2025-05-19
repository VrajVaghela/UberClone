import React, { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

function Home() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null)
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)
  const confirmRidePanelRef = useRef(null)
  const [vehicleFound, setVehicleFound] = useState(false)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [activeField, setActiveField] = useState()
  const [fares, setFares] = useState({
    car: 0,
    moto: 0,
    auto: 0
  })
  const [vehicleType, setvehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!socket || !user?._id) return;

    socket.on('ride-confirmed', ride => {
      setVehicleFound(false);
      setWaitingForDriver(true);
      setRide(ride);  // Make sure to store the full ride object
      console.log('Ride confirmed with data:', ride);  // Debug log
    });

    return () => {
      socket.off('ride-confirmed');
    };
  }, [socket, user]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join", { userType: "user", userId: user._id });

    socket.on('ride-started', (ride) => {
      setWaitingForDriver(false);  
      navigate('/riding', { state: { ride } });
    });

    return () => {
      socket.off('ride-started');
    };
  }, [socket, user._id, navigate]);

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const handlePickupChange = async (e) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setSuggestions(response.data)
    } catch (error) {
      console.error('Error fetching pickup suggestions:', error);
    }
  }

  const handleDestinationChange = async (e) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setSuggestions(response.data)
    } catch (error) {
      console.error('Error fetching pickup suggestions:', error);
    }
  }

  useEffect(() => {
    const getFares = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
          params: {
            pickup: pickup,
            destination: destination
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (response.data && typeof response.data === 'object') {
          setFares(response.data)
        } else {
          throw new Error('Invalid fare data received')
        }
      } catch (err) {
        console.error("Error fetching fares:", err)
        throw new Error('Error fetching fares')
      }
    }

    if (pickup && destination) {
      getFares()
    }
  }, [pickup, destination])

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

    console.log(response.data)
  }



  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [panelOpen]);

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        y: '0%',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        y: '100%',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [vehiclePanel]);

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        y: '0%',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        y: '100%',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [confirmRidePanel]);

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        y: '0%',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        y: '100%',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [vehicleFound]);

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        y: '0%',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        y: '100%',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [waitingForDriver]);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5 z-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      
      {/* Map Container */}
      <div className='absolute inset-0'>
        <LiveTracking />
      </div>

      {/* UI Overlay */}
      <div className='absolute inset-0 flex flex-col justify-end pointer-events-none'>
        <div className='pointer-events-auto'>
          <div className='bg-white p-5 relative'>
            <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)}
              className='absolute opacity-0 right-6 top-6 text-2xl'>
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>
            <form onSubmit={(e) => {
              submitHandler(e)
            }}>
              <div className="line absolute h-16 top-[45%] left-10 w-1 bg-gray-900 rounded-full"></div>
              <input
                onClick={() => {
                  setPanelOpen(true)
                }}
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value)
                  handlePickupChange(e)
                  setActiveField("pickup")
                }}
                className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
              <input
                onClick={() => {
                  setPanelOpen(true)
                }}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value)
                  handleDestinationChange(e)
                  setActiveField("destination")
                }}
                className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
            </form>
          </div>
          <div ref={panelRef} className='bg-white h-0 overflow-hidden'>
            <LocationSearchPanel setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen} suggestions={suggestions}
              setDestination={setDestination} setPickup={setPickup} destination={destination} pickup={pickup} activeField={activeField}
            />
          </div>
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePanel setVehiclePanel={setVehiclePanel} setvehicleType={setvehicleType} vehicleType={vehicleType} createRide={createRide} fares={fares} pickup={pickup} destination={destination} setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmedRide setvehicleType={setvehicleType} vehicleType={vehicleType} createRide={createRide} fares={fares} pickup={pickup} destination={destination} setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver} />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver setvehicleType={setvehicleType} vehicleType={vehicleType} createRide={createRide} fares={fares} pickup={pickup} destination={destination} setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <WaitingForDriver 
          ride={ride} 
          setWaitingForDriver={setWaitingForDriver} 
        />
      </div>
    </div>
  )
}

export default Home