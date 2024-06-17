import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './CurrentLocation.css'; // Import the CSS file

// Fix the default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const SetViewOnClick = ({ coords, locationName, zoomLevel }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, zoomLevel);
    }
  }, [coords, map, zoomLevel]);
  return coords ? (
    <Marker position={coords}>
      <Popup>{locationName}</Popup>
    </Marker>
  ) : null;
};

const CurrentLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null, locationName: '', zoomLevel: 13 });
  const [inputLocation, setInputLocation] = useState({ latitude: '', longitude: '', city: '', country: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await response.json();
            const locationName = `${data.address.city || data.address.town || data.address.village || ''}, ${data.address.country}`;
            setLocation({
              latitude,
              longitude,
              locationName: locationName || 'Your Location',
              zoomLevel: 13,
            });
          } catch (err) {
            setError('Error fetching location data');
          }
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCityButtonClick = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${inputLocation.city}&format=json&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon), locationName: display_name, zoomLevel: 12 });
      } else {
        setError('Location not found');
      }
    } catch (err) {
      setError('Error fetching location data');
    }
  };

  const handleCountryButtonClick = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${inputLocation.country}&format=json&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon), locationName: display_name, zoomLevel: 3 });
      } else {
        setError('Location not found');
      }
    } catch (err) {
      setError('Error fetching location data');
    }
  };

  const handleCoordinatesButtonClick = () => {
    setLocation({
      latitude: parseFloat(inputLocation.latitude),
      longitude: parseFloat(inputLocation.longitude),
      locationName: inputLocation.city || inputLocation.country || 'Custom Location',
      zoomLevel: 13,
    });
  };

  return (
    <div>
      <h1><u>GeoMapper</u></h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="input-container">
            <input
              type="text"
              name="city"
              placeholder="Enter city name"
              value={inputLocation.city}
              onChange={handleInputChange}
            />
            <button onClick={handleCityButtonClick}>Show City on Map</button>
          </div>

          <div className="input-container">
            <input
              type="text"
              name="country"
              placeholder="Enter country name"
              value={inputLocation.country}
              onChange={handleInputChange}
            />
            <button onClick={handleCountryButtonClick}>Show Country on Map</button>
          </div>

          <div className="input-container">
            <input
              type="text"
              name="latitude"
              placeholder="Enter latitude"
              value={inputLocation.latitude}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="longitude"
              placeholder="Enter longitude"
              value={inputLocation.longitude}
              onChange={handleInputChange}
            />
            <button onClick={handleCoordinatesButtonClick}>Show Coordinates on Map</button>
          </div>
          {location.latitude && location.longitude && (
            <div className="map-container">
              <MapContainer center={[location.latitude, location.longitude]} zoom={location.zoomLevel} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <SetViewOnClick coords={[location.latitude, location.longitude]} locationName={location.locationName} zoomLevel={location.zoomLevel} />
              </MapContainer>
              <div className="coordinates">
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
                <p>Location: {location.locationName}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentLocation;
