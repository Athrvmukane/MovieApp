import React from 'react';
import { useNavigate } from 'react-router-dom';
// Assuming IMAGE_BASE_URL will be passed as a prop or imported from a shared config/constants file
// For now, we'll redefine it here for this component's standalone clarity.
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
  // In a real MovieCard, you'd navigate to MovieDetailPage on click
  // const navigate = useNavigate(); // If react-router-dom is used here
  // const handleCardClick = () => { navigate(`/movie/${movie.id}`); };

  const navigate = useNavigate();
  

  const handleCardClick=()=>{
    //navigate to /movie/:id
    navigate(`/movie/${movie.id}`);    
  }

  return (
    <div
      className="
        bg-gray-800/60 backdrop-blur-md rounded-lg shadow-xl overflow-hidden
        p-4 text-center flex flex-col h-full
        transform transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-2xl hover:border-blue-500 hover:border-2
        border-2 border-transparent relative group
      "
      onClick={handleCardClick} // Uncomment when navigation is desired
    >
      <div className="w-full aspect-w-2 aspect-h-3 bg-gray-700 rounded-md mb-3 overflow-hidden flex items-center justify-center text-gray-400">
        <img
          src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/500x750/1a202c/e2e8f0?text=No+Image'}
          alt={movie.title}
          className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/500x750/1a202c/e2e8f0?text=No+Image'; }}
        />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2 leading-tight flex-grow">{movie.title}</h3>
      <p className="text-sm text-gray-400">Rating: <span className="font-bold text-yellow-400">{movie.vote_average?.toFixed(1) || 'N/A'}</span></p>

      {/* Optional: Overlay for more info on hover - uncomment to use */}
      {/*
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm p-4">
          {movie.overview ? movie.overview.substring(0, 100) + '...' : 'No overview available.'}
          <br/><button className="mt-2 text-blue-400 hover:underline">View Details</button>
        </p>
      </div>
      */}
    </div>
  );
};

export default MovieCard;
