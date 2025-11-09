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
