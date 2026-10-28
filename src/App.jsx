import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

export default function App() {
  const [cityQuery, setCityQuery] = useState('Beirut');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadWeather() {
      setLoading(true);
      setError('');
      setResult(null);
      try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery)}&count=1&language=en&format=json`, { signal: controller.signal });
        if (!geoResponse.ok) throw new Error('Could not search for that city.');
        const locations = await geoResponse.json();
        const location = locations.results?.[0];
        if (!location) throw new Error('City not found. Try another name.');
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`, { signal: controller.signal });
        if (!weatherResponse.ok) throw new Error('Weather is unavailable right now.');
        const weatherData = await weatherResponse.json();
        if (!weatherData.current) throw new Error('Weather data is missing.');
        setResult({ city: `${location.name}, ${location.country}`, weather: weatherData.current });
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Something went wrong.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadWeather();
    return () => controller.abort();
  }, [cityQuery]);

  return <main className="container">
    <header><p className="eyebrow">YOUR DAILY FORECAST</p><h1>Weather Dashboard</h1><p className="subtitle">See what the weather looks like anywhere.</p></header>
    <SearchBar onSearch={setCityQuery} loading={loading} />
    {loading && <LoadingSpinner />}
    {!loading && error && <ErrorMessage message={error} />}
    {!loading && result && <WeatherCard city={result.city} weather={result.weather} />}
    <footer>Weather data by Open-Meteo</footer>
  </main>;
}
