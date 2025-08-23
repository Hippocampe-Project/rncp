'use client';

import React, { useState } from 'react';

import '@/lib/env';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import DeputiesSearchBar from '@/components/search_bar/DeputiesSearchBar';
import { Deputy } from '@/types/deputy';


/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [foundDeputy, setFoundDeputy] = useState<Deputy | null>(null);

  const handleDeputyFound = (deputy: Deputy | null) => {
    setFoundDeputy(deputy);
  };
  
  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Logo className='w-24 h-24 fill-black' />
          <h1 className='mt-4'>Suivez l'activité de vos député.e.s</h1>
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Recherchez un.e député.e par son nom pour accéder à ses informations et votes
          </p> */}
          {/* <p className='mt-2 text-sm text-gray-700'>
            <ArrowLink href='https://github.com/Hippocampe-Project/rncp/tree/scraping'>
              See the repository
            </ArrowLink>
          </p> */}

          {/* Search Bar */}
          <DeputiesSearchBar 
            onDeputyFound={handleDeputyFound}
            className="w-full max-w-2xl"
          />


          {/* Results */}
          {foundDeputy && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  {/* Photo */}
                  <div className="md:flex-shrink-0">
                    <div className="h-48 w-full md:w-48 bg-gray-300 flex items-center justify-center">
                      {foundDeputy.photo ? (
                        <img
                          className="h-48 w-full md:w-48 object-cover"
                          src={foundDeputy.photo}
                          alt={foundDeputy.nom}
                        />
                      ) : (
                        <svg
                          className="h-16 w-16 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Information */}
                  <div className="p-8 flex-1">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
                      {foundDeputy.activite ? 'Député actif' : 'Député inactif'}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {foundDeputy.nom}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Circonscription:</span>
                          <p className="text-gray-900">{foundDeputy.circonscription}</p>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-gray-500">Profession:</span>
                          <p className="text-gray-900">{foundDeputy.profession}</p>
                        </div>

                        <div>
                          <span className="text-sm font-medium text-gray-500">Sexe:</span>
                          <p className="text-gray-900">{foundDeputy.sexe}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Date de naissance:</span>
                          <p className="text-gray-900">
                            {new Date(foundDeputy.date_naissance).toLocaleDateString('fr-FR')}
                          </p>
                        </div>

                        {foundDeputy.suppleant && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Suppléant:</span>
                            <p className="text-gray-900">{foundDeputy.suppleant}</p>
                          </div>
                        )}

                        <div>
                          <span className="text-sm font-medium text-gray-500">Département ID:</span>
                          <p className="text-gray-900">{foundDeputy.departement}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 flex space-x-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        Voir les votes
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors">
                        Plus d'infos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          {!foundDeputy && (
            <div className="text-center text-gray-600 max-w-md mx-auto">
              <p>Tapez le nom d'un député dans la barre de recherche pour voir ses informations.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
