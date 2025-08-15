import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetail } from '../redux/slices/moviesSlice'; // Adjust path as needed

const IMAGE_BASE_URL_W500 = 'https://image.tmdb.org/t/p/w500';
const IMAGE_BASE_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original';

function MovieDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  //

  // Pulling data from Redux state
  const { movieDetail, movieCast, loading, error } = useSelector((state) => state.movies);

  // Fetch data via Redux thunk
  useEffect(() => {
    if (id) {
      dispatch(getMovieDetail(id));
    }
  }, [id, dispatch]);

  // --- Conditional Rendering ---
  if (loading) {
    return (
      <div className="text-center text-xl mt-10 text-blue-300">
        Loading movie details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl mt-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!movieDetail) {
    return (
      <div className="text-center text-xl mt-10 text-gray-400">
        No movie details found for ID: {id}.
      </div>
    );
  }

  // Prepare data for rendering
  const posterUrl = movieDetail.poster_path
    ? `${IMAGE_BASE_URL_W500}${movieDetail.poster_path}`
    : 'https://placehold.co/500x750/1a202c/e2e8f0?text=No+Poster';

  const backdropUrl = movieDetail.backdrop_path
    ? `${IMAGE_BASE_URL_ORIGINAL}${movieDetail.backdrop_path}`
    : '';

  const releaseDate = movieDetail.release_date
    ? new Date(movieDetail.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  const genres = movieDetail.genres?.map((genre) => genre.name).join(', ') || 'N/A';
  const runtime = movieDetail.runtime ? `${movieDetail.runtime} minutes` : 'N/A';
  const voteAverage = movieDetail.vote_average?.toFixed(1) || 'N/A';

  const homepage = movieDetail.homepage;
  const imdbId = movieDetail.imdb_id;
  const budget = movieDetail.budget;
  const revenue = movieDetail.revenue;
  const productionCompanies = movieDetail.production_companies || [];
  const productionCountries =
    movieDetail.production_countries?.map((country) => country.name).join(', ') || 'N/A';
  const spokenLanguages =
    movieDetail.spoken_languages?.map((lang) => lang.english_name).join(', ') || 'N/A';

  return (
    <div className="p-4">
      {backdropUrl && (
        <div
          className="relative h-64 md:h-96 bg-cover bg-center rounded-lg shadow-lg mb-8"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(26,32,44,1), rgba(26,32,44,0.6)), url(${backdropUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 -mt-20 md:-mt-32">
        <div className="flex-shrink-0 w-48 md:w-64 mx-auto md:mx-0 rounded-lg shadow-xl overflow-hidden md:ml-8 md:mr-auto">
          <img
            src={posterUrl}
            alt={movieDetail.title}
            className="w-full h-auto rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/500x750/1a202c/e2e8f0?text=No+Poster';
            }}
          />
        </div>

        <div className="flex-grow text-center md:text-left md:mr-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-2">
            {movieDetail.title}
          </h1>
          {movieDetail.tagline && (
            <p className="text-lg italic text-gray-400 mb-4">"{movieDetail.tagline}"</p>
          )}

          <p className="text-xl text-yellow-400 mb-2">
            Rating: <span className="font-bold">{voteAverage}</span> / 10
          </p>
          <p className="text-gray-300 mb-2">Release Date: {releaseDate}</p>
          <p className="text-gray-300 mb-2">Runtime: {runtime}</p>
          <p className="text-gray-300 mb-4">Genres: {genres}</p>

          <h3 className="text-2xl font-bold text-white mb-3">Overview</h3>
          <p className="text-gray-300 leading-relaxed mb-8">
            {movieDetail.overview || 'No overview available.'}
          </p>
        </div>
      </div>

      <div className="bg-gray-800/60 backdrop-blur-md rounded-lg p-6 shadow-md mt-8 text-left border border-gray-700">
        <h3 className="text-2xl font-bold text-white mb-4">More Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-gray-300">
          {homepage && (
            <div>
              <span className="font-semibold text-blue-300">Homepage:</span>{' '}
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline break-all"
              >
                {homepage.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]}
              </a>
            </div>
          )}
          {imdbId && (
            <div>
              <span className="font-semibold text-blue-300">IMDb ID:</span>{' '}
              <a
                href={`https://www.imdb.com/title/${imdbId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {imdbId}
              </a>
            </div>
          )}
          <div>
            <span className="font-semibold text-blue-300">Budget:</span> {budget}
          </div>
          <div>
            <span className="font-semibold text-blue-300">Revenue:</span> {revenue}
          </div>
          <div>
            <span className="font-semibold text-blue-300">Status:</span>{' '}
            {movieDetail.status || 'N/A'}
          </div>
          <div>
            <span className="font-semibold text-blue-300">Original Language:</span>{' '}
            {movieDetail.original_language?.toUpperCase() || 'N/A'}
          </div>
          <div>
            <span className="font-semibold text-blue-300">Production Countries:</span>{' '}
            {productionCountries}
          </div>
          <div>
            <span className="font-semibold text-blue-300">Spoken Languages:</span>{' '}
            {spokenLanguages}
          </div>
        </div>

        {productionCompanies.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-700">
            <h4 className="font-semibold text-blue-300 mb-3">Production Companies:</h4>
            <div className="flex flex-wrap items-center gap-4">
              {productionCompanies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center space-x-2 bg-gray-700/50 rounded-md p-2"
                >
                  {company.logo_path ? (
                    <img
                      src={`${IMAGE_BASE_URL_W500}${company.logo_path}`}
                      alt={company.name}
                      className="h-8 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/32x32/2d3748/cbd5e0?text=Logo';
                      }}
                    />
                  ) : (
                    <div className="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center text-xs text-gray-400">
                      {company.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-gray-200 text-sm">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

     <div className="mt-12">
  <h3 className="text-3xl font-bold text-white mb-6 text-center">Cast</h3>
  {movieCast.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movieCast.map((person) => (
        <div
          key={person.cast_id}
          className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
        >
          <div className="relative w-full h-80">
            <img
              src={
                person.profile_path
                  ? `${IMAGE_BASE_URL_W500}${person.profile_path}`
                  : 'https://placehold.co/300x450/2d3748/cbd5e0?text=No+Photo'
              }
              alt={person.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://placehold.co/300x450/2d3748/cbd5e0?text=No+Photo';
              }}
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="text-white font-semibold text-lg">{person.name}</p>
              {person.character && (
                <p className="text-gray-300 text-sm italic">
                  as {person.character}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-400">
      No cast information available.
    </p>
  )}
</div>


    </div>
  );
}

export default MovieDetailPage;
