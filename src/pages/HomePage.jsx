import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { getPopularMovies, setCurrentPage } from '../redux/slices/moviesSlice'; // Import actions from moviesSlice

function HomePage() {
  const dispatch = useDispatch();
  
  const { popular, loading, error, currentPage, totalPages } = useSelector((state) => state.movies);

  useEffect(() => {
    //api handling usin g redux
    dispatch(getPopularMovies(currentPage));
  }, [dispatch, currentPage]); // Dependencies: 'dispatch' (stable) and 'currentPage' (from Redux state)

  //paginationhandler
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  if (loading) {
    return (
      <div className="text-center text-xl mt-10 text-blue-300">
        Loading popular movies...
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
  if (popular.length === 0 && !loading && !error) {
    return (
      <div className="text-center text-xl mt-10 text-gray-400">
        No popular movies found.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Popular Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Map over the 'popular' array (from Redux state) and render a MovieCard for each movie */}
        {popular.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {/* Render the Pagination component if there are multiple pages */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}

export default HomePage;
