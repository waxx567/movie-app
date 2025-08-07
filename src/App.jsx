import { useEffect, useState } from 'react'
import Search from './components/Search'

const API_BASE_URL = 'https://api.themoviedb.org/3/';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}search/movie?query=${searchTerm}`, API_OPTIONS);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies: ${error}`);
    }
  }

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find the <span className='text-gradient'>Movies</span> You'll Love Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className='all-movies'>
          <h2>All Movies</h2>>
        </section>
      </div>
    </main>
  )
}

export default App