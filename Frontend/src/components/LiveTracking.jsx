import React, { useEffect, useState, useContext } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { SocketContext } from '../context/SocketContext'

const containerStyle = {
    width: '100%',
    height: '100%'
};

const LiveTracking = ({ ride }) => {
    const [currentPosition, setCurrentPosition] = useState(null)
    const [error, setError] = useState(null)
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported')
            return;
        }

        // Get initial position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                setCurrentPosition({ lat, lng });
            },
            (error) => setError('Error getting location: ' + error.message)
        );

        // Watch position changes
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                setCurrentPosition({ lat, lng });
                
                // Emit location update if we're tracking
                if (ride && socket) {
                    socket.emit('location-update', {
                        rideId: ride._id,
                        location: { lat, lng }
                    });
                }
            },
            (error) => setError('Error tracking location: ' + error.message)
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [ride, socket]);

    if (error) return <div className="text-red-500 p-4">{error}</div>;
    if (!currentPosition) return <div className="p-4">Loading map...</div>;

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    );
}

export default LiveTracking;