'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';

export default function Header() {
  const { user, isLoading } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='bg-gray-800 text-white px-6 py-4 flex items-center justify-center relative'>
      {/* Navigation */}
      <nav className='flex space-x-4'>
        <button
          className='hover:bg-gray-700 px-3 py-2 rounded'
          onClick={() => (window.location.href = '/')}
        >
          Home
        </button>
        <button
          className='hover:bg-gray-700 px-3 py-2 rounded'
          onClick={() => (window.location.href = '/deputes')}
        >
          Député.e
        </button>
        <button
          className='hover:bg-gray-700 px-3 py-2 rounded'
          onClick={() => (window.location.href = '/votes')}
        >
          Scrutins
        </button>
        <button
          className='hover:bg-gray-700 px-3 py-2 rounded'
          onClick={() => (window.location.href = '/political_groups')}
        >
          Groupes Politiques
        </button>
        <button className='hover:bg-gray-700 px-3 py-2 rounded'>
          Dashboard mensuel
        </button>
        <button className='hover:bg-gray-700 px-3 py-2 rounded'>FAQ</button>
      </nav>

      {/* Right corner: login/logout */}
      <div className='absolute top-4 right-6'>
        {isLoading ? (
          <span>Loading...</span>
        ) : user ? (
          <div className='relative'>
            {/* User avatar */}
            <img
              src={user.picture || '/default-avatar.png'}
              alt='User'
              className='w-10 h-10 rounded-full cursor-pointer'
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {/* Dropdown menu */}
            {menuOpen && (
              <div className='absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg'>
                <a
                  href='/profile'
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Profile
                </a>
                <a
                  href='/auth/logout'
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <a
            href='/auth/login'
            className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded'
          >
            Login
          </a>
        )}
      </div>
    </header>
  );
}
