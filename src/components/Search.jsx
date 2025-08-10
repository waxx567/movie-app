import React from 'react'

/**
 * A search component that allows users to input a search term.
 * Displays a search bar with an input field and search icon.
 * 
 * @param {string} searchTerm - The current value of the search input.
 * @param {function} setSearchTerm - Function to update the search term state.
 * 
 * The component renders an input field with a placeholder and an onChange handler
 * to update the search term state as the user types.
 */

const Search = ({ searchTerm, setSearchTerm }) => { 
  return (
    <div className='search'>
      <div>
        <img src="./search.svg" alt="Search" />

        <input 
          type="text"
          placeholder='Search through 300+ movies online'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search