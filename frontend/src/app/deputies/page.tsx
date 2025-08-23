'use client';

import { useQuery } from '@apollo/client';
import { GET_DEPUTIES } from '@/graphql/queries/deputies';
import { Deputy } from '@/types/deputy';


import * as React from 'react';
import '@/lib/env';

export default function DeputiesPage() {
  const { loading, error, data } = useQuery<{ deputies: Deputy[] }>(GET_DEPUTIES);

  if (loading) return <div>Loading deputies...</div>;
  if (error) return <div>Error loading deputies: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deputies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.deputies?.map((deputy: Deputy) => (
          <div key={deputy.id} className="p-4 border rounded-lg shadow">
            {deputy.photo && (
              <img 
                src={deputy.photo} 
                alt={deputy.nom}
                className="w-16 h-16 rounded-full mb-2"
              />
            )}
            <h3 className="font-semibold">{deputy.nom}</h3>
            <p className="text-sm text-gray-600">{deputy.departement}</p>
            <p className="text-sm text-gray-600">{deputy.commission_permanente}</p>
            <span className={`text-xs px-2 py-1 rounded ${
              deputy.activite ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {deputy.activite ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
