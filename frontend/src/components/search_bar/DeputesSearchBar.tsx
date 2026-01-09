import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';

import { SEARCH_DEPUTE_VOTES_BY_NAME } from '@/graphql/queries/deputes';

import { DeputeVotes } from '@/types/depute_votes';
import SearchIcon from '@/components/buttons/SearchIconButton';

interface SearchBarProps {
  onDeputeFound?: (depute: DeputeVotes[] | null) => void;
  onSearchTermChange?: (term: string) => void;
  placeholder?: string;
  className?: string;
}

export default function DeputesSearchBar({
  onDeputeFound,
  onSearchTermChange,
  placeholder = 'Rechercher un.e député.e',
  className = '',
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDepute, { loading, error, data }] = useLazyQuery<{
    deputeByName: DeputeVotes[];
  }>(SEARCH_DEPUTE_VOTES_BY_NAME, {
    onCompleted: (data) => {
      onDeputeFound?.(data?.deputeByName || []);
    },
    onError: (error) => {
      console.error('Search error:', error);
      onDeputeFound?.(null);
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchTermChange?.(e.target.value);
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
            className='absolute right-25 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 px-2'
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
          <SearchIcon className='w-6 h-6 text-white' />{' '}
          {/* Tailwind controls size & color */}
        </button>
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
