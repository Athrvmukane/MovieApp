import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
// Import actions (thunks) and API constants from moviesSlice.js
import { searchMovies, setCurrentPage, API_KEY, BASE_URL } from '../redux/slices/moviesSlice'; 

function SearchedMoviePage() {
  const dispatch = useDispatch();
  // Get the current search query directly from the Redux store.
  // This is the single source of truth for the search term across the app.
  const currentSearchTerm = useSelector((state) => state.search.query);
  
  // Select search results, loading, error, currentPage, and totalPages from the Redux store's 'movies' slice.
  // These states are now managed globally by Redux, not locally by useState.
  const { searchResults, loading, error, currentPage, totalPages } = useSelector((state) => state.movies);

  // Effect to dispatch searchMovies thunk whenever the search term or current page changes.
  // This ensures that when a new search starts or pagination changes, the API call is made.
  useEffect(() => {
    // Dispatch the 'searchMovies' thunk. This thunk handles the API call,
    // manages loading/error states, and updates the Redux store with results.
    // The thunk itself is designed to handle cases where currentSearchTerm might be empty.
    dispatch(searchMovies(currentSearchTerm, currentPage));
  }, [currentSearchTerm, currentPage, dispatch]); // Dependencies: 'currentSearchTerm' (from Redux) and 'currentPage' (from Redux state)

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
        Searching for "{currentSearchTerm}"...
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

  // Display message if no search term is present (e.g., user navigates directly to /search without query)
  if (!currentSearchTerm) {
    return (
      <div className="text-center text-xl mt-10 text-gray-400">
        Please enter a movie name in the search bar to find results.
      </div>
    );
  }

  // Display message if no results are found for the given search term
  if (searchResults.length === 0 && !loading && !error) {
    return (
      <div className="text-center text-xl mt-10 text-gray-400">
        No results found for "{currentSearchTerm}".
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Search Results for "{currentSearchTerm}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}

export default SearchedMoviePage;
