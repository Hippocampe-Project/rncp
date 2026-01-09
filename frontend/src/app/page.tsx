'use client';

import React, { useState } from 'react';
import '@/lib/env';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import DeputesSearchBar from '@/components/search_bar/DeputesSearchBar';

import { Depute } from '@/types/depute';

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
  const [foundDepute, setFoundDepute] = useState<Depute | null>(null);

  const handleDeputeFound = (depute: Depute | null) => {
    setFoundDepute(depute);
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
          <DeputesSearchBar
            onDeputeFound={handleDeputeFound}
            className='w-full max-w-2xl'
          />

          {/* Results */}
          {foundDepute && (
            <div className='max-w-4xl mx-auto'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='md:flex'>
                  {/* Photo */}
                  <div className='md:flex-shrink-0'>
                    <div className='h-48 w-full md:w-48 bg-gray-300 flex items-center justify-center'>
                      {foundDepute.photo ? (
                        <img
                          className='h-48 w-full md:w-48 object-cover'
                          src={foundDepute.photo}
                          alt={foundDepute.nom}
                        />
                      ) : (
                        <svg
                          className='h-16 w-16 text-gray-400'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Information */}
                  <div className='p-8 flex-1'>
                    <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1'>
                      {foundDepute.activite ? 'Député actif' : 'Député inactif'}
                    </div>

                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                      {foundDepute.nom}
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='space-y-3'>
                        <div>
                          <span className='text-sm font-medium text-gray-500'>
                            Circonscription:
                          </span>
                          <p className='text-gray-900'>
                            {foundDepute.circonscription}
                          </p>
                        </div>

                        <div>
                          <span className='text-sm font-medium text-gray-500'>
                            Profession:
                          </span>
                          <p className='text-gray-900'>
                            {foundDepute.profession}
                          </p>
                        </div>

                        <div>
                          <span className='text-sm font-medium text-gray-500'>
                            Sexe:
                          </span>
                          <p className='text-gray-900'>{foundDepute.sexe}</p>
                        </div>
                      </div>

                      <div className='space-y-3'>
                        <div>
                          <span className='text-sm font-medium text-gray-500'>
                            Date de naissance:
                          </span>
                          <p className='text-gray-900'>
                            {new Date(
                              foundDepute.date_naissance,
                            ).toLocaleDateString('fr-FR')}
                          </p>
                        </div>

                        {foundDepute.suppleant && (
                          <div>
                            <span className='text-sm font-medium text-gray-500'>
                              Suppléant:
                            </span>
                            <p className='text-gray-900'>
                              {foundDepute.suppleant}
                            </p>
                          </div>
                        )}

                        <div>
                          <span className='text-sm font-medium text-gray-500'>
                            Département ID:
                          </span>
                          <p className='text-gray-900'>
                            {foundDepute.departement}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className='mt-6 flex space-x-3'>
                      <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors'>
                        Voir les votes
                      </button>
                      <button className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors'>
                        Plus d'infos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          {!foundDepute && (
            <div className='text-center text-gray-600 max-w-md mx-auto'>
              <p>
                Tapez le nom d'un député dans la barre de recherche pour voir
                ses informations.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

('use client');

import React, { useState, useMemo } from 'react';
import '@/lib/env';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import DeputesSearchBar from '@/components/search_bar/DeputesSearchBar';

import { DeputeVotes } from '@/types/depute_votes';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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
  const [foundDeputeVotes, setFoundDeputeVotes] = useState<DeputeVotes[]>([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  const handleDeputeFound = (votes: DeputeVotes[] | null) => {
    setFoundDeputeVotes(votes || []); // fallback to empty array
  };

  const totalVotes = foundDeputeVotes.length;
  const countPour = foundDeputeVotes.filter(
    (v) => v.vote_category.toLowerCase() === 'pour',
  ).length;
  const countContre = foundDeputeVotes.filter(
    (v) => v.vote_category.toLowerCase() === 'contre',
  ).length;
  const countAbstention = foundDeputeVotes.filter(
    (v) => v.vote_category.toLowerCase() === 'abstention',
  ).length;

  const pourPercent = totalVotes > 0 ? (countPour / totalVotes) * 100 : 0;
  const contrePercent = totalVotes > 0 ? (countContre / totalVotes) * 100 : 0;
  const abstentionPercent =
    totalVotes > 0 ? (countAbstention / totalVotes) * 100 : 0;

  const dataForChart = [
    { name: 'Pour', value: countPour },
    { name: 'Contre', value: countContre },
    { name: 'Abstention', value: countAbstention },
  ];

  const COLORS = ['#22c55e', '#ef4444', '#a855f7']; // green, red, purple

  // Compute law counts and top 3 laws whenever foundDeputeVotes changes
  const { lawCounts, top3Laws } = useMemo(() => {
    const counts = countVotesByLaw(foundDeputeVotes);
    const top3 = getTopNLaws(counts, 3);
    console.log('LAW COUNTS :', counts);
    console.log('TOP 3 LAWS :', top3);
    return { lawCounts: counts, top3Laws: top3 };
  }, [foundDeputeVotes]);

  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          {/* <Logo className='w-24 h-24 fill-black' /> */}
          <img src='/svg/Logo.svg' alt='Logo' className='w-60 h-60' />
          <h1 className='mt-4 mb-10'>Suivez l'activité de vos député·e·s</h1>

          {/* Search Bar */}
          <DeputesSearchBar
            onDeputeFound={handleDeputeFound}
            onSearchTermChange={setCurrentSearchTerm}
            className='w-full max-w-2xl mb-10'
          />

          {/* Vote Summary */}
          {foundDeputeVotes.length > 0 && (
            <div className='bg-white rounded-lg shadow-md p-6 mt-6 text-center'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4 gap-12'>
                Résumé des votes de : {currentSearchTerm}
              </h3>

              <div className='flex flex-col md:flex-row justify-center items-center gap-12 mb-7'>
                {/* Pie chart */}
                <PieChart width={240} height={320}>
                  <Pie
                    data={dataForChart}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={90}
                    label={{ position: 'outside' }}
                  >
                    {dataForChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign='bottom'
                    wrapperStyle={{ marginTop: 50 }}
                  />
                </PieChart>

                {/* Text summary */}
                <div className='text-gray-700 space-y-2'>
                  <p>
                    🟢 <span className='font-semibold'>Pour:</span>{' '}
                    {pourPercent.toFixed(1)}% ({countPour})
                  </p>
                  <p>
                    🔴 <span className='font-semibold'>Contre:</span>{' '}
                    {contrePercent.toFixed(1)}% ({countContre})
                  </p>
                  <p>
                    🟣 <span className='font-semibold'>Abstention:</span>{' '}
                    {abstentionPercent.toFixed(1)}% ({countAbstention})
                  </p>
                  <p className='mt-3 text-gray-900 font-bold'>
                    Nombre de scrutins votés : {totalVotes}
                  </p>
                </div>
              </div>
              <div>
                <h3 className='mb-4'>
                  Les 3 lois sur lesquelles {currentSearchTerm} a été le·la plus
                  actif·ive :
                </h3>
                <ul className='font-semibold'>
                  {top3Laws.map(({ lawTitle, count }, index) => (
                    <li key={lawTitle}>
                      {index + 1}. {lawTitle} — {count} scrutin
                      {count > 1 ? 's' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* List all votes */}
          {foundDeputeVotes.length > 0 && (
            <div className='mt-6 max-w-3xl mx-auto space-y-4'>
              {foundDeputeVotes.map((vote) => (
                <div
                  key={vote.vote_id}
                  className='bg-white p-4 rounded-lg shadow-md'
                >
                  <h3 className='font-bold'>{vote.vote_titre}</h3>
                  <p>
                    <span className='font-medium'>Catégorie:</span>{' '}
                    <span
                      className={
                        vote.vote_category.toLowerCase() === 'pour'
                          ? 'text-green-600'
                          : vote.vote_category.toLowerCase() === 'contre'
                            ? 'text-red-600'
                            : vote.vote_category.toLowerCase() === 'abstention'
                              ? 'text-purple-600'
                              : 'text-gray-600'
                      }
                    >
                      {vote.vote_category}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Instructions */}
          {!foundDeputeVotes && (
            <div className='text-center text-gray-600 max-w-md mx-auto'>
              <p>
                Tapez le nom d'un député dans la barre de recherche pour voir
                ses informations.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

interface LawVotesCount {
  [lawTitle: string]: number;
}

// Extract the "law title" from a vote title
function extractLawTitle(voteTitle: string): string {
  const loiIndex = voteTitle.toLowerCase().indexOf('loi');
  if (loiIndex === -1) return voteTitle; // fallback if "loi" not found

  // Find the first opening parenthesis after "loi"
  const parenthesisIndex = voteTitle.indexOf('(', loiIndex);

  if (parenthesisIndex === -1) {
    // If no parenthesis, take until the end
    return voteTitle.slice(loiIndex).trim();
  }

  // Take substring from "loi" to "(" (excluding "(")
  return voteTitle.slice(loiIndex, parenthesisIndex).trim();
}

// Iterate over all votes to build the "laws" object
function countVotesByLaw(votes: DeputeVotes[]): LawVotesCount {
  const laws: LawVotesCount = {};

  votes.forEach((vote) => {
    const lawTitle = extractLawTitle(vote.vote_titre);

    if (laws[lawTitle]) {
      laws[lawTitle] += 1;
    } else {
      laws[lawTitle] = 1;
    }
  });

  return laws;
}

function getTopNLaws(lawCounts: { [lawTitle: string]: number }, n = 3) {
  // Convert the object into an array of [lawTitle, count] tuples
  const sortedLaws = Object.entries(lawCounts).sort((a, b) => b[1] - a[1]); // sort descending by count

  // Take top N
  return sortedLaws.slice(0, n).map(([lawTitle, count]) => ({
    lawTitle,
    count,
  }));
}
