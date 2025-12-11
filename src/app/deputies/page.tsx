/* eslint-disable @next/next/no-img-element */
'use client';

import { useQuery } from '@apollo/client';
import * as React from 'react';
import '@/lib/env';

import { GET_DEPUTE } from '@/graphql/queries/deputes';

import { Depute } from '@/types/depute';

export default function DeputesPage() {
  const { loading, error, data } = useQuery<{ deputes: Depute[] }>(GET_DEPUTE);

  if (loading) return <div>Loading deputes...</div>;
  if (error) return <div>Error loading deputes: {error.message}</div>;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Deputes</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.deputes?.map((depute: Depute) => (
          <div key={depute.id} className='p-4 border rounded-lg shadow'>
            {depute.photo && (
              <img
                src={depute.photo}
                alt={depute.nom}
                className='w-16 h-16 rounded-full mb-2'
              />
            )}
            <h3 className='font-semibold'>{depute.nom}</h3>
            <p className='text-sm text-gray-600'>{depute.departement}</p>
            <p className='text-sm text-gray-600'>
              {depute.commission_permanente}
            </p>
            <span
              className={`text-xs px-2 py-1 rounded ${
                depute.activite
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {depute.activite ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
