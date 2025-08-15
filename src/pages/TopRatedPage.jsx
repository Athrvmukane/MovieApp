import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
// Import actions (thunks) and API constants from moviesSlice.js
import { getTopRatedMovies, setCurrentPage } from '../redux/slices/moviesSlice'; 

function TopRatedPage() {
  const dispatch = useDispatch();

  const { topRated, loading, error, currentPage, totalPages } = useSelector((state) => state.movies);


  useEffect(() => {

    dispatch(getTopRatedMovies(currentPage));
  }, [dispatch, currentPage]); // Dependencies: 'dispatch' (stable) and 'currentPage' (from Redux state)


  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  // --- Conditional Rendering for Loading, Error, and Data ---
  if (loading) {
    return (
      <div className="text-center text-xl mt-10 text-blue-300">
        Loading top-rated movies...
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

  // Display message if no movies are found after loading and without error.
  if (topRated.length === 0 && !loading && !error) {
    return (
      <div className="text-center text-xl mt-10 text-gray-400">
        No top-rated movies found.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Top Rated Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Map over the 'topRated' array (from Redux state) and render a MovieCard for each movie */}
        {topRated.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}

export default TopRatedPage;
