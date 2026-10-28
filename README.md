# Weather Dashboard

A simple React weather app built with Vite for Assignment 5.

## Run it

1. Install Node.js if needed.
2. Open a terminal in this folder and run `npm install`.
3. Run `npm run dev` and open the URL displayed in the terminal.

Search for a city to see current temperature, conditions, humidity, wind, and feels-like temperature. Beirut loads by default.

Weather data comes from the free Open-Meteo APIs. No API key is needed.

## Components and hooks

- `App` stores the selected city, weather data, loading state, and error state with `useState`. Its `useEffect` fetches weather whenever the city changes.
- `SearchBar` manages its own input with `useState` and sends the search back to `App` through a prop.
- `WeatherCard` receives the current city and weather as props.
- `LoadingSpinner` and `ErrorMessage` display the loading and error states.

Props only travel one level down. All components are functional.
