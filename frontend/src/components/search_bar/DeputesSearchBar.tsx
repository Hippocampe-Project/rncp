import { useLazyQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import React, { useState } from 'react';

import { SEARCH_DEPUTE_VOTES_BY_NAME } from '@/graphql/queries/deputes';

<<<<<<< HEAD
import { DeputeVotes } from '@/types/depute_votes';
import SearchIcon from '@/components/buttons/SearchIconButton'

interface SearchBarProps {
  onDeputeFound?: (depute: DeputeVotes[] | null) => void;
  onSearchTermChange?: (term: string) => void; 
=======
import { Depute } from '@/types/depute';

interface SearchBarProps {
  onDeputeFound?: (depute: Depute | null) => void;
>>>>>>> ffb14d19 (frontend arbo reorg)
  placeholder?: string;
  className?: string;
}

export default function DeputesSearchBar({
  onDeputeFound,
<<<<<<< HEAD
  onSearchTermChange,
=======
>>>>>>> ffb14d19 (frontend arbo reorg)
  placeholder = 'Rechercher un.e député.e',
  className = '',
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDepute, { loading, error, data }] = useLazyQuery<{
<<<<<<< HEAD
    deputeByName: DeputeVotes[];
  }>(SEARCH_DEPUTE_VOTES_BY_NAME, {
    onCompleted: (data) => {
      onDeputeFound?.(data?.deputeByName || []);
=======
    deputeByName: Depute;
  }>(SEARCH_DEPUTE_VOTES_BY_NAME, {
    onCompleted: (data) => {
      onDeputeFound?.(data?.deputeByName || null);
>>>>>>> ffb14d19 (frontend arbo reorg)
    },
    onError: (error) => {
      console.error('Search error:', error);
      onDeputeFound?.(null);
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
<<<<<<< HEAD
    onSearchTermChange?.(e.target.value);
=======
>>>>>>> ffb14d19 (frontend arbo reorg)
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchDepute({
        variables: { deputeName: searchTerm.trim() },
      });
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onDeputeFound?.(null);
  };

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <form onSubmit={handleSearchSubmit} className='flex relative'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className='flex-grow px-4 py-3 rounded-l-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-r-0 border-gray-300'
          disabled={loading}
        />

        {/* Clear button */}
        {searchTerm && (
          <button
            type='button'
            onClick={clearSearch}
<<<<<<< HEAD
            className='absolute right-25 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 px-2'
=======
            className='absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 px-2'
>>>>>>> ffb14d19 (frontend arbo reorg)
            aria-label='Clear search'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}

<<<<<<< HEAD
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className={`px-8 py-3 rounded-r-full text-white flex items-center justify-center border border-l-0 transition-colors ${
              loading || !searchTerm.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 border-blue-600"
            }`}
            aria-label="Search"
          >
            <SearchIcon className="w-6 h-6 text-white" /> {/* Tailwind controls size & color */}
          </button>
=======
        <button
          type='submit'
          disabled={loading || !searchTerm.trim()}
          className={`px-8 py-3 rounded-r-full text-white flex items-center justify-center border border-l-0 transition-colors ${
            loading || !searchTerm.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 border-blue-600'
          }`}
          aria-label='Search'
        >
          {loading ? (
            <svg
              className='animate-spin h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-4.35-4.35m0 0a7.5 7.5 0 1110.607-10.607 7.5 7.5 0 01-10.607 10.607z'
              />
            </svg>
          )}
        </button>
>>>>>>> ffb14d19 (frontend arbo reorg)
      </form>

      {/* Error message */}
      {error && (
        <div className='mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2'>
          {error.message.includes('not found')
            ? `Aucun député trouvé pour "${searchTerm}"`
            : 'Erreur lors de la recherche. Veuillez réessayer.'}
        </div>
      )}

      {/* No results message */}
      {!loading && !error && data === null && searchTerm && (
        <div className='mt-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded px-3 py-2'>
          Aucun résultat pour "{searchTerm}"
        </div>
      )}
    </div>
  );
}
