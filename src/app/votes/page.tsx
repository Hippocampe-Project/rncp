'use client';

import { useQuery } from '@apollo/client';
import { GET_VOTES_SIMPLE } from '@/graphql/queries/votes';
import { Vote } from '@/types/votes';

export default function VotesPage() {
  const { loading, error, data } = useQuery<{ votes: Vote[] }>(GET_VOTES_SIMPLE);

  if (loading) return <div className="p-4">Loading votes...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading votes: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Parliamentary Votes</h1>
      
      <div className="space-y-4">
        {data?.votes?.map((vote: Vote) => (
          <div key={vote.id} className="bg-white border rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {vote.titre}
                </h3>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {vote.dossier_legislatif}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Vote #{vote.numero_vote}</p>
                  <p>Date: {new Date(vote.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                vote.adopte 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {vote.adopte ? 'Adopted' : 'Rejected'}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-green-600">{vote.num_pour}</div>
                <div className="text-gray-500">For</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-red-600">{vote.num_contre}</div>
                <div className="text-gray-500">Against</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-yellow-600">{vote.num_abstention}</div>
                <div className="text-gray-500">Abstention</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-600">{vote.num_votants}</div>
                <div className="text-gray-500">Total Voters</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}