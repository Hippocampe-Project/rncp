import React, { useState } from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Rechercher un.e député.e"
        className="flex-grow px-4 py-3 rounded-l-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
     <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-r-full text-white flex items-center justify-center"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1110.607-10.607 7.5 7.5 0 01-10.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
}
