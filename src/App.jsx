import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the Navbar component
import Navbar from './components/Navbar';

// Import your page components
import HomePage from './pages/HomePage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingMoviePage from './pages/UpcomingMoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchedMoviePage from './pages/SearchedMoviePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-200">
        {/* The Navbar will always be displayed at the top */}
        <Navbar />

        {/* Define the routes for your application */}
        <main className="container mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/upcoming" element={<UpcomingMoviePage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} /> {/* Dynamic route for movie details */}
            <Route path="/search" element={<SearchedMoviePage />} />
            <Route path="*" element={<h1 className="text-center text-4xl font-bold mt-20">404 - Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
