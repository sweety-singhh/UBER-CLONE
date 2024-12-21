import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        // Get initial position
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
        });

        // Watch position changes
        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    // Update position dynamically every 10 seconds
    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                console.log('Position updated:', latitude, longitude);
                setCurrentPosition({ lat: latitude, lng: longitude });
            });
        };

        const intervalId = setInterval(updatePosition, 10000); // 10 seconds interval
        return () => clearInterval(intervalId);
    }, []);

    // Default icon fix for Leaflet
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <MapContainer
                center={currentPosition}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* Tile Layer from LocationIQ */}
                <TileLayer
                    url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`} // LocationIQ supports OSM
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={currentPosition}>
                    <Popup>
                        Current Location: <br />
                        Latitude: {currentPosition.lat}, Longitude: {currentPosition.lng}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default LiveTracking;



// import React, { useState, useEffect } from 'react'

// import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

// const containerStyle = {
//     width: '100%',
//     height: '100%',
// };

// const center = {
//     lat: -3.745,
//     lng: -38.523
// };

// const LiveTracking = () => {
//     const [ currentPosition, setCurrentPosition ] = useState(center);

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition({
//                 lat: latitude,
//                 lng: longitude
//             });
//         });

//         const watchId = navigator.geolocation.watchPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition({
//                 lat: latitude,
//                 lng: longitude
//             });
//         });

//         return () => navigator.geolocation.clearWatch(watchId);
//     }, []);

//     useEffect(() => {
//         const updatePosition = () => {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const { latitude, longitude } = position.coords;

//                 console.log('Position updated:', latitude, longitude);
//                 setCurrentPosition({
//                     lat: latitude,
//                     lng: longitude
//                 });
//             });
//         };

//         updatePosition(); // Initial position update

//         const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds

//     }, []);

//     return (
//         <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={currentPosition}
//                 zoom={15}
//             >
//                 <Marker position={currentPosition} />
//             </GoogleMap>
//         </LoadScript>
//     )
// }

// export default LiveTracking