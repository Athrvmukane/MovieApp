import axios from 'axios';

// --- API Constants ---
// Accessing API key and BASE_URL from Vite's environment variables (import.meta.env).
// This is the standard and secure way in a real Vite project.
export const API_KEY = import.meta.env.VITE_MOVIE_APP_API_KEY;
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const IMAGE_BASE_URL_W500 = 'https://image.tmdb.org/t/p/w500'; // Exported for MovieCard, MovieDetailPage
export const IMAGE_BASE_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original'; // Exported for MovieDetailPage

// --- Action Types ---
export const FETCH_MOVIES_REQUEST = 'movies/fetchMoviesRequest';
export const FETCH_POPULAR_MOVIES_SUCCESS = 'movies/fetchPopularMoviesSuccess';
export const FETCH_TOP_RATED_MOVIES_SUCCESS = 'movies/fetchTopRatedMoviesSuccess';
export const FETCH_UPCOMING_MOVIES_SUCCESS = 'movies/fetchUpcomingMoviesSuccess';
export const FETCH_SEARCH_RESULTS_SUCCESS = 'movies/fetchSearchResultsSuccess';
export const FETCH_MOVIES_FAILURE = 'movies/fetchMoviesFailure';
export const SET_CURRENT_PAGE = 'movies/setCurrentPage';

export const FETCH_MOVIE_DETAIL_REQUEST = 'movieDetail/fetchMovieDetailRequest';
export const FETCH_MOVIE_DETAIL_SUCCESS = 'movieDetail/fetchMovieDetailSuccess';
export const FETCH_MOVIE_CAST_SUCCESS = 'movieDetail/fetchMovieCastSuccess';
export const FETCH_MOVIE_DETAIL_FAILURE = 'movieDetail/fetchMovieDetailFailure';


// --- Initial State for Movies Slice ---
const initialMoviesState = {
  popular: [],
  topRated: [],
  upcoming: [],
  searchResults: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  movieDetail: null,
  movieCast: [],
};

// --- Action Creators ---
export const fetchMoviesRequest = () => ({ type: FETCH_MOVIES_REQUEST });
export const fetchPopularMoviesSuccess = (data) => ({ type: FETCH_POPULAR_MOVIES_SUCCESS, payload: data });
export const fetchTopRatedMoviesSuccess = (data) => ({ type: FETCH_TOP_RATED_MOVIES_SUCCESS, payload: data });
export const fetchUpcomingMoviesSuccess = (data) => ({ type: FETCH_UPCOMING_MOVIES_SUCCESS, payload: data });
export const fetchSearchResultsSuccess = (data) => ({ type: FETCH_SEARCH_RESULTS_SUCCESS, payload: data });
export const fetchMoviesFailure = (error) => ({ type: FETCH_MOVIES_FAILURE, payload: error });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page });

export const fetchMovieDetailRequest = () => ({ type: FETCH_MOVIE_DETAIL_REQUEST });
export const fetchMovieDetailSuccess = (data) => ({ type: FETCH_MOVIE_DETAIL_SUCCESS, payload: data });
export const fetchMovieCastSuccess = (data) => ({ type: FETCH_MOVIE_CAST_SUCCESS, payload: data });
export const fetchMovieDetailFailure = (error) => ({ type: FETCH_MOVIE_DETAIL_FAILURE, payload: error });


// --- Thunks (Asynchronous Actions) ---
export const getPopularMovies = (page = 1) => async (dispatch) => {
  dispatch(fetchMoviesRequest());
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    dispatch(fetchPopularMoviesSuccess(response.data));
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    dispatch(fetchMoviesFailure(error.message || "Failed to fetch popular movies."));
  }
};

export const getTopRatedMovies = (page = 1) => async (dispatch) => {
  dispatch(fetchMoviesRequest());
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
    dispatch(fetchTopRatedMoviesSuccess(response.data));
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    dispatch(fetchMoviesFailure(error.message || "Failed to fetch top rated movies."));
  }
};

export const getUpcomingMovies = (page = 1) => async (dispatch) => {
  dispatch(fetchMoviesRequest());
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`);
    dispatch(fetchUpcomingMoviesSuccess(response.data));
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    dispatch(fetchMoviesFailure(error.message || "Failed to fetch upcoming movies."));
  }
};

export const searchMovies = (query, page = 1) => async (dispatch) => {
  if (!query) {
    dispatch(fetchSearchResultsSuccess({ results: [], page: 1, total_pages: 1 }));
    return;
  }

  dispatch(fetchMoviesRequest());
  try {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`);
    dispatch(fetchSearchResultsSuccess(response.data));
  } catch (error) {
    console.error("Error searching movies:", error);
    dispatch(fetchMoviesFailure(error.message || "Failed to fetch search results."));
  }
};

export const getMovieDetail = (movieId) => async (dispatch) => {
  dispatch(fetchMovieDetailRequest());
  try {
    const detailResponse = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    dispatch(fetchMovieDetailSuccess(detailResponse.data));

    const castResponse = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
    dispatch(fetchMovieCastSuccess(castResponse.data.cast.filter(person => person.profile_path).slice(0, 12)));
  } catch (error) {
    console.error(`Error fetching movie detail or cast for ID ${movieId}:`, error);
    dispatch(fetchMovieDetailFailure(error.message || "Failed to fetch movie details."));
  }
};


// --- Reducer for Movies Slice ---
const moviesReducer = (state = initialMoviesState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        popular: action.payload.results,
        currentPage: action.payload.page,
        totalPages: Math.min(action.payload.total_pages, 500),
        loading: false,
      };
    case FETCH_TOP_RATED_MOVIES_SUCCESS:
      return {
        ...state,
        topRated: action.payload.results,
        currentPage: action.payload.page,
        totalPages: Math.min(action.payload.total_pages, 500),
        loading: false,
      };
    case FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        upcoming: action.payload.results,
        currentPage: action.payload.page,
        totalPages: Math.min(action.payload.total_pages, 500),
        loading: false,
      };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.results,
        currentPage: action.payload.page,
        totalPages: Math.min(action.payload.total_pages, 500),
        loading: false,
      };
    case FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    case FETCH_MOVIE_DETAIL_REQUEST:
      return { ...state, loading: true, error: null, movieDetail: null, movieCast: [] };
    case FETCH_MOVIE_DETAIL_SUCCESS:
      return { ...state, movieDetail: action.payload, loading: false };
    case FETCH_MOVIE_CAST_SUCCESS:
      return { ...state, movieCast: action.payload, loading: false };
    case FETCH_MOVIE_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default moviesReducer;
