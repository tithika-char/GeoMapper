# GeoMapper

A React-based web application that allows users to view their current location on a map and search for locations by city name, country name, or coordinates.

## Overview

GeoMapper is a user-friendly application designed to provide location-based services using interactive maps. It leverages the power of React and Leaflet to display maps and fetch location data from the Nominatim API.

**Live Demo**: Check out the live demo of GeoMapper [here](https://geo-mapper-neon.vercel.app/).

## Features

- **Current Location**: Automatically detects and displays the user's current location.
- **Search by City**: Input a city name to display its location on the map.
- **Search by Country**: Input a country name to display its location on the map.
- **Search by Coordinates**: Input latitude and longitude to display specific coordinates on the map.
- **Interactive Map**: Provides an interactive map with zoom and marker functionalities.
- **Responsive Design**: Ensures a seamless experience across different devices.

## Code Structure

- **index.html**: The entry point of the application.
- **CurrentLocation.js**: The main React component handling location display and search functionalities.
- **style.css**: The CSS file for styling the application.
- **App.js**: The root component that integrates all parts of the application.
- **Nominatim API**: Used for geocoding and reverse geocoding.

## How to Use GeoMapper

1. **Current Location**: On load, the application requests permission to access your location. If granted, it displays your current location on the map.
2. **Search by City**: Enter a city name in the input field and click "Show City on Map" to display its location.
3. **Search by Country**: Enter a country name in the input field and click "Show Country on Map" to display its location.
4. **Search by Coordinates**: Enter latitude and longitude in the respective fields and click "Show Coordinates on Map" to display the location.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/geo-mapper.git
    cd geo-mapper
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or issues, please open an issue on this repository or contact me at [tithikachar14@gmail.com].
