import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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
        <div style={{ width: '100%', height: '40vh' }}>
            <MapContainer
                center={currentPosition}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <UpdateView center={currentPosition} zoom={15} />
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

const UpdateView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

export default LiveTracking;