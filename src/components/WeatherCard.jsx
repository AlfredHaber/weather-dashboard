const conditions = {
  0: ['Clear sky', '☀️'], 1: ['Mainly clear', '🌤️'], 2: ['Partly cloudy', '⛅'], 3: ['Cloudy', '☁️'],
  45: ['Foggy', '🌫️'], 48: ['Foggy', '🌫️'], 51: ['Drizzle', '🌦️'], 53: ['Drizzle', '🌦️'],
  55: ['Drizzle', '🌦️'], 61: ['Rain', '🌧️'], 63: ['Rain', '🌧️'], 65: ['Heavy rain', '🌧️'],
  71: ['Snow', '❄️'], 73: ['Snow', '❄️'], 75: ['Snow', '❄️'], 80: ['Showers', '🌦️'],
  81: ['Showers', '🌧️'], 82: ['Showers', '🌧️'], 95: ['Thunderstorm', '⛈️'],
  96: ['Thunderstorm', '⛈️'], 99: ['Thunderstorm', '⛈️']
};

export default function WeatherCard({ city, weather }) {
  const [description, icon] = conditions[weather.weather_code] || ['Cloudy', '🌥️'];
  return <section className="weather-card">
    <p className="eyebrow">CURRENT WEATHER</p>
    <h2>{city}</h2>
    <div className="temperature"><span aria-hidden="true">{icon}</span> {Math.round(weather.temperature_2m)}°C</div>
    <p className="condition">{description}</p>
    <div className="details">
      <div><span>Feels like</span><strong>{Math.round(weather.apparent_temperature)}°C</strong></div>
      <div><span>Humidity</span><strong>{weather.relative_humidity_2m}%</strong></div>
      <div><span>Wind</span><strong>{Math.round(weather.wind_speed_10m)} km/h</strong></div>
    </div>
  </section>;
}
