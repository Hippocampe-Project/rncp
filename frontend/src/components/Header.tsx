import React, { useState } from 'react';

export default function Header() {
  return (
    <header className='bg-gray-800 text-white px-6 py-4 flex items-center justify-center'>
      {/* Navigation Buttons/Links */}
      <nav className='flex space-x-4'>
        <button
          className='hover:bg-gray-700 px-3 py-2 rounded'
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Home
        </button>
        <button
          className='hover:bg-gray-700 px-3 py-2 rounded'
          onClick={() => {
            window.location.href = '/deputies';
          }}
        >
          Député.e
        </button>
        <button
          className='hover:bg-gray-700 px-3 py-2 rounded'
          onClick={() => {
            window.location.href = '/votes';
          }}
        >
          Scrutins
        </button>
        <button
          className='hover:bg-gray-700 px-3 py-2 rounded'
          onClick={() => {
            window.location.href = '/political_groups';
          }}
        >
          Groupes Politiques
        </button>
        <button className='hover:bg-gray-700 px-3 py-2 rounded'>
          Dashboard mensuel
        </button>
        <button className='hover:bg-gray-700 px-3 py-2 rounded'>FAQ</button>
      </nav>
      <div className='absolute top-4 right-6'>
        <button
          onClick={() => {
            window.location.href = '/auth/login';
          }}
          className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded'
        >
          Login
        </button>
      </div>
    </header>
  );
}
