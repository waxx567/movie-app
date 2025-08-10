import { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3/';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


/**
 * The main application component that manages the state and logic for fetching
 * and displaying movies. It handles search input, debouncing, and API interactions
 * to fetch movies from the TMDB API. The component also displays a loading spinner
 * or error message based on the fetch status.
 *
 * @returns {JSX.Element} The JSX element representing the main application interface,
 * which includes a search bar, a list of movie cards, and possibly a loading spinner
 * or error message.
 */
const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [movieList, setMovieList] = useState([]);  
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Debounce the search term to prevent too many API calls by waiting for 1 second once the user stops typing
  useDebounce(() => {     
    setDebouncedSearchTerm(searchTerm);
  }, 1000, [searchTerm]);

/**
 * Fetches movies from the TMDB API based on the search query.
 * If no query is provided, it fetches popular movies by default.
 * Updates the movie list state and handles any errors encountered during the fetch process.
 * Also updates the search count in the database for a successful query.
 *
 * @param {string} query - The search term for querying movies. Defaults to an empty string.
 */
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    // Fetch movies
    try {
      const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      
      // Handle errors
      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      
      if(data.Response === 'false') {
        setErrorMessage(data.Error || 'Failed to fetch movies. Please try again later.');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      // Update search count
      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

/**
 * Loads the trending movies by fetching the top 5 trending movies
 * from the database and updates the trendingMovies state.
 * Logs an error message if the fetching fails.
 */
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  // Fetch movies when the search term changes
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Fetch trending movies when the component mounts
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img className='logo' src="./logo.png" alt="Logo" />

          <img src="./hero.png" alt="Hero Banner" />

          <h1>Find the <span className='text-gradient'>Movies</span> You'll Love Without the Hassle</h1>
          
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>Popular</h2>
          
          {/* Show loading spinner or error message or movie list */}
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App