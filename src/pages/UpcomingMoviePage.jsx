import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
// Import actions (thunks) and API constants from moviesSlice.js
import { getUpcomingMovies, setCurrentPage } from '../redux/slices/moviesSlice'; 

function UpcomingMoviePage() {
  const dispatch = useDispatch();
  // Select data from the Redux store's 'movies' slice.
  // The 'upcoming' movies array, 'loading' status, 'error' message,
  // 'currentPage', and 'totalPages' are now managed by Redux.
  const { upcoming, loading, error, currentPage, totalPages } = useSelector((state) => state.movies);

  // useEffect hook to dispatch the action to fetch upcoming movies.
  // This effect runs when the component mounts and whenever 'currentPage' changes.
  useEffect(() => {
    // Dispatch the 'getUpcomingMovies' thunk. This thunk is responsible
    // for making the API call, handling loading/error states, and updating
    // the Redux store with the fetched data.
    dispatch(getUpcomingMovies(currentPage));
  }, [dispatch, currentPage]); // Dependencies: 'dispatch' (stable) and 'currentPage' (from Redux state)

  // Handler for pagination page changes.
  // This dispatches the 'setCurrentPage' action to update the 'currentPage'
  // in the Redux store, which in turn triggers the useEffect above to refetch data.
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  // --- Conditional Rendering for Loading, Error, and Data ---
  if (loading) {
    return (
      <div className="text-center text-xl mt-10 text-blue-300">
        Loading upcoming movies...
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
  if (upcoming.length === 0 && !loading && !error) {
    return (
      <div className="text-center text-xl mt-10 text-gray-400">
        No upcoming movies found.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Upcoming Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Map over the 'upcoming' array (from Redux state) and render a MovieCard for each movie */}
        {upcoming.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}

export default UpcomingMoviePage;
