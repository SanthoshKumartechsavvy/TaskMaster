import React from 'react'
import { FaSearch } from 'react-icons/fa';

const Search = ({search, setSearch}) => {
  return (
    <form id='search' onSubmit={(e) => e.preventDefault()} className='search'>
      <label htmlFor="search">search</label>
      <FaSearch style={{fontSize: '1.5rem'}}/>
      <input 
        id='search'
        type="text"
        placeholder='Enter the title or description to search'
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
    </form>
  )
}

export default Search
