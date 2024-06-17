GeoMapper
GeoMapper is a React-based application that displays the current location of the user on a map. It also allows users to search for locations by city name, country name, or specific coordinates, and view these locations on the map.

Deployment
The project is deployed and can be accessed at: GeoMapper on Vercel

Features
Current Location: Automatically detects and displays the user's current location using the Geolocation API.
Search by City: Users can input a city name to display its location on the map.
Search by Country: Users can input a country name to display its location on the map.
Search by Coordinates: Users can input latitude and longitude to display the specific coordinates on the map.
Technology Stack
React: Frontend library for building the user interface.
React-Leaflet: Integration of Leaflet with React for interactive maps.
Leaflet: JavaScript library for interactive maps.
Nominatim API: Used for geocoding and reverse geocoding.
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/your-username/geo-mapper.git
cd geo-mapper
Install dependencies:

sh
Copy code
npm install
Start the development server:

sh
Copy code
npm start
Open your browser and navigate to [http://localhost:3000.](https://geo-mapper-neon.vercel.app/)

Usage
On load, the application will request permission to access your location. If granted, it will display your current location on the map.
To search for a city, enter the city name in the input field and click "Show City on Map".
To search for a country, enter the country name in the input field and click "Show Country on Map".
To search by coordinates, enter the latitude and longitude in the respective fields and click "Show Coordinates on Map".
Code Overview
CurrentLocation.js
This is the main component of the application. It handles:

Fetching and displaying the user's current location.
Managing the input fields for city, country, and coordinates.
Fetching location data from the Nominatim API based on user input.
Updating the map view based on the fetched data.
Key Parts of the Code:
Geolocation API: Used to get the user's current location.

javascript
Copy code
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Handle success
      },
      (err) => {
        setError(err.message);
      }
    );
  } else {
    setError('Geolocation is not supported by this browser.');
  }
}, []);
Nominatim API: Used for reverse geocoding and searching locations by city or country name.

javascript
Copy code
const handleCityButtonClick = async () => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${inputLocation.city}&format=json&limit=1`);
    const data = await response.json();
    // Handle response
  } catch (err) {
    setError('Error fetching location data');
  }
};
React-Leaflet: Used to render the map and update the view based on the location data.

javascript
Copy code
<MapContainer center={[location.latitude, location.longitude]} zoom={location.zoomLevel} style={{ height: '400px', width: '100%' }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
  <SetViewOnClick coords={[location.latitude, location.longitude]} locationName={location.locationName} zoomLevel={location.zoomLevel} />
</MapContainer>
Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

License
This project is licensed under the MIT License
