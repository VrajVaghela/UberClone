import React, { useEffect, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const navigate = useNavigate()
    const { socket } = useContext(SocketContext)
    const [userLocation, setUserLocation] = useState(null)
    const [captainLocation, setCaptainLocation] = useState(null)

    useEffect(() => {
        if (!socket || !ride?._id) {
            navigate('/home');
            return;
        }        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const location = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        setUserLocation(location);
                        
                        socket.emit('user-location-update', {
                            rideId: ride._id,
                            location: location
                        });
                    },
                    error => {
                        console.error('Error getting location:', error);
                    }
                );
            }
        };

        const locationInterval = setInterval(updateLocation, 2000);
        updateLocation(); // Initial update

        // Listen for captain location updates
        socket.on('captain-location-update', (data) => {
            if (data.rideId === ride._id) {
                setCaptainLocation({
                    lat: data.location.lat,
                    lng: data.location.lng
                });
            }
        });

        socket.on('ride-ended', () => {
            clearInterval(locationInterval);
            socket.off('captain-location-update');
            socket.off('ride-ended');
            navigate('/home');
        });

        return () => {
            clearInterval(locationInterval);
            socket.off('captain-location-update');
            socket.off('ride-ended');
        };
    }, [socket, ride, navigate]);

    if (!ride) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">No active ride found</h2>
                    <button
                        onClick={() => navigate('/home')}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="h-full">
                <LiveTracking
                    userLocation={userLocation}
                    captainLocation={captainLocation}
                />
            </div>
        </div>
    );
};

export default Riding;