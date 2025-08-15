import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { setQuery, clearQuery } from '../redux/slices/searchSlice'; // Import search actions
import { setCurrentPage } from '../redux/slices/moviesSlice'; // Import setCurrentPage from moviesSlice

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const globalSearchQuery = useSelector((state) => state.search.query); // Get search query from Redux
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Local state for the input field, synchronized with Redux's globalSearchQuery
  const [searchInputValue, setSearchInputValue] = useState(globalSearchQuery); 

  // Effect to synchronize local input state with Redux's global search query
  useEffect(() => {
    setSearchInputValue(globalSearchQuery);
  }, [globalSearchQuery]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigateAndCloseMenu = (path) => {
    // If navigating away from search page, clear Redux search query
    if (path !== '/search') {
      dispatch(clearQuery()); // Use clearQuery
    }
    dispatch(setCurrentPage(1)); // Reset movie list pages
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchInputValue.trim()) {
      dispatch(setQuery(searchInputValue.trim())); // Use setQuery
      // No need to setCurrentPage here, as the SearchedMoviePage's useEffect
      // will reset its own currentPage to 1 when currentSearchTerm changes.
      navigate(`/search?query=${encodeURIComponent(searchInputValue.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Function to clear the search input and Redux query
  const handleClearSearch = () => {
    setSearchInputValue(''); // Clear local input state
    dispatch(clearQuery()); // Clear Redux search query
    dispatch(setCurrentPage(1)); // Reset pagination for other pages
    navigate('/'); // Navigate back to Home or a neutral page after clearing search
    setIsMenuOpen(false); // Close menu
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50 rounded-b-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo/Brand Name */}
        <div
          className="text-2xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition duration-200 ease-in-out"
          onClick={() => handleNavigateAndCloseMenu('/')}
        >
          MovieDb
        </div>

        {/* Hamburger menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links and Search Bar */}
        <div className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex-grow flex justify-center md:justify-end mt-4 md:mt-0 md:ml-8">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <li>
                <button
                  className="text-gray-300 hover:text-white transition duration-200 ease-in-out text-lg px-3 py-1 rounded-md w-full text-left md:text-center"
                  onClick={() => handleNavigateAndCloseMenu('/')}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className="text-gray-300 hover:text-white transition duration-200 ease-in-out text-lg px-3 py-1 rounded-md w-full text-left md:text-center"
                  onClick={() => handleNavigateAndCloseMenu('/top-rated')}
                >
                  Top Rated
                </button>
              </li>
              <li>
                <button
                  className="text-gray-300 hover:text-white transition duration-200 ease-in-out text-lg px-3 py-1 rounded-md w-full text-left md:text-center"
                  onClick={() => handleNavigateAndCloseMenu('/upcoming')}
                >
                  Upcoming
                </button>
              </li>
            </ul>
          </div>

          {/* Search Bar with clear button */}
          <div className="relative flex items-center mt-4 md:mt-0 w-full md:w-auto md:ml-4">
            <input
              type="text"
              placeholder="Search movies..."
              className="p-2 rounded-l-lg border-2 border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500 w-full md:w-64 pr-10" // Added pr-10 for clear button space
              value={searchInputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {searchInputValue && ( // Conditionally render clear button
              <button
                onClick={handleClearSearch}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none p-1 rounded-full" // Positioned inside input area
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
              onClick={handleSearchSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
