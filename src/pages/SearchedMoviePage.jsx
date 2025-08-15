import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
// Import actions (thunks) and API constants from moviesSlice.js
import { searchMovies, setCurrentPage, API_KEY, BASE_URL } from '../redux/slices/moviesSlice'; 

function SearchedMoviePage() {
  const dispatch = useDispatch();
  
  const currentSearchTerm = useSelector((state) => state.search.query);
  
  
  const { searchResults, loading, error, currentPage, totalPages } = useSelector((state) => state.movies);

  
  useEffect(() => {
    // Dispatch the 'searchMovies' thunk. This thunk handles the API call
    dispatch(searchMovies(currentSearchTerm, currentPage));
  }, [currentSearchTerm, currentPage, dispatch]); // Dependencies: 'currentSearchTerm' (from Redux) and 'currentPage' (from Redux state)

  
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
