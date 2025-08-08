import React from 'react'

const MovieCard = ({ movie: 
    { title, vote_average, poster_path, release_date, original_language } 
}) => {
  return (
    <div className='movie-card'>
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png' } alt={title} 
      />
      
      <div className='mt-4'>
        <h3>{title}</h3>

        <div className='content'>
          <span>{release_date}</span>
          <span>{original_language}</span>
          <div className='rating'>
            <img src="./star.svg" alt="Star" />
            <p>{vote_average}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
