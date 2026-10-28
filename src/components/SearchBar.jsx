import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }
  return <form className="search" onSubmit={handleSubmit}>
    <label className="sr-only" htmlFor="city">City</label>
    <input id="city" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a city..." />
    <button disabled={loading || !query.trim()}>Search</button>
  </form>;
}
